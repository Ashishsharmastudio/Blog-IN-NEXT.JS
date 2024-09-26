import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Head from 'next/head';
import Link from 'next/link';
import Author from "../../public/ashish.jpg";
import DOMPurify from 'dompurify';

export default function BlogPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      axios
        .get(`/api/getblog?slug=${slug}`)
        .then((res) => {
          console.log("Full response data:", res.data);
          if (res.data && res.data.length > 0) {
            setBlog(res.data[0]);
          } else {
            console.log("No blog data found for this slug");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching blog post:", error);
          setLoading(false);
        });
    }
  }, [slug]);

  useEffect(() => {
    if (blog) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blog.title,
        "description": blog.description,
        "image": blog.mainImage,
        "datePublished": blog.createdAt,
        "author": {
          "@type": "Person",
          "name": "Ashish Sharma"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Your Website Name",
          "logo": {
            "@type": "ImageObject",
            "url": "https://yourdomain.com/logo.png"
          }
        }
      });
      document.head.appendChild(script);
      return () => document.head.removeChild(script);
    }
  }, [blog]);

  const sanitizeHtml = (html) => {
    const clean = DOMPurify.sanitize(html);
    const parser = new DOMParser();
    const doc = parser.parseFromString(clean, 'text/html');
    const images = doc.getElementsByTagName('img');
    
    for (let img of images) {
      if (img.src) {
        img.src = img.src.replace(/^http:\/\/localhost:\d+/, '');
      }
    }
    
    return doc.body.innerHTML;
  };

  return (
    <>
      {blog && (
        <Head>
          <title>{blog.title} | Your Website Name</title>
          <meta name="description" content={blog.description.substring(0, 160)} />
          <meta name="body" content={blog.body.substring(0, 160)} />
          <meta property="og:title" content={blog.title} />
          <meta property="og:body" content={blog.body.substring(0, 160)} />
          <meta property="og:image" content={blog.mainImage} />
          <meta property="og:url" content={`https://yourdomain.com/blog/${slug}`} />
          <meta property="og:type" content="article" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={blog.title} />
          <meta name="twitter:body" content={blog.body.substring(0, 160)} />
          <meta name="twitter:image" content={blog.mainImage} />
          <link rel="canonical" href={`https://yourdomain.com/blog/${slug}`} />
        </Head>
      )}

      <div className="slugpage">
        <article className="article-box">
          {blog && blog.mainImage && (
            <Image
            src={blog.mainImage}
            className="image-container"
            width={800}
            height={600}
            alt={`Featured image for ${blog.title}`}
            priority
            crossOrigin="anonymous"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/path/to/fallback/image.jpg";
            }}
          />
          )}
          {loading ? (
            <div className="wh_100 flex flex-center mt-3">
              <div className="loader"></div>
            </div>
          ) : blog ? (
            <>
              <header className="topslug_titles">
                <h1 className="slugtitle">{blog.title}</h1>
                <h3 className="descriptions">{blog.description}</h3>
                <div className="author-container">
                  <Image
                    className="author-image"
                    src={Author}
                    alt="Ashish Sharma"
                    width={50}
                    height={50}
                  />
                  <p className="author-text">
                    Blog post by{" "}
                    <span className="author-name">Ashish Sharma</span> -
                    Published in <span className="category">{blog.blogcategory}</span>
                    {blog.createdAt && (
                      <span>
                        {" "}
                        on{" "}
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    )}
                    <span>. 1 min read </span>
                  </p>
                </div>
              </header>

              <section className="flex flex-sb flex-left pb-5 flex-wrap">
                <div className="leftblog_data_markdown">
                  <div 
                    className="w-100 blogcontent"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(blog.body) }}
                    style={{ 
                      '& img': {
                        maxWidth: '100%',
                        height: 'auto'
                      }
                    }}
                  />
                </div>
              </section>
            </>
          ) : (
            <div>Blog post not found</div>
          )}
        </article>
      </div>
    </>
  );
}
