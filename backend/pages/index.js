import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { IoHome } from "react-icons/io5";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineController } from 'chart.js';
import { Bar } from "react-chartjs-2";
import Loading from "@/components/Loading";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // State to hold blog data
  const [blogData, setBlogsData] = useState([]);

  // Register Chart.js components
  ChartJS.register(CategoryScale, LineController, LinearScale, BarElement, Title, Tooltip, Legend);

  // Define options within the component scope
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Blogs Created Monthly By Year'
      }
    }
  };

  useEffect(() => {
    if (!session && status !== "loading") {
      router.push('/login');
    } else if (session) {
      const fetchData = async () => {
        try {
          const response = await fetch('/api/blogapi');
          const data = await response.json();
          setBlogsData(data); // assuming data is an array of blog objects
        } catch (error) {
          console.error('Error fetching data', error);
        }
      };
      fetchData();
    }
  }, [session, status, router]);

  // Aggregate data by year and month
  const monthlyData = blogData.filter(dat => dat.status === "publish").reduce((acc, blog) => {
    const year = new Date(blog.createdAt).getFullYear();
    const month = new Date(blog.createdAt).getMonth();
    acc[year] = acc[year] || Array(12).fill(0);
    acc[year][month]++;
    return acc;
  }, {});

  const currentYear = new Date().getFullYear();
  const years = Object.keys(monthlyData);
  const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const datasets = years.map(year => ({
    label: `${year}`,
    data: monthlyData[year] || Array(12).fill(0),
    backgroundColor: `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},0.5)`
  }));
  const data = {
    labels,
    datasets
  };

  if (status === "loading") {
    return (
      <div className="loadingdata flex flex-col flex-center wh_100">
        <Loading />
        <h1>Loading ....</h1>
      </div>
    );
  }

  if (session) {
    return (
      <>
        <Head>
          <title>Admin Dashboard</title>
          <meta name="description" content="Admin dashboard create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="dashboard">
          <div className="titledashboard flex flex-sb" data-aos="fade-right">
            <h2>Blogs <span>Dashboard</span></h2>
            <h3>ADMIN PANEL</h3>
            <div className="breadcrumb" data-aos="fade-left">
              <IoHome /> <span>/</span> <span>Dashboard</span>
            </div>
          </div>
          <div className="topfourcards flex flex-sb">
            <div className="four_card" data-aos="fade-right">
              <h2>Total Blogs</h2>
              <span>{blogData.filter(ab => ab.status === 'publish').length}</span>
            </div>
            <div className="four_card" data-aos="fade-right">
              <h2>Total Topics</h2>
              <span>2</span>
            </div>
            <div className="four_card" data-aos="fade-left">
              <h2>Total Tags</h2>
              <span>4</span>
            </div>
            <div className="four_card" data-aos="fade-left">
              <h2>Draft Blogs</h2>
              <span>{blogData.filter(ab => ab.status === 'draft').length}</span>
            </div>
          </div>
          <div className="year_overview flex flex-sb">
            <div className="leftyearoverview" data-aos="fade-up">
              <div className="flex flex-sb">
                <h3>Year Overview</h3>
                <ul className="creative-dots">
                  <li className="big-dot"></li>
                  <li className="semi-big-dot"></li>
                  <li className="medium-dot"></li>
                  <li className="semi-medium-dot"></li>
                  <li className="semi-small-dot"></li>
                  <li className="small-dot"></li>
                </ul>
                <h3 className="text-right">10 / 365 <br /><span>Total Published</span></h3>
              </div>
              <Bar data={data} options={options} />
            </div>
            <div className="right_salescont" data-aos="fade-up">
              <div>
                <h3>Blogs by Category</h3>
                <ul className="creative-dots">
                  <li className="big-dot"></li>
                  <li className="semi-big-dot"></li>
                  <li className="medium-dot"></li>
                  <li className="semi-medium-dot"></li>
                  <li className="semi-small-dot"></li>
                  <li className="small-dot"></li>
                </ul>
              </div>
              <div className="blogscategory flex flex-center">
                <table>
                  <thead>
                    <tr>
                      <td>Topics</td>
                      <td>Data</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Html, Css & Javascript</td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td>Next.js, React.js</td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td>Database</td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td>Deployment</td>
                      <td>10</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
}
