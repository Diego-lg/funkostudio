import React from "react";
import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import LazyModel from "../3d/LazyModel";
import { useTranslation } from "react-i18next";

const Contact: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="contact" className="py-24 bg-background relative">
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent" />

      <div className="container mx-auto px-6">
        <SectionTitle
          title={t("contact.title")}
          subtitle={t("contact.subtitle")}
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left column - Contact info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <h3 className="text-3xl font-semibold mb-8 text-text-primary">
                {t("contact.form_title")}
              </h3>

              <p className="text-text-secondary mb-12">
                {t("contact.form_description")}
              </p>

              <div className="space-y-6 mb-12">
                <div className="flex items-start space-x-4">
                  <div className="text-accent mt-1">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-text-primary">
                      {t("contact.location")}
                    </h4>
                    <p className="text-text-secondary">
                      {t("contact.address")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-accent mt-1">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-text-primary">
                      {t("contact.email")}
                    </h4>
                    <p className="text-text-secondary">
                      contact@designstudio.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-accent mt-1">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-text-primary">
                      {t("contact.phone")}
                    </h4>
                    <p className="text-text-secondary">+1 650 351 5143</p>
                  </div>
                </div>
              </div>

              {/* 3D model */}
              <div className="h-64 lg:h-72 mt-8 bg-secondary/10 rounded-2xl overflow-hidden border border-secondary/20 shadow-xl shadow-background">
                <LazyModel modelPath="" />
              </div>
            </motion.div>
          </div>

          {/* Right column - Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 bg-gradient-to-br from-secondary/20 to-background p-8 rounded-2xl border border-secondary/30 flex flex-col items-center justify-center text-center"
          >
            <h3 className="text-2xl font-semibold mb-6 text-text-primary">
              {t("contact.send_message_title")}
            </h3>
            <p className="text-text-secondary mb-8 max-w-md">
              {t("contact.send_message_description")}
            </p>
            <motion.a
              href="https://wa.me/16503515143"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full max-w-xs flex items-center justify-center gap-2 px-8 py-3 bg-accent hover:bg-purple-500 transition-colors text-white font-medium rounded-full shadow-lg shadow-accent/20"
            >
              <Send size={18} />
              {t("contact.send_message_button")}
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
