import React, { useState, useEffect } from "react";
import Image from "next/image";
import ContactImg from "../../public/contactimg.png";
import Line from "../../public/Line-1.png";
import { FaLocationDot } from "react-icons/fa6";
import ContactForm from "../../components/contactForm";

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
            <Image src={ContactImg} alt="contact" width={700} height={500} />
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
                    1 First Street, Suite #220B Collingwood, Ontario,
                    <br />
                    L9Y 1A1
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="form-area">
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
      </section>
    </>
  );
};

export default Contact;
