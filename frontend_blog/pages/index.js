import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import useFetchData from "@/hooks/useFetchData";
import MenImage from "@/public/carousel1.jpg";
import NoImg from "@/public/noimage.jpg";
import Author2 from "@/public/carousel3.jpg";
import AuthorI from "@/public/ashish.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import secondimg from "../public/carousel2.jpg";
import BannerBottom from "@/components/BannerBottom";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(6);
  const { alldata, loading } = useFetchData("/api/getblog");

  const paginate = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };
  const indexOfLastblog = currentPage * perPage;
  const indexOfFirstblog = indexOfLastblog - perPage;
  const currentBlogs = alldata.slice(indexOfFirstblog, indexOfLastblog);

  const allblog = alldata.length;
  const publishedblogs = currentBlogs.filter((ab) => ab.status === "publish");

  const pageNumbers = [];
  for (let i = 1; i < Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i);
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Your Tech Review Blog",
      "url": "https://yourdomain.com",
      "description": "In-depth reviews of the latest tech products and gadgets",
      "blogPost": publishedblogs.map((blog) => ({
        "@type": "BlogPosting",
        "headline": blog.title,
        "datePublished": blog.createAt,
        "author": {
          "@type": "Person",
          "name": "Ashish Sharma"
        },
        "image": blog.mainImage || NoImg,
        "url": `https://yourdomain.com/blog/${blog.slug}`
      }))
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [publishedblogs]);

  return (
    <>
      <Head>
        <title>Tech Product Reviews | Your Website Name</title>
        <meta name="description" content="Discover in-depth reviews of the latest tech products, gadgets, and innovations. Stay informed with our expert analysis and comparisons." />
        <meta property="og:title" content="Tech Product Reviews | Your Website Name" />
        <meta property="og:description" content="Discover in-depth reviews of the latest tech products, gadgets, and innovations." />
        <meta property="og:image" content="/path-to-og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://yourdomain.com" />
      </Head>

      <main>
        <section className="full-width-slider" aria-label="Featured posts slider">
          <Slider {...sliderSettings}>
            <div>
              <Image
                src={MenImage}
                alt="Featured tech product 1"
                layout="responsive"
                width={1920}
                height={1080}
                priority
              />
            </div>
            <div>
              <Image
                src={secondimg}
                alt="Featured tech product 2"
                layout="responsive"
                width={1920}
                height={1080}
              />
            </div>
            <div>
              <Image
                src={Author2}
                alt="Featured tech product 3"
                layout="responsive"
                width={1920}
                height={1080}
              />
            </div>
          </Slider>
        </section>

        <div className="bannerb">
          <BannerBottom />
        </div>

        <section className="main_blog_section" aria-label="Recent blog posts">
          <h2 id="hadding">Recently Published</h2>
          <div className="leftblog_sec">
            <div className="blogs_sec">
              {loading ? (
                <div className="wh_100 flex flex-center mt-2 pb-5">
                  <div className="loader" aria-label="Loading content"></div>
                </div>
              ) : (
                <>
                  {publishedblogs.map((blog, index) => (
                    <article className="blog" key={blog._id}>
                      <div className="blogs">
                        <div className="blogimg">
                          <Link href={`/blog/${blog.slug}`}>
                            <Image
                              src={blog.mainImage || NoImg}
                              alt={`Featured image for ${blog.title}`}
                              width={300}
                              height={200}
                              layout="responsive"
                              loading={index === 0 ? "eager" : "lazy"}
                            />
                          </Link>
                        </div>
                      </div>

                      <div className="bloginfo">
                        <Link href={`/tag/${blog.tags[0]}`}>
                          <div className="blogtag">{blog.tags[0]}</div>
                        </Link>
                        <Link href={`/blog/${blog.slug}`}>
                          <h3 className="blog-title">
                            {blog.title.length > 50
                              ? blog.title.substring(0, 50) + "..."
                              : blog.title}
                          </h3>
                        </Link>
                        <p
                          className="blog-description"
                          dangerouslySetInnerHTML={{
                            __html:
                              blog.description.length > 100
                                ? blog.description.substring(0, 100) + "..."
                                : blog.description.toLowerCase(),
                          }}
                        ></p>

                        <div className="blogauthor flex gap-1">
                          <div className="blogaimg">
                            <Image
                              src={AuthorI}
                              alt="Author Ashish Sharma"
                              width={50}
                              height={50}
                              style={{
                                objectFit: "cover",
                                borderRadius: "50%",
                              }}
                            />
                          </div>
                          <div className="flex flex-col flex-left gap-05">
                            <h4>Ashish Sharma</h4>
                            <span>
                              {new Date(blog.createAt).toLocaleDateString(
                                "en-Us",
                                {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </>
              )}
            </div>
          </div>
          <nav className="blogpagination" aria-label="Pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              Previous
            </button>
            {pageNumbers
              .slice(
                Math.max(currentPage - 3, 0),
                Math.min(currentPage + 2, pageNumbers.length)
              )
              .map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={currentPage === number ? "active" : ""}
                  aria-label={`Page ${number}`}
                  aria-current={currentPage === number ? "page" : undefined}
                >
                  {number}
                </button>
              ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentBlogs.length < perPage}
              aria-label="Next page"
            >
              Next
            </button>
          </nav>
        </section>
      </main>
    </>
  );
}
