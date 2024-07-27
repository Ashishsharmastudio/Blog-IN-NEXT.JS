import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import NoImg from '@/public/no image.jpg';
import Image from "next/image";
import axios from "axios";
import Link from "next/link";


export default function CategoryPage() {

    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); //page number
    const [perPage] = useState(5); //five blog per page
    const [blog, setBlog] = useState([]);
    const router = useRouter();

    const { category } = router.query;

    useEffect(() => {
        //function to fatch blog data 
        const fetchBlogdata = async () => {
            try {
                const res = await axios.get(`/api/getblog?blogcategory=${category}`);
                const alldata = res.data;
                setBlog(alldata);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blog data', error);
                setLoading(false);
            }
        }



        //fetch blog data only if category exists
        if (category) {
            fetchBlogdata();

        } else {
            router.push('/404')
        }
    }, [category])



    //function to handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    const indexOfLastblog = currentPage * perPage;
    const indexOfFirstblog = indexOfLastblog - perPage;
    const currentBlogs = blog.slice(indexOfFirstblog, indexOfLastblog);

    const allblog = blog.length;
    const pageNumbers = [];

    for (let i = 1; i < Math.ceil(allblog / perPage); i++) {
        pageNumbers.push(i);
    }
    //filter publish blogs
    const publishedblogs = blog.filter(ab => ab.status === 'publish');


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

    return <>
        <div className="blogpage">
            <div className="category_slug">
                <div className="container">
                    <div className="category_title">
                        <div className="flex gap-1">
                            <h1>{loading ? <div>Loading...</div>:publishedblogs ? 
                            publishedblogs && publishedblogs[0]?.blogcategory:
                            publishedblogs&& publishedblogs.blogcategory}</h1>
                            <span>{loading ? <div>0</div>:publishedblogs.filter(blog=>blog.blogcategory).length}</span>
                        </div>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                    </div>
                    <div className="category_blogs mt-3">
                        {loading ? <>
                            <div className="wh-100 flex flex-center mt-2 pb-5">
                                <div className="loader">

                                </div>
                            </div>
                        </> : <>
                            {publishedblogs.map((item) => {
                                //in the markdown content first image show here 

                                const firstImageUrl = extractFirstImageUrl(item.description);
                                return <div className="cate_blog" key={item._id}>

                                    {/* if not image in markdown show on image  */}
                                    <Link href={`/blog/${item.slug}`}>
                                        <Image src={firstImageUrl || NoImg} alt={blog.title} />
                                    </Link>

                                    <div className="bloginfo mt-2">
                                        <Link href={`/tag/${item.tags[0]}`}>
                                            <div className="blogtag">{blog.tags[0]}</div>
                                        </Link>
                                        <Link href={`/blog/${item.slug}`}><h3>{blog.title}</h3></Link>
                                        <p>This project integrates MongoDB with a Next.js application using Mongoose.
                                            It demonstrates how to establish a database connection, define a model,
                                            and create API routes to handle different HTTP requests.
                                        </p>
                                        <div className="blogauthor flex gap-1 ">
                                            <div className="blogaimg">
                                                <img src="/public/Author.jpg" alt="author" />
                                            </div>
                                            <div className="flex flex-col flex-left gap-05">
                                                <h4>Divyanshu Saini</h4>
                                                <span>{new Date(item.createAt).toLocaleDateString('en-Us', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </>}
                        {/* pagination code  */}
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

                </div>
            </div>
        </div>
    </>
}