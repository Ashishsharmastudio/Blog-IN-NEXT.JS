import React from "react";
import { MdOutlineMonitor } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { GoComment } from "react-icons/go";
import Link from "next/link";
import firstImage from "@/public/noimage.jpg";
import { FaHtml5, FaGithub, FaInstagram } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { FaDatabase, FaXTwitter } from "react-icons/fa6";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import { MdOutlineDevicesOther } from "react-icons/md";
import { FaTv } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { RiWomenLine } from "react-icons/ri";

const BannerBottom = () => {
  return (
    <div className="banner-bottom">
      <div className="topics_sec">
        <h2>Topics</h2>
        <div className="topics_list">
          <div>
            <Link href="/topics/mobilecomputer">
              <div className="topics">
                <div className="flex flex-center topics_svg">
                  <MdOutlineDevicesOther />
                </div>
                <h3>Mobile & Computer</h3>
              </div>
            </Link>
            {/* second link */}
            <Link href="/topics/tvappliances">
              <div className="topics">
                <div className="flex flex-center topics_svg">
                  <FaTv />
                </div>
                <h3>TV,Appliances&Electronics</h3>
              </div>
            </Link>
            <Link href="/topics/others">
              <div className="topics">
                <div className="flex flex-center topics_svg">
                  <AiOutlineDeploymentUnit />
                </div>
                <h3>Other's</h3>
              </div>
            </Link>
          </div>
          <div>
            {/* 3rd link */}
            <Link href="/topics/mensfashion">
              <div className="topics">
                <div className="flex flex-center topics_svg">
                  <FaPerson />
                </div>
                <h3>Men's Fashion</h3>
              </div>
            </Link>
            {/* 4th link */}
            <Link href="/topics/fashion">
              <div className="topics">
                <div className="flex flex-center topics_svg">
                  <RiWomenLine />
                </div>
                <h3>Women's Fashion</h3>
              </div>
            </Link>
          </div>

        </div>
      </div>
      <div className="tags_sec">
        <h2>Tags</h2>
        <div className="tags_list">
          <Link href="/tag/review">#review</Link>
          <Link href="/tag/comparison">#comparison</Link>
          <Link href="/tag/budget">#budget</Link>
          <Link href="/tag/premium">#premium</Link>
          <Link href="/tag/newrelease">#newrelease</Link>
          <Link href="/tag/howto">#howto</Link>
          <Link href="/tag/tips">#tips</Link>
          <Link href="/tag/accessories">#accessories</Link>
          <Link href="/tag/software">#software</Link>
          <Link href="/tag/hardware">#hardware</Link>
          <Link href="/tag/mobile">#mobile</Link>
          <Link href="/tag/desktop">#desktop</Link>
          <Link href="/tag/gaming">#gaming</Link>
          <Link href="/tag/productivity">#productivity</Link>
          <Link href="/tag/security">#security</Link>
        </div>
      </div>
    </div>
  );
};

export default BannerBottom;
