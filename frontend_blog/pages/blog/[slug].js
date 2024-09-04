import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Author from "../../public/ashish.jpg";

export default function BlogPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      // console.log("Fetching blog data for slug:", slug);
      axios
        .get(`/api/getblog?slug=${slug}`)
        .then((res) => {
          // console.log("API response:", res.data[0]);
          setBlog(res.data[0]);
          setLoading(false);
        })
        .catch((error) => {
          // console.error("Error fetching blog:", error);
          setLoading(false);
        });
    }
  }, [slug]);

  return (
    <div className="slugpage">
      {blog && blog.mainImage && (
        <Image
          src={blog.mainImage}
          className="image-container"
          width={800}
          height={600}
          alt="mainImage"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/path/to/fallback/image.jpg";
          }}
        />
      )}
      <div className="article-box">
        <div className="article">
          {loading ? (
            <div className="wh_100 flex flex-center mt-3">
              <div className="loader"></div>
            </div>
          ) : blog ? (
            <>
              {/* {console.log("Blog main image:", blog.mainImage)}
              {console.log("Blog description:", blog.description)}
              {console.log("Full blog object:", blog)} */}
              <div className="topslug_titles">
                <h1 className="slugtitle">{blog.title}</h1>
                <h5>
                  {/* By <span>Ashish Sharma</span>. Published in{" "} */}
                  <div className="author-container">
                    <Image
                      className="author-image"
                      src={Author}
                      alt="authorImg"
                    />
                    <p className="author-text">
                      Blog post by{" "}
                      <span className="author-name">Ashish Sharma</span> -
                      Published at{" "}
                      {/* {new Date(post.publishedAt).toLocaleDateString()} */}
                      </p>
                      
                  </div>
                  <span className="category">{blog.blogcategory}</span>
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
                </h5>
              </div>
              <div className="flex flex-sb flex-left pb-5 flex-wrap">
                <div className="leftblog_data_markdown">
                  <div className="w-100 blogcontent">
                    <div
                      dangerouslySetInnerHTML={{ __html: blog.description }}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>Blog post not found</div>
          )}
        </div>
      </div>
    </div>
  );
}
