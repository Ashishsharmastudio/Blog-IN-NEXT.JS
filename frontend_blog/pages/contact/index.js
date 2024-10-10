import React, { useState, useEffect } from "react";
import Image from "next/image";
import ContactImg from "../../public/contactimg.png";
import Line from "../../public/Line-1.png";
import { FaLocationDot } from "react-icons/fa6";
import ContactForm from "../../components/contactForm";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { RxLinkedinLogo } from "react-icons/rx";
import { TbBrandFiverr } from "react-icons/tb";

const Contact = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <section className="contact">
        <div className="contact-form">
          <div className="text-area">
            <h1>Contact Us</h1>
            <div className="elementor">
              <Image
                decoding="async"
                width="289"
                height="14"
                src={Line}
                className="attachment-large size-large wp-image-238180"
                alt=""
              />
            </div>
            <div className="p-tag">
              <p>
                Please feel free to contact us below on any questions you have!
              </p>
            </div>
            <div className="button-con">
              <button className="btn">
                <a href="#">View available site</a>
              </button>
              <button className="btn">
                <a href="#">Buy a Site</a>
              </button>
            </div>
          </div>
          <div className="image-area">
            <Image src={ContactImg} alt="contact"/>
          </div>
        </div>
      </section>
      <section className="contact-form-2">
        <div className="cont">
          <div className="contact-form-2-area">
            <h1>Contact Info...</h1>
            <div className="address">
              <ul>
                <li>
                  <span>
                    <FaLocationDot />
                  </span>
                  <span>
                    Hansari Jhansi
                    <br />
                    L9Y 1A1
                  </span>
                </li>
              </ul>
            </div>
            <div className="social-link">
              <ul>
                <li>
                  <a href="#">
                    <FaInstagram />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <BsTwitterX />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <RxLinkedinLogo />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <TbBrandFiverr />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="form-area">
            <div className="form-border">
              <div className="h1">
                <h1>Get in touch</h1>
              </div>
              <div className="elementor-element">
                <div className="elementor-widget">
                  <p>* Required fields</p>
                </div>
              </div>
              {isClient && <ContactForm />}
            </div>
          </div>
        </div>
      </section>
      {/* sec-3 question section  */}
      <section class="questions-section">
        <div class="container-3">
          <div class="content-wrapper">
            <h2 class="heading">Have Some Questions?</h2>
            <p class="description">
              Let's talk about your website. Send us a message and we will be in
              touch within one business day.
            </p>
            <a href="#" class="cta-button">
              Have a Specific Question?
            </a>
          </div>
        </div>
      </section>
      {/* End of  sec-3 question section  */}
      {/* sec-4 news latter section  */}
      <section class="newsletter-section">
        <div class="container-4">
          <h2 class="section-title">Subscribe to Our Newsletter</h2>
          <form class="newsletter-form">
            <div class="form-group">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email here"
                required
              />
            </div>
            <button type="submit" class="subscribe-button">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;