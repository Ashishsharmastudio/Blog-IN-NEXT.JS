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
import { Phone, Mail, MapPin, Icon } from "lucide-react";
import Line from "../../public/Line-1.png";
import { FaFileCircleCheck } from "react-icons/fa6";
import { PiSmileyFill } from "react-icons/pi";
import { FaAward } from "react-icons/fa6";
import { CiCircleCheck } from "react-icons/ci";
import Feedback1 from "../../public/Feedbac-1.jpg";
import Feedback2 from "../../public/Feedback-2.jpg";
import Feedback3 from "../../public/Feedback-3.jpg";
import { IoIosArrowDropleft } from "react-icons/io";
import AboutImg from "../../public/blank.jpg";
import { IoHomeOutline } from "react-icons/io5";

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
    { title: "Certified Excellence", icon: CiCircleCheck },
    { title: "Skilled Artisans", icon: CiCircleCheck },
    { title: "Visionary Approach", icon: CiCircleCheck },
  ],
  pointers2: [
    { title: "Full-Stack Mastery", icon: CiCircleCheck },
    { title: "Innovative Solutions", icon: CiCircleCheck },
    { title: "Client-Centric Focus", icon: CiCircleCheck },
  ],
  stats: [
    { icon: FaFileCircleCheck, number: "986+", label: "Finished Projects" },
    { icon: PiSmileyFill, number: "896+", label: "Happy Clients" },
    { icon: GrUserExpert, number: "396+", label: "Skilled Experts" },
    { icon: FaAward, number: "496+", label: "Honorable Awards" },
  ],

  profileCards: [
    {
      image: Feedback1,
      rating: 5,
      body:
        "Objectively visualize error-free technology for B2B alignment. Monotonectally harness an expanded array of models via effective collaboration. Globally synergize resource sucking value via cutting-edge.",
      name: "Jackline Techie",
      position: "CEO at Kormola",
    },
    // Add three more profile card objects here with different data
    {
      image: Feedback2,
      rating: 4,
      body:
        "Efficiently implement customer-centric solutions through strategic partnerships. Proactively leverage existing high-quality products to drive innovation. Seamlessly maximize client-based deliverables.",
      name: "John Smith",
      position: "CTO at TechCorp",
    },
    {
      image: Feedback3,
      rating: 5,
      body:
        "Dynamically evolve cross-platform technologies through user-centric methodologies. Collaboratively scale backward-compatible architectures with sustainable e-markets. Enthusiastically cultivate synergistic paradigms.",
      name: "Emma Johnson",
      position: "COO at InnovateCo",
    },
  ],
};

const About = () => {
  // redirectin function secction - 7
  const handlePhoneClick = () => {
    window.location.href = "tel:+91 9140585097";
  };
  const handlewhatsappClick = () => {
    window.location.href = "https://wa.me/9140585097";
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:info@ashishsharmastudio@gmial.com";
  };

  const handleLocationClick = () => {
    window.open("https://maps.google.com/?q=54 jhansi,India", "_blank");
  };
  //function for pairing stats data
  function chunk(array, size) {
    const chunked = [];
    for (let i = 0; i < array.length; i += size) {
      chunked.push(array.slice(i, i + size));
    }
    return chunked;
  }

  return (
    // sectino -1
    <section>
      <div className="about-us-section">
        <div className="about-us-text">
          <h1>About Us</h1>
          <p>Home &gt;&gt; About Us</p>
        </div>
      </div>
      {/* section- 2 */}
      <section className="about-us-section-2">
        <div className="about-us-image">
          <Image src={Section2} alt="About Us Image" height={250} width={250} />
        </div>
        <div className="about-us-content">
          <h3>ABOUT US</h3>
          <div className="elementor-1">
            <Image
              decoding="async"
              width="289"
              height="14"
              src={Line}
              className="attachment-large size-large wp-image-238180"
              alt=""
            />
          </div>
          <h1>
            We Transform Ideas into Full-Stack Realities <br /> Crafting Digital
            Ecosystems
          </h1>
          <p>
            At the intersection of creativity and technology, we stand as
            architects of the digital realm. Our passion? Breathing life into
            your vision through the art and science of full-stack development.
          </p>
          <div className="certification-section">
            <div className="certified-company">
              <div className="image-area-1">
                <PiCertificateBold color="#2ec79a" size={50} />
              </div>
              <div className="text-area-1">
                <h3>Certified Company</h3>
                <p>Best Provide Skills Services</p>
              </div>
            </div>
            <div className="certified-company">
              <div className="image-area-1">
                <GrUserExpert color="#2ec79a" size={50} />
              </div>
              <div className="text-area-1">
                <h3>Certified Company</h3>
                <p>Best Provide Skills Services</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="call-to-action">
            <button className="btn-2">DISCOVER MORE →</button>
            <div className="phone-icon-container">
              <FaPhoneAlt color="white" className="phone-icon" />
              <p onClick={handlePhoneClick}>Call Us On: +91 9140585097</p>
            </div>
          </div>
        </div>
      </section>
      {/* section-3 */}
      {/* <section className="team-member-section">
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
      </section> */}
      {/*  section -4 */}
      <section className="stats-section">
        <div className="stats-container">
          {chunk(pageData.stats, 2).map((pair, pairIndex) => (
            <div className="stat-pair" key={pairIndex}>
              {pair.map((stat, index) => (
                <div className="stat" key={index}>
                  <div className="stats-icon">
                    <stat.icon size={40} />
                  </div>
                  <div className="stat-number">
                    {stat.number}
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </div>
              ))}
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
              We Architect <span>Digital Ecosystems</span> with Full-Stack Mastery
            </h1>
            <p>
              At the crossroads of innovation and technology, we transform ideas into tangible digital realities,crafting bespoke solutions for the modern age.
            </p>
            <div className="objective-con">
              <div className="objective-con-1">
                {pageData.pointers.map((pointer, index) => (
                  <div className="pointer" key={index}>
                    <div className="pointer-icon">
                      <pointer.icon size={30} />
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
                      <pointer.icon size={30} />
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
                <p>{card.body}</p>
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
          <IoHomeOutline color="#2ec79a" size={18} />
          <span className="company-name"><a href="https://www.linkedin.com/in/ashish-sharma-rrr/" target="_blank">  Ashish  </a></span>
          <IoIosArrowDropleft id="arrow" size={18} color="#2ec79a" />
        </div>
        <div className="content-container">
         
          <div className="contact-info">
            <div className="contact-item" onClick={handlePhoneClick}>
              <Phone className="icon" />
              <span>Quick Call Us: +91 9140585097</span>
            </div>
            <div className="contact-item" onClick={handlewhatsappClick}>
              <Phone className="icon" />
              <span>Whatsapp Us: +91 9140585097</span>
            </div>
            <div className="contact-item" onClick={handleEmailClick}>
              <Mail className="icon" />
              <span>Mail Us On: ashishsharmastudio@gmail.com</span>
            </div>
            <div className="contact-item" onClick={handleLocationClick}>
              <MapPin className="icon" />
              <span>Visit Location: Jhansi UP</span>
            </div>
          </div>
        </div>
      </section> 
    </section>
  );
};

export default About;