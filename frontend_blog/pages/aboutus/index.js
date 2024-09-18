import React from "react";
import Section2 from "../../public/section-2.jpg";
import Image from "next/image";
import { PiCertificateBold } from "react-icons/pi";
import { GrUserExpert } from "react-icons/gr";
import { FaPhoneAlt } from "react-icons/fa";
import Team from "../../public/Author.jpg";
import { IoMdCheckmarkCircle } from "react-icons/io";
import Presentation from "../../public/Presentation.jpg";
import Men from "../../public/Men.png";
import { Phone, Mail, MapPin } from 'lucide-react';

const pageData = {
  teamMembers: [
    {
      name: "Ashish Sharma",
      role: "CHIEF EXECUTIVE OFFICER",
      image: Team,
    },
    {
      name: "DIVYANSHU SAINI",
      role: "CHIEF TECHNICAL OFFICER",
      image: Team,
    },
    // Add more team members here
  ],
  pointers: [
    { title: "Our Objective", icon: IoMdCheckmarkCircle },
    { title: "Our Vision", icon: IoMdCheckmarkCircle },
    { title: "Our Mission", icon: IoMdCheckmarkCircle },
  ],
  pointers2: [
    { title: "Our Objectives", icon: IoMdCheckmarkCircle },
    { title: "Our Visions", icon: IoMdCheckmarkCircle },
    { title: "Our Missions", icon: IoMdCheckmarkCircle },
  ],
  stats: [
    { number: "986+", label: "Finished Projects" },
    { number: "896+", label: "Happy Clients" },
    { number: "396+", label: "Skilled Experts" },
    { number: "496+", label: "Honorable Awards" },
  ],
  profileCards: [
    {
      image: Men,
      rating: 5,
      description:
        "Objectively visualize error-free technology for B2B alignment. Monotonectally harness an expanded array of models via effective collaboration. Globally synergize resource sucking value via cutting-edge.",
      name: "Jackline Techie",
      position: "CEO at Kormola",
    },
    // Add three more profile card objects here with different data
    {
      image: Men,
      rating: 4,
      description:
        "Efficiently implement customer-centric solutions through strategic partnerships. Proactively leverage existing high-quality products to drive innovation. Seamlessly maximize client-based deliverables.",
      name: "John Smith",
      position: "CTO at TechCorp",
    },
    {
      image: Men,
      rating: 5,
      description:
        "Dynamically evolve cross-platform technologies through user-centric methodologies. Collaboratively scale backward-compatible architectures with sustainable e-markets. Enthusiastically cultivate synergistic paradigms.",
      name: "Emma Johnson",
      position: "COO at InnovateCo",
    },
  ],
};

const About = () => {
  // redirectin function secction - 7
  const handlePhoneClick = () => {
    window.location.href = 'tel:+19088000393';
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:info@webteck.com';
  };

  const handleLocationClick = () => {
    window.open('https://maps.google.com/?q=54 Flemington, USA', '_blank');
  };

  return (
    // sectino -1
    <section>
      <div className="about-us-section">
        <h1>About Us</h1>
        <p>Home &gt;&gt; About Us</p>
      </div>
      {/* section- 2 */}
      <section className="about-us-section-2">
        <div className="about-us-image">
          <Image src={Section2} alt="About Us Image" height={250} width={250} />
        </div>
        <div className="about-us-content">
          <h3>ABOUT US</h3>
          <h1>
            We Are Increasing Business <br /> Success With IT Solution
          </h1>
          <p>
            Collaboratively envisioneer user-friendly supply chains and
            cross-unit Imperative. Authoritatively fabricate competitive
            resource and holistic synergy. Uniquely generate efficient schemas
            before future.
          </p>
          <div className="certification-section">
            <div className="certified-company">
              <div className="image-area-1">
                <PiCertificateBold />
              </div>
              <div className="text-area-1">
                <h3>Certified Company</h3>
                <p>Best Provide Skills Services</p>
              </div>
            </div>
            <div className="certified-company">
              <div className="image-area-1">
                <GrUserExpert height={100} width={100} />
              </div>
              <div className="text-area-1">
                <h3>Certified Company</h3>
                <p>Best Provide Skills Services</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="call-to-action">
            <button className="discover-more-button">DISCOVER MORE →</button>
            <div className="phone-icon-container">
              <FaPhoneAlt className="phone-icon" />
              <p>Call Us On: +190-8800-0393</p>
            </div>
          </div>
        </div>
      </section>
      {/* section-3 */}
      <section className="team-member-section">
        <h2>See Our Skilled Expert Team</h2>
        <div className="team-members">
          {pageData.teamMembers.map((member, index) => (
            <div className="team-member" key={index}>
              <div className="team-member-image">
                <Image
                  src={member.image}
                  height={250}
                  width={250}
                  alt={member.name}
                />
              </div>
              <div className="team-member-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/*  section -4 */}
      <section className="stats-section">
        <div className="stats-container">
          {pageData.stats.map((stat, index) => (
            <div className="stat" key={index}>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
      {/* section - 5*/}
      <section className="choose-us-section">
        <div className="choose-us-container">
          <div className="con-1">
            <h2>Why Choose Us</h2>
            <h1>
              We Deal With The Aspects Professional<span> IT Service </span>
            </h1>
            <p>
              This code creates a webpage that tells visitors about a <br />{" "}
              company or organization. It doesn't take any inputs directly, but
              it uses
            </p>
            <div className="objective-con">
              <div className="objective-con-1">
                {pageData.pointers.map((pointer, index) => (
                  <div className="pointer" key={index}>
                    <div className="pointer-icon">
                      <pointer.icon />
                    </div>
                    <div className="pointer-text">
                      <h3>{pointer.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
              <div className="objective-con-2">
                {pageData.pointers2.map((pointer, index) => (
                  <div className="pointer" key={index}>
                    <div className="pointer-icon">
                      <pointer.icon />
                    </div>
                    <div className="pointer-text">
                      <h3>{pointer.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="con-2">
            <Image src={Presentation} alt="img" />{" "}
          </div>
        </div>
      </section>
      {/* section - 6 */}
      <section className="testimonial-section">
        <div className="testimonial-section-text">
          <h3>CUSTOMER FEEDBACK</h3>
          <h1>What Happy Clients Says</h1>
          <h2>About Us ?</h2>
        </div>
        <div className="testimonial-section-cards">
          {pageData.profileCards.map((card, index) => (
            <div className="profile-card" key={index}>
              <div className="profile-image">
                <Image src={card.image} alt="Profile" />
                <div className="rating">
                  {[...Array(card.rating)].map((_, i) => (
                    <span className="star" key={i}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <div className="profile-info">
                <p>{card.description}</p>
                <h3>{card.name}</h3>
                <p>{card.position}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* section - 7 */}
      <section className="header-container">
      <div className="logo-container">
        <svg className="logos" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 3L4 9V21H20V9L11 3L13 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="company-name">WebTeck</span>
      </div>
      <div className="content-container">
        <svg className="arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className="contact-info">
          <div className="contact-item" onClick={handlePhoneClick}>
            <Phone className="icon" />
            <span>Quick Call Us: +190-8800-0393</span>
          </div>
          <div className="contact-item" onClick={handleEmailClick}>
            <Mail className="icon" />
            <span>Mail Us On: info@webteck.com</span>
          </div>
          <div className="contact-item" onClick={handleLocationClick}>
            <MapPin className="icon" />
            <span>Visit Location: 54 Flemington, USA</span>
          </div>
        </div>
      </div>
    </section>
    </section>
  );
};

export default About;
