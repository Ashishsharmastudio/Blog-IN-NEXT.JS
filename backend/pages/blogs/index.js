 import Dataloading from "@/components/Dataloading";
import Loading from "@/components/Loading";
import useFetchData from "@/hooks/useFetchData";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsPostcard } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";




export default function blogs() {
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  // you can change how much blog you want on every page
  const [perPage] = useState(6);


  // fetch blogs form api endpoint with hooks
  const { alldata, loading } = useFetchData('/api/blogapi');

  // function to handle page change
  const paginate = (pageNumbers) => {
    setCurrentPage(pageNumbers)
  }
  // const indexOfLastblog = currentPage * perPage;
  // const indexOfFirstblog = indexOfLastblog - perPage;
  // const currentBlogs = alldata.slice(indexOfFirstblog, indexOfLastblog);

  // search function
  const [searchQuery, setSearchQuery] = useState('')
  const filteredBlog = searchQuery.trim() === '' ? alldata : 
  alldata.filter(blog=>blog.title.toLowerCase().includes(searchQuery.toLocaleLowerCase()));
  const indexOfFirstblog = (currentPage - 1) * perPage;
  const indexOfLastblog = currentPage * perPage;

  const currentBlogs = filteredBlog.slice(indexOfFirstblog, indexOfLastblog);

  //filtering Publish  blogs
  const publishedBlog = currentBlogs.filter(ab => ab.status === 'publish');

  const allblog = alldata.length;

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i)
  }
  

  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    // check if there's no active session and redirect to login page
    if (!session) {
      router.push('/login')
    }
  }, [session, router]);

  if (status === "loading") {
    // loading State, loader or any other loader indicator
    return <div className="loadingdata flex flex-col flex-center wh_100">
      <Loading />
      <h1>Loading ....</h1>

    </div>
  }
  if (session) {
    return <>
      <div className="blogpage">
        {/*dashboard title  */}
        <div className="titledashboard flex flex-sb">
          <div data-aos="fade-right">
            <h2>All Published <span>Blogs</span></h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb" data-aos="fade-left">
            <BsPostcard /> <span>/</span> <span>Deshboard</span>
          </div>
        </div>
        <div className="blogstable" >
          <div className="flex gap-2 mb-1" data-aos="fade-up">
            <h2>Search Blogs:</h2>
            <input type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="search the title...." />
          </div>

          <table className="table table-styling" data-aos="fade-up">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Slug</th>
                <th>Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ?
                <>
                  <tr>
                    <td>
                      <Dataloading />
                    </td>
                  </tr>
                </> : <>
                  {publishedBlog.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center">No Publish Blogs</td>
                    </tr>
                  ) : (
                    publishedBlog.map((blog, index) => (
                      <tr key={blog._id}>
                        <td>{indexOfFirstblog + index + 1}</td>
                        <td>{blog.title}</td>
                        <td><pre>{blog.slug}</pre></td>
                        <td>
                          <div className="flex gap-2 flex-center">
                            <Link href={'/blogs/edit/' + blog._id}>
                              <button title="edit"><FaEdit /></button>
                            </Link>
                            <Link href={'/blogs/delete/' + blog._id}>
                              <button title="delete"><MdOutlineDelete />
                              </button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))

                  )}

                </>}
            </tbody>
          </table>
          {publishedBlog.length === 0 ? (
            ''
          ) : (
            <div className="blogpagination">
              <button onClick={() => paginate(currentPage - 1)} disbled={currentPage === 1}>Previous</button>
              {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(number => (
                <button key={number} onClick={() => paginate(number)} className={`${currentPage === number ? 'active' : ''}`}>{number}</button>
              ))}
              <button onClick={() => paginate(currentPage + 1)} disbled={currentBlogs.length === 1}>Next</button>
            </div>
          )}
        </div>
      </div>
    </>
  }


}