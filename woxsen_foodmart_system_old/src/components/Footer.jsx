import React from "react";
import "./footer.css";
import inst from "./instagram.svg";
import twit from "./twitter.svg";
import face from "./facebook.svg";

const Footer = () => {
  return (
    <footer className="footer flex-between">
      <h3 className="footer__logo">
        <span>EnviroFeast</span> : Fostering Sustainable Dining
      </h3>

      <ul className="footer__nav">
        <li>
          <a href="#food">Food</a>
        </li>
        <li>
          <a href="#about">About Us</a>
        </li>
        <li>
          <a href="/admin">Go to Admin</a>
        </li>
      </ul>

      <ul className="footer__social">
        <li className="flex-center">
          <a href="https://www.facebook.com/woxsen/" target="_blank">
            <img src={face} alt="facebook" />
          </a>
        </li>

        <li className="flex-center">
          <a
            href="https://www.instagram.com/woxsen_university/"
            target="_blank"
          >
            <img src={inst} alt="instagram" />
          </a>
        </li>

        <li className="flex-center">
          <a href="https://twitter.com/Woxsen" target="_blank">
            <img src={twit} alt="twitter" />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
