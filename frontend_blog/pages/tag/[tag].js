import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import NoImg from "@/public/noimage.jpg";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import AuthorI from "@/public/ashish.jpg";

export default function TagPage() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);
  const [blog, setBlog] = useState([]);
  const router = useRouter();

  const { tag } = router.query;

  useEffect(() => {
    const fetchBlogData = async () => {
      if (tag) {
        try {
          const res = await axios.get(`/api/getblog?tags=${tag}`);
          const alldata = res.data;
          setBlog(alldata);
          setLoading(false);
          console.log("all data is", alldata);
        } catch (error) {
          console.error("Error fetching blog data", error);
          setLoading(false);
        }
      } else if (router.isReady) {
        router.push("/404");
      }
    };

    fetchBlogData();
  }, [tag, router]);

  const publishedBlogs = useMemo(() => {
    return blog.filter(
      (ab) => ab.status === "publish" && ab.tags.includes(tag)
    );
  }, [blog, tag]);

  const totalBlogs = publishedBlogs.length;
  const totalPages = Math.ceil(totalBlogs / perPage);

  const currentBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * perPage;
    return publishedBlogs.slice(startIndex, startIndex + perPage);
  }, [publishedBlogs, currentPage, perPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(Math.min(Math.max(1, pageNumber), totalPages));
  };

  function extractFirstImageUrl(markdownContent) {
    if (!markdownContent || typeof markdownContent !== "string") {
      return null;
    }

    const regex = /!\[.*?\]\((.*?)\)/;
    const match = markdownContent.match(regex);
    return match ? match[1] : null;
  }

  return (
    <div className="blogpage">
      <div className="category_slug">
        <div className="container">
          <div className="category_title">
            <div className="flex gap-1">
              <h1>
                {loading ? (
                  <div>Loading...</div>
                ) : publishedBlogs.length > 0 ? (
                  publishedBlogs[0]?.blogcategory
                ) : (
                  tag
                )}
              </h1>
              <span>{loading ? <div>0</div> : publishedBlogs.length}</span>
            </div>
            <p>
              Discover insightful articles tagged with "{tag}". Our curated content offers valuable information and latest trends to enhance your understanding of this topic.
            </p>
          </div>
          <div className="blogs_sec mt-3">
            {loading ? (
              <div className="wh-100 flex flex-center mt-2 pb-5">
                <div className="loader"></div>
              </div>
            ) : (
              currentBlogs.map((item) => (
                <article className="blog" key={item._id}>
                  <div className="blogs">
                    <div className="blogimg">
                      <Link href={`/blog/${item.slug}`}>
                        <Image
                          src={item.mainImage || NoImg}
                          alt={`Featured image for ${item.title}`}
                          width={300}
                          height={200}
                          layout="responsive"
                        />
                      </Link>
                    </div>
                  </div>

                  <div className="bloginfo mt-2">
                    <Link href={`/tag/${item.tags?.[0] ?? ""}`}>
                      <div className="blogtag">
                        {item.tags?.[0] ?? "No Tag"}
                      </div>
                    </Link>
                    <Link href={`/blog/${item.slug}`}>
                      <h3>
                        {item.title.length > 50
                          ? item.title.substring(0, 50) + "..."
                          : item.title}
                      </h3>
                    </Link>
                    <p className="blog-descriptions">
                      {item.title.length > 50
                        ? item.title.substring(0, 50) + "..."
                        : item.title}
                    </p>
                    <div className="blogauthor flex gap-1 ">
                      <div className="blogaimg">
                        <Image src={AuthorI} alt="author" />
                      </div>
                      <div className="flex flex-col flex-left gap-05">
                        <h4>Ashish Sharma</h4>
                        <span>
                          {new Date(item.createdAt).toLocaleDateString(
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
            )}
          </div>
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
    </div>
  );
}
