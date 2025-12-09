// components/CookieSettingsButton.jsx
"use client";

import Cookies from "js-cookie";
import { COOKIE_NAME } from "./CookieBanner";

export default function CookieSettingsButton({ className = "" }) {
  const handleClick = () => {
    Cookies.remove(COOKIE_NAME);
    window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className || "cookie-settings-btn"}
    >
      Impostazioni cookie
    </button>
  );
}
