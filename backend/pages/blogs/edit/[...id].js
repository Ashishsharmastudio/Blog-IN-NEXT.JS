import Blog from "@/components/Blog";
import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { BsPostcard } from "react-icons/bs";

export default function EditBlog() {
    const { data: session, status } = useSession();
    const router = useRouter();


    useEffect(() => {
        if (!session) {
            router.push('/login')
        }
        // status,
    }, [session, router]);



    if (status === "loading") {
        return <div className="loadingdata flex flex-col flex-center wh_100">
            <Loading />
            <h1>Loading ....</h1>
        </div>
    }

    //blog edit
    const { id } = router.query;
    
    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        } else {
            console.log('Fetching blog data for id:', id);
            axios.get('/api/blogapi?id=' + id).then(response => {
                const specificBlog = response.data.find(blog => blog._id === id[0]);
                setProductInfo(specificBlog);
                console.log('Received blog data:', specificBlog);
            })
        }
    }, [id])
    
    
    


    if (session) {
        return (
            <>
                <Head>
                    <title>Update Blog</title>
                </Head>
                <div className="blogpage">
                    <div className="titledashboard flex flex-sb">
                        <div>
                            <h2>Edit <span>Blog</span></h2>
                            <h3>ADMIN PANEL</h3>
                        </div>
                        <div className="breadcrumb">
                            <BsPostcard /> <span>/</span> <span>Edit Blog</span>
                        </div>
                    </div>
                    <div className="mt-3">
                        {productInfo && (
                            <Blog {...productInfo} />
                        )}
                    </div>
                </div>
            </>
        );
    }
    


}