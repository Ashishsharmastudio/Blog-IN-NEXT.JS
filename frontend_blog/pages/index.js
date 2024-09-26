import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
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
  const { alldata, loading, error } = useFetchData("/api/getblog");

  const publishedBlogs = useMemo(() => {
    return alldata.filter((blog) => blog.status === "publish");
  }, [alldata]);

  const totalBlogs = publishedBlogs.length;
  const totalPages = Math.ceil(totalBlogs / perPage);

  const currentBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * perPage;
    return publishedBlogs.slice(startIndex, startIndex + perPage);
  }, [publishedBlogs, currentPage, perPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(Math.min(Math.max(1, pageNumber), totalPages));
  };

  useEffect(() => {
    if (!loading && alldata.length > 0) {
    }
  }, [
    currentPage,
    perPage,
    totalPages,
    currentBlogs,
    loading,
    alldata,
    publishedBlogs,
  ]);

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
    if (!loading && publishedBlogs.length > 0) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Your Tech Review Blog",
        url: "https://yourdomain.com",
        body: "In-depth reviews of the latest tech products and gadgets",
        blogPost: publishedBlogs.map((blog) => ({
          "@type": "BlogPosting",
          headline: blog.title,
          datePublished: blog.createAt,
          author: {
            "@type": "Person",
            name: "Ashish Sharma",
          },
          image: blog.mainImage || NoImg,
          url: `https://yourdomain.com/blog/${blog.slug}`,
        })),
      });
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [loading, publishedBlogs]);

  if (error) {
    return <div>Error loading blog posts. Please try again later.</div>;
  }

  return (
    <>
      <Head>
        <title>Tech Product Reviews | Your Website Name</title>
        <meta
          name="body"
          content="Discover in-depth reviews of the latest tech products, gadgets, and innovations. Stay informed with our expert analysis and comparisons."
        />
        <meta
          property="og:title"
          content="Tech Product Reviews | Your Website Name"
        />
        <meta
          property="og:body"
          content="Discover in-depth reviews of the latest tech products, gadgets, and innovations."
        />
        <meta property="og:image" content="/path-to-og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://yourdomain.com" />
      </Head>

      <main>
        <section
          className="full-width-slider"
          aria-label="Featured posts slider"
        >
          <Slider {...sliderSettings}>
            <div>
              <Image
                src={MenImage}
                alt="Featured tech product 1"
                width={1920}
                height={1080}
                priority
              />
            </div>
            <div>
              <Image
                src={secondimg}
                alt="Featured tech product 2"
                width={1920}
                height={1080}
              />
            </div>
            <div>
              <Image
                src={Author2}
                alt="Featured tech product 3"
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
              ) : currentBlogs.length > 0 ? (
                currentBlogs.map((blog, index) => (
                  <article className="blog" key={blog._id}>
                    <div className="blogs">
                      <div className="blogimg">
                        <Link href={`/blog/${blog.slug}`}>
                          <Image
                            src={blog.mainImage || NoImg}
                            alt={`Featured image for ${blog.title}`}
                            width={300}
                            height={200}
                            style={{ objectFit: "cover" }}
                            priority={index === 0}
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
                      <p className="blog-description">
                        {blog.description.length > 50
                          ? blog.description.substring(0, 50) + "..."
                          : blog.description}
                      </p>

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
                            {new Date(blog.createdAt).toLocaleDateString(
                              "en-US",
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
                ))
              ) : (
                <p>No published blogs available.</p>
              )}
            </div>
          </div>
          {!loading && currentBlogs.length > 0 && (
            <nav className="blogpagination" aria-label="Pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                Previous
              </button>
              {[...Array(totalPages).keys()].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => paginate(number + 1)}
                  className={currentPage === number + 1 ? "active" : ""}
                  aria-label={`Page ${number + 1}`}
                  aria-current={currentPage === number + 1 ? "page" : undefined}
                >
                  {number + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                Next
              </button>
            </nav>
          )}
        </section>
      </main>
    </>
  );
}
