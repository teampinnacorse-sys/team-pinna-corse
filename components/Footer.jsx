"use client";

import Link from "next/link";
import "./Footer.css";
import CookieSettingsButton from "./CookieSettingsButton";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Brand */}
        <div className="footer__brand">
          <h3 className="footer__title">Team Pinna Corse</h3>
          <p className="footer__tag">Passione, precisione e potenza.</p>
        </div>

        {/* Link di navigazione + legali */}
        <nav className="footer__links">
          <div>
            <h4>Menu</h4>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/team">Team</Link>
              </li>
              <li>
                <Link href="/gallery">Gallery</Link>
              </li>
              <li>
                <Link href="/news">News</Link>
              </li>
              <li>
                <Link href="/partners">Partners</Link>
              </li>
              <li>
                <Link href="/contatti">Contatti</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>Contatti</h4>
            <ul>
              <li>
                <a href="mailto:teampinnacorse@gmail.com">
                  teampinnacorse@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4>Legale</h4>
            <ul className="footer__legal-list">
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/cookie-policy">Cookie Policy</Link>
              </li>
              <li>
                <CookieSettingsButton className="footer__cookie-btn" />
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <p>© {year} Team Pinna Corse — All rights reserved.</p>
        <p className="footer__credit">Website by Gioele Friggia</p>
      </div>
    </footer>
  );
}
