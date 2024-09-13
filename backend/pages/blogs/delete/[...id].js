import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { BsPostcard } from "react-icons/bs";
import Loading from "@/components/Loading";

export default function DeleteBlog() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { id } = router.query;
    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if (!session && status !== "loading") {
            router.push('/login')
        }
    }, [session, status, router]);

    useEffect(() => {
        if (id) {
            axios.get('/api/blogapi?id=' + id)
                .then(response => {
                    setProductInfo(response.data)
                })
                .catch(error => {
                    console.error('Error fetching blog data:', error)
                });
        }
    }, [id]);

    if (status === "loading") {
        return <div className="loadingdata flex flex-col flex-center wh_100">
            <Loading />
            <h1>Loading ....</h1>
        </div>
    }

    function goback() {
        router.push('/')
    }

    async function deleteOneblog() {
        try {
            await axios.delete('/api/blogapi?id=' + id);
            goback();
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    }

    if (!session) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Head>
                <title>Delete Blog</title>
            </Head>
            <div className="blogpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>Delete <span>{productInfo?.title}</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb">
                        <BsPostcard /> <span>/</span> <span>Delete Blog</span>
                    </div>
                </div>
                <div className="deletesec flex flex-center wh_100">
                    <div className="deletecard">
                        <MdDelete />
                        <p className="cookieHeading">Are you sure?</p>
                        <p className="cookieDescription">If you delete this blog content it will be permanently deleted.</p>
                        <div className="buttonContainer">
                            <button onClick={deleteOneblog} className="acceptButton">Delete</button>
                            <button onClick={goback} className="declineButton">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    return {
        props: {},
    }
}
