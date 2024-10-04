import { IoSearchSharp } from "react-icons/io5";
import Link from "next/link";
import { FaMoon } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { HiBarsArrowDown } from "react-icons/hi2";
import { FaXmark } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { LuSun } from "react-icons/lu";
import useFetchData from "@/hooks/useFetchData";
import Logo from "@/public/Logo.png";
import Image from "next/image";


export default function Header() {
  //search bar open and close funciton 
  const [searchopen, setSearchopen] = useState(false);

  //for open search bar
  const openSearch = () => {
    setSearchopen(!searchopen);
  }
  //for close search bar
  const closeSearch = () => {
    setSearchopen(false);
  }

  // aside side for mobible device
  const [aside, setAside] = useState(false);
  const asideOpen = () => {
    setAside(true);
  }
  const asideClose = () => {
    setAside(false);
  }
  //for close aside menu when click on link also
  const handleLinkClick = () => {
    setAside(false);
  }

  //Dark mode on off
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    //check local storage for darkmode preference on initial laod
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
  }, [])
  useEffect(() => {
    //apply dark mode styles when darkmode state changes
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('darkMode', true);
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('darkMode', false);
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode); //toggle dark mode status

  }

  //search data fetch 
  const { alldata, loading } = useFetchData('/api/getblog');

  //filtering publish blogs
  const publishedblogs = alldata.filter(ab => ab.status === "publish");
  const [searchQuery, setsearchQuery] = useState('');

  //filtering based on search query, search data from title
  const filteredBlogs = searchQuery.trim() === '' ?
  publishedblogs : publishedblogs.filter(blog => blog.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return <>
    <div className="header_sec">
      <div className="container header">
        <div className="logo">
          <Link href={"/"}><Image src={Logo} alt="logo"/></Link>
        </div>
        <div className="searchbar">
          <IoSearchSharp />
          <input type="search"
            value={searchQuery}
            onChange={(e) => setsearchQuery(e.target.value)} 
            onClick={openSearch} placeholder="Discover news, articles and more" />
        </div>
        <div className="nav_list_dark">
          <ul>
            <li><Link href={"/"}>Home</Link></li>
            <li><Link href={"/blog"}>Blog's</Link></li>
            <li><Link href={"/aboutus"}>About Me</Link></li>
            <li><Link href={"/contact"}>Contact</Link></li>
          </ul>
          {/* for mobile device */}
          <div className="navlist_mobile_ul">
            <button onClick={toggleDarkMode}>{darkMode ? <FaMoon /> : <LuSun />}</button>
            <button onClick={openSearch}><IoSearch /></button>
            <button onClick={asideOpen}><HiBarsArrowDown /></button>
          </div>
          <div className="darkmode">
            <label className="switch">
              <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
              <span className="slider_header" ></span>
            </label>
          </div>
        </div>
      </div>
      <div className={`search_click ${searchopen ? 'open' : ''}`}>
        <div className="searchhab_input ">
          <IoSearchSharp />
          <input type="search"
            value={searchQuery}
            onChange={(e) => setsearchQuery(e.target.value)}
            placeholder="Discover news, articles and more" />
        </div>
        <div className="search_data text-center">
          {loading ? <div className="wh_100 flex flex-center mt-2 pb-5">
            <div className="loader"></div>

          </div> : <>
            {searchQuery ? <>
              {filteredBlogs.slice(0, 3).map((blog) => {
                return <div className="blog" key={blog._id}>
                  <div className="bloginfo">
                    <Link href={`/blog/${blog.slug}`}>
                      <h3>{blog.slug}</h3></Link>
                    <p>In publishing and graphic design, Lorem ipsum is a placeholder
                      text commonly used to demonstrate the visual form of a document
                      or a typeface without relying on meaningful</p>
                  </div>

                </div>
              })}
            </> : <div>No Search Result</div>}
          </>}
        </div>
        <div className="exit_search" onClick={closeSearch}>
          <FaXmark />
          <h4>ESC</h4>
        </div>
      </div>
      {/* mobile navlist */}
      <div className={aside ? `navlist_mobile open` : 'navlist_mobile'}>
        <div className="navlist_m_title flex flex-sb">
          <h1>Tech Blog Service</h1>
          <button onClick={asideClose}><FaXmark /></button>
        </div>
        <hr />
        <h3 className="mt-3" onClick={handleLinkClick}>Main Manu</h3>
        <ul>
          <li><Link href={"/"}>Home</Link></li>
          <li><Link href={"/"}>About Me</Link></li>
          <li><Link href={"/"}>Contact</Link></li>
        </ul>
        <hr />
        <h3 className="mt-3" onClick={handleLinkClick}>Topics</h3>
        <ul>
          <li><Link href={"/topics/htmlcssjs"}>Html Css Java</Link></li>
          <li><Link href={"/topics/database"}>Database</Link></li>
          <li><Link href={"/topics/nextjs"}>Next js</Link></li>
          <li><Link href={"/topics/Deployment"}>Html Css Java</Link></li>
        </ul>
      </div>

    </div>
  </>
}