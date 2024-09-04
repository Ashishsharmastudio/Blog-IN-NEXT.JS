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

const BannerBottom = () => {
  return (
    <div className="banner-bottom">
       <div className="topics_sec">
              <h2>Topics</h2>
        <div className="topics_list">
          <div>
                <Link href="/topics/htmlcssjs">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <FaHtml5 />
                    </div>
                    <h3>Html, Css And JavaScript</h3>
                  </div>
                </Link>
                {/* second link */}
                <Link href="/topics/nextjs">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <TbBrandNextjs />
                    </div>
                    <h3>Next Js And React Js</h3>
                  </div>
            </Link>
          </div>
          <div>
                {/* 3rd link */}
                <Link href="/topics/database">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <FaDatabase />
                    </div>
                    <h3>Database</h3>
                  </div>
                </Link>
                {/* 4th link */}
                <Link href="/topics/deployment">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <AiOutlineDeploymentUnit />
                    </div>
                    <h3>Deployment</h3>
                  </div>
            </Link>
            </div>
              </div>
            </div>
            <div className="tags_sec">
              <h2>Tags</h2>
              <div className="tags_list">
                <Link href="/tag/html">#html</Link>
                <Link href="/tag/css">#css</Link>
                <Link href="/tag/javascript">#Java Script</Link>
                <Link href="/tag/nextjs">#Next Js</Link>
                <Link href="/tag/reactjs">#React Js</Link>
                <Link href="/tag/database">#Database</Link>
              </div>
            </div>
            
        
     
    </div>
  );
};

export default BannerBottom;
