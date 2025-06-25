import React from "react";
import { useTranslation } from "react-i18next";

interface LanguageTogglerProps {
  isMobile?: boolean;
}

const LanguageToggler: React.FC<LanguageTogglerProps> = ({
  isMobile = false,
}) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  if (isMobile) {
    return (
      <div className="flex items-center justify-center space-x-4 pt-4">
        <button
          onClick={() => changeLanguage("en")}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
            i18n.language.startsWith("en")
              ? "bg-accent text-white"
              : "bg-background-secondary text-text-secondary"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => changeLanguage("es")}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
            i18n.language.startsWith("es")
              ? "bg-accent text-white"
              : "bg-background-secondary text-text-secondary"
          }`}
        >
          ES
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => changeLanguage("en")}
        className={`px-2 py-1 text-sm font-medium rounded-md transition-colors ${
          i18n.language.startsWith("en")
            ? "bg-accent text-white"
            : "text-text-secondary hover:text-text-primary"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage("es")}
        className={`px-2 py-1 text-sm font-medium rounded-md transition-colors ${
          i18n.language.startsWith("es")
            ? "bg-accent text-white"
            : "text-text-secondary hover:text-text-primary"
        }`}
      >
        ES
      </button>
    </div>
  );
};

export default LanguageToggler;
