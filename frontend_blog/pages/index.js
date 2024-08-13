import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import MenImage from '@/public/ashish.jpg';
import { useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import NoImg from '@/public/no image.jpg';
import AuthorI from '@/public/ashish.jpg'
import { FaHtml5 } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { FaDatabase } from "react-icons/fa6";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";





// import { Inter } from "next/font/google";
// import styles from "@/styles/Home.module.css";



export default function Home() {

   const [currentPage, setCurrentPage] = useState(1); //page number
   const [perPage] = useState(5); //five blog per page
   const { alldata, loading } = useFetchData('/api/getblog');

   //function to handle page change
   const paginate = (pageNumbers) => {
      setCurrentPage(pageNumbers);
   }
   const indexOfLastblog = currentPage * perPage;
   const indexOfFirstblog = indexOfLastblog - perPage;
   const currentBlogs = alldata.slice(indexOfFirstblog, indexOfLastblog);

   const allblog = alldata.length;

   //filter publish blogs
   const publishedblogs = currentBlogs.filter(ab => ab.status === 'publish');

   const pageNumbers = [];

   for (let i = 1; i < Math.ceil(allblog / perPage); i++) {
      pageNumbers.push(i);
   }

   function extractFirstImageUrl(markdownContent) {
      // check if markdowncontent is provided and non-emty
      if (!markdownContent || typeof markdownContent !== 'string') {
         return null;
      }

      // regular expression to match the first image url in markdown format ![alt](imageurl)
      const regex = /!\[.*?\]\((.*?)\)/;
      const match = markdownContent.match(regex);
      return match ? match[1] : null;
   }
   return (
      <>
         <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <section className="header_data_section">
            <div className="container flex flex-sb w-100">
               <div className="leftheader_info">
                  <h1>Hi I am <span>Ashish Sharma</span><br />
                     Full Stack Developer</h1>
                  <h3>Specilized in Java Script, React and Next js</h3>
                  <div className="flex gap-2">
                     <Link href="/contact"><button> contact Us</button></Link>
                     <Link href="/about"><button> About Me</button></Link>
                  </div>
               </div>
               <div className="rightheader_img">
                  <div className="image_bg_top"></div>
                  <div className="image_bg_top2"></div>
                  <Image src={MenImage} alt="image" />
               </div>
            </div>
         </section>
         <section className="main_blog_section">
            <div className="container flex flex-sb flex-left flex-wrap">
               <div className="leftblog_sec">
                  <h2>Recently Published </h2>
                  <div className="blogs_sec">
                     {loading ? <div className="wh_100 flex flex-center mt-2 pb-5">
                        <div className="loader">
                        </div>
                     </div> : <>
                        {publishedblogs.map((blog) => {
                           //in the markdown content first image show here
                           const firstImageUrl = extractFirstImageUrl(blog.description);
                           return <div className="blog" key={blog._id}>
                              <div className="blogimg">
                                 {/* if not image in markdown show on image  */}
                                 <Link href={`/blog/${blog.slug}`}>
                                    <Image src={firstImageUrl || NoImg} alt={blog.title} />
                                 </Link>
                              </div>
                              <div className="bloginfo">
                                 <Link href={`/tag/${blog.tags[0]}`}>
                                    <div className="blogtag">{blog.tags[0]}</div>
                                 </Link>
                                 <Link href={`/blog/${blog.slug}`}><h3>{blog.title}</h3></Link>
                                 <p>{blog.description}
                                 </p>
                                 <div className="blogauthor flex gap-1 ">
                                    <div className="blogaimg">
                                    <Image src={AuthorI} alt="author" />
                                    </div>
                                    <div className="flex flex-col flex-left gap-05">
                                       <h4>Ashish Sharma</h4>
                                       <span>{new Date(blog.createAt).toLocaleDateString('en-Us', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                    </div>
                                 </div>
                              </div>
                           </div>

                        })}
                     </>}
                  </div>
                  <div className="blogpagination">
                     <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                     {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map
                        (number => (
                           <button key={number} onClick={() => paginate(number)}
                              className={currentPage === number ? 'active' : ''}>{number}</button>
                        ))}
                     <button onClick={() => paginate(currentPage + 1)} disabled={currentBlogs.length < perPage}>Next</button>
                  </div>
               </div>
               <div className="rightblog_info">
                  <div className="topics_sec">
                     <h2>Topics</h2>
                     <div className="topics_list">
                        <Link href='/topics/htmlcssjs'>
                           <div className="topics">
                              <div className="flex flex-center topics_svg">
                                 <FaHtml5 />
                              </div>
                              <h3>Html, Css And JavaScript</h3>
                           </div>
                        </Link>
                        {/* second link */}
                        <Link href='/topics/nextjs'>
                           <div className="topics">
                              <div className="flex flex-center topics_svg">
                                 <TbBrandNextjs />
                              </div>
                              <h3>Next Js And React Js</h3>
                           </div>
                        </Link>
                        {/* 3rd link */}
                        <Link href='/topics/database'>
                           <div className="topics">
                              <div className="flex flex-center topics_svg">
                                 <FaDatabase />
                              </div>
                              <h3>Database</h3>
                           </div>
                        </Link>
                        {/* 4th link */}
                        <Link href='/topics/deployment'>
                           <div className="topics">
                              <div className="flex flex-center topics_svg">
                                 <AiOutlineDeploymentUnit />
                              </div>
                              <h3>Deployment</h3>
                           </div>
                        </Link>
                     </div>

                  </div>
                  <div className="tags_sec mt-3">
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
                  <div className="letstalk_sec mt-3">

                     <h2>Let's Talk</h2>
                     <div className="talk_sec">
                        <h4>Want to find out know i can solve problems specific to your business ? let's talk.</h4>
                        <div className="social_talk flex flex-center gap-1 mt-2">
                           <div className="st_icon">
                              <FaGithub />
                           </div>
                           <div className="st_icon">
                              <FaXTwitter />
                           </div>
                           <div className="st_icon">
                              <FaInstagram />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

      </>
   );
}
