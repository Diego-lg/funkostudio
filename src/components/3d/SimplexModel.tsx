import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";

interface SimplexSphereProps {
  animate: boolean;
}

const SimplexSphere: React.FC<SimplexSphereProps> = ({ animate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const sphereRef = useRef<THREE.Mesh>();
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const currentRotationRef = useRef({ x: 0, y: 0 });
  const hoverIntensityRef = useRef(0);
  const targetHoverIntensityRef = useRef(0);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
    if (!isMobile) {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
    }
    rendererRef.current = renderer;
    containerRef.current.appendChild(renderer.domElement);

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = isMobile ? 4 : 5;

    // Create sphere geometry with higher detail
    const geometry = new THREE.SphereGeometry(
      isMobile ? 1.5 : 2,
      isMobile ? 32 : 128,
      isMobile ? 16 : 64
    );
    const positionAttribute = geometry.getAttribute("position");
    const originalPositions = positionAttribute.array.slice();

    // Create material with iridescent properties
    const material = isMobile
      ? new THREE.MeshStandardMaterial({
          color: new THREE.Color(0.2, 0.4, 0.9),
          metalness: 0.8,
          roughness: 0.2,
        })
      : new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(0.1, 0.3, 0.8),
          metalness: 0.9,
          roughness: 0.1,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
          iridescence: 1.0,
          iridescenceIOR: 1.3,
          iridescenceThicknessRange: [100, 800],
          transmission: 0.1,
          thickness: 0.5,
        });

    const sphere = new THREE.Mesh(geometry, material);
    if (!isMobile) {
      sphere.castShadow = true;
      sphere.receiveShadow = true;
    }
    sphereRef.current = sphere;
    scene.add(sphere);

    // Create lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, isMobile ? 1.5 : 0.6);
    scene.add(ambientLight);

    if (!isMobile) {
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
      directionalLight.position.set(5, 5, 5);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 1024;
      directionalLight.shadow.mapSize.height = 1024;
      scene.add(directionalLight);

      const pointLight1 = new THREE.PointLight(0x4040ff, 0.8, 10);
      pointLight1.position.set(-3, 2, 3);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0xff4040, 0.6, 10);
      pointLight2.position.set(3, -2, -3);
      scene.add(pointLight2);
    } else {
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);
    }

    let background: THREE.Mesh | null = null;
    // Create background
    if (!isMobile) {
      const bgGeometry = new THREE.SphereGeometry(50, 32, 16);
      const bgMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
        },
        vertexShader: `
          varying vec3 vWorldPosition;
          void main() {
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          varying vec3 vWorldPosition;
          void main() {
            vec3 direction = normalize(vWorldPosition);
            float gradient = dot(direction, vec3(0.0, 1.0, 0.0)) * 0.5 + 0.5;
            vec3 color1 = vec3(0.02, 0.02, 0.1);
            vec3 color2 = vec3(0.0, 0.0, 0.02);
            vec3 finalColor = mix(color2, color1, gradient);
            
            // Add subtle stars
            float stars = smoothstep(0.98, 1.0, 
              sin(vWorldPosition.x * 100.0) * 
              sin(vWorldPosition.y * 100.0) * 
              sin(vWorldPosition.z * 100.0));
            finalColor += stars * 0.3;
            
            gl_FragColor = vec4(finalColor, 1.0);
          }
        `,
        side: THREE.BackSide,
      });
      background = new THREE.Mesh(bgGeometry, bgMaterial);
      scene.add(background);
    }

    // Initialize simplex noise
    const noise3D = createNoise3D();

    // Animation function
    let time = 0;
    const animationLoop = () => {
      time += 0.002; // Fixed slow animation speed

      // Smooth hover intensity interpolation
      hoverIntensityRef.current +=
        (targetHoverIntensityRef.current - hoverIntensityRef.current) * 0.04;

      // Update sphere vertices with simplex noise
      const positions = positionAttribute.array;
      const vertex = new THREE.Vector3();

      for (let i = 0; i < positions.length; i += 3) {
        vertex.fromArray(originalPositions, i);
        vertex.normalize();

        // Base noise
        const noise = noise3D(
          vertex.x * 1.5 + time,
          vertex.y * 1.5 + time * 0.7,
          vertex.z * 1.5 + time * 0.5
        );

        // Mouse-influenced noise (disabled on mobile)
        const mouseInfluence = isMobile
          ? 0
          : noise3D(
              vertex.x * 3 + mouseRef.current.x * 2,
              vertex.y * 3 + mouseRef.current.y * 2,
              vertex.z * 3 + time * 2
            );

        // Combine base noise with mouse influence and hover intensity
        const totalNoise =
          noise + mouseInfluence * hoverIntensityRef.current * 0.5;
        const displacement =
          totalNoise * (0.2 + hoverIntensityRef.current * 0.3); // Fixed noise intensity

        vertex.multiplyScalar((isMobile ? 1.5 : 2) + displacement);

        positions[i] = vertex.x;
        positions[i + 1] = vertex.y;
        positions[i + 2] = vertex.z;
      }

      positionAttribute.needsUpdate = true;
      geometry.computeVertexNormals();

      // Smooth camera rotation based on mouse
      const lerp = 0.02;
      currentRotationRef.current.x +=
        (targetRotationRef.current.x - currentRotationRef.current.x) * lerp;
      currentRotationRef.current.y +=
        (targetRotationRef.current.y - currentRotationRef.current.y) * lerp;

      if (sphereRef.current) {
        sphereRef.current.rotation.x = currentRotationRef.current.x;
        sphereRef.current.rotation.y =
          currentRotationRef.current.y + time * 0.1;
      }

      // Update background and material only on desktop
      if (!isMobile) {
        if (background && background.material instanceof THREE.ShaderMaterial) {
          background.material.uniforms.time.value = time;
        }

        // Update material properties for dynamic effect with hover influence
        if (
          material instanceof THREE.MeshPhysicalMaterial &&
          material.iridescenceThicknessRange
        ) {
          const baseThickness = Math.sin(time * 1.5) * 150 + 400;
          const hoverBoost = hoverIntensityRef.current * 200;
          const thickness = baseThickness + hoverBoost;
          material.iridescenceThicknessRange = [
            thickness - 100,
            thickness + 100,
          ];
        }

        // Update material color based on hover
        const baseColor = new THREE.Color(0.1, 0.3, 0.8);
        const hoverColor = new THREE.Color(0.3, 0.1, 0.9);
        if (material instanceof THREE.MeshPhysicalMaterial) {
          material.color.lerpColors(
            baseColor,
            hoverColor,
            hoverIntensityRef.current * 0.6
          );
        }

        // Update metalness and roughness based on hover
        if (material instanceof THREE.MeshPhysicalMaterial) {
          material.metalness = 0.9 + hoverIntensityRef.current * 0.1;
          material.roughness = 0.1 - hoverIntensityRef.current * 0.05;
        }
      }

      if (rendererRef.current) {
        rendererRef.current.render(scene, camera);
      }

      animationRef.current = requestAnimationFrame(animationLoop);
    };

    // Mouse interaction with hover detection (disabled on mobile)
    const handleMouseMove = (event: MouseEvent) => {
      if (isMobile) return;

      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Subtle rotation
      targetRotationRef.current.x = mouseRef.current.y * 0.15;
      targetRotationRef.current.y = mouseRef.current.x * 0.15;

      // Calculate distance from center for hover effect
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const distance = Math.sqrt(
        Math.pow(event.clientX - centerX, 2) +
          Math.pow(event.clientY - centerY, 2)
      );
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
      const normalizedDistance = Math.min(distance / maxDistance, 1);

      // Inverse relationship - closer to center = higher intensity
      targetHoverIntensityRef.current = Math.max(
        0,
        1 - normalizedDistance * 1.5
      );
    };

    const handleMouseEnter = () => {
      if (isMobile) return;
      targetHoverIntensityRef.current = 1;
    };

    const handleMouseLeave = () => {
      if (isMobile) return;
      targetHoverIntensityRef.current = 0;
    };

    const handleResize = () => {
      if (rendererRef.current && camera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    animationLoop();

    // Event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    if (containerRef.current) {
      containerRef.current.addEventListener("mouseenter", handleMouseEnter);
      containerRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current) {
        containerRef.current.removeEventListener(
          "mouseenter",
          handleMouseEnter
        );
        containerRef.current.removeEventListener(
          "mouseleave",
          handleMouseLeave
        );
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, [isMobile]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transition = "opacity 1s ease-in-out";
      containerRef.current.style.opacity = animate ? "1" : "0";
    }
  }, [animate]);

  return <div ref={containerRef} className="absolute inset-0" />;
};

export default SimplexSphere;
