import Blog from "@/components/Blog";
import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditBlog() {
    const [searchQuery, setSearchQuery] = useState('')
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
    //blog edit
    const {id} = router.query;
    const [productInfo, setProductInfo] = useState(null);
    useEffect(()=>{
        if(!id){
            return;
        }else{
            axios.get('/api/blogapi?id='+id).then(response=>{
                setProductInfo(response.data)
            })
        }

    },[id])
    if (session) {
        return <>
            <Head>
                <title>Update Blog</title>
            </Head>
            <div className="blogpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>Edit<span>Blogs</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb">
                        <BsPostcard /> <span>/</span> <span>Edit Blog</span>
                    </div>
                </div>
                <div className="mt-3">
                    {
                        productInfo && (
                            <Blog {...productInfo}/>
                        )
                    }
                </div>
            </div>
        </>
    }
    return <>

    </>
}