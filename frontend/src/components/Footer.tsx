import React from "react";
import { Flex, IconButton, Input } from "@chakra-ui/react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2>&lt; Wild Code Hub /&gt;</h2>
          <p>About Us</p>
          <p>Why Choose us</p>
        </div>
        <div className="footer-section">
          <h2>Resources</h2>
          <p>Privacy Policy</p>
          <p>Terms and Condition</p>
        </div>
        <div className="footer-section">
          <h2>Contact Us</h2>
          <a href="mailto:wildcodehub@gmail.com">wildcodehub@gmail.com</a>
          <div className="footer-icon">
            <a
              href="https://github.com/WildCodeSchool/2309-wns-jaune-wild-code-hub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                alt="GitHub"
              />
            </a>
          </div>
        </div>
        <div className="footer-section">
          <h2>Subscribe To Our Newsletter</h2>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email" />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Wild Code Hub. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
