import * as THREE from "three";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Suspense } from "react";

// GLSL simplex noise function
const glslSimplexNoise = `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857; // 1.0/7.0
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`;

const vertexShader = `
  attribute vec3 position2;
  uniform float uTime;
  uniform float uProgress;
  uniform float uNoiseScale;
  uniform float uNoiseSpeed;

  varying float vNoise;

  ${glslSimplexNoise}

  void main() {
    vec3 p = position;

    float noise = snoise(p * uNoiseScale + uTime * uNoiseSpeed);
    vNoise = noise;

    float transitionStrength = sin(uProgress * 3.14159265359);

    vec3 mixedPosition = mix(p, position2, uProgress);
    
    vec3 displacedPosition = mixedPosition + normal * noise * transitionStrength * 2.0;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
  }
`;

const fragmentShader = `
  varying float vNoise;
  uniform float uProgress;

  void main() {
    vec3 color1 = vec3(0.0, 0.8, 1.0);
    vec3 color2 = vec3(1.0, 0.4, 0.2);
    vec3 mixedColor = mix(color1, color2, uProgress);
    
    float noiseFactor = (vNoise + 1.0) / 2.0; // noise from -1..1 to 0..1
    
    gl_FragColor = vec4(mixedColor * (1.0 + noiseFactor * 0.2), 1.0);
  }
`;

function ModelTransitionEffect({
  modelPath1,
  modelPath2,
}: {
  modelPath1: string;
  modelPath2: string;
}) {
  const { scene: scene1 } = useGLTF(modelPath1);
  const { scene: scene2 } = useGLTF(modelPath2);
  const shaderRef = useRef<THREE.ShaderMaterial>(null);

  const [geometry1, geometry2] = useMemo(() => {
    let geo1: THREE.BufferGeometry | undefined;
    let geo2: THREE.BufferGeometry | undefined;

    scene1.traverse((o: THREE.Object3D) => {
      if (o instanceof THREE.Mesh) geo1 = o.geometry;
    });

    scene2.traverse((o: THREE.Object3D) => {
      if (o instanceof THREE.Mesh) geo2 = o.geometry;
    });

    return [geo1, geo2];
  }, [scene1, scene2]);

  if (geometry1 && geometry2) {
    const pos1Count = geometry1.attributes.position.count;
    const pos2Array = new Float32Array(pos1Count * 3);
    const g2PosArray = geometry2.attributes.position.array;
    pos2Array.set(g2PosArray.subarray(0, pos2Array.length));
    geometry1.setAttribute(
      "position2",
      new THREE.BufferAttribute(pos2Array, 3)
    );
  }

  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = clock.getElapsedTime();
      shaderRef.current.uniforms.uProgress.value =
        (Math.sin(clock.getElapsedTime() * 0.5) + 1) / 2;
    }
  });

  return (
    <mesh geometry={geometry1}>
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uProgress: { value: 0 },
          uNoiseScale: { value: 1.5 },
          uNoiseSpeed: { value: 0.2 },
        }}
      />
    </mesh>
  );
}

export default function ModelTransition() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Suspense fallback={null}>
        <ModelTransitionEffect
          modelPath1="/chiki_funko.glb"
          modelPath2="/funko.glb"
        />
      </Suspense>
    </Canvas>
  );
}
