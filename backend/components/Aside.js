import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { BsPostcard } from "react-icons/bs";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePending } from "react-icons/md";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";



export default function Aside() {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const handleClicked = () => {
    setClicked(!clicked)
  }
  const handleLinkClicked = (link) => {
    setActiveLink(link);
    setClicked(false);

  }
  useEffect(() => {
    // update active link state  when page is reload
    setActiveLink(router.pathname);
  }, [router.pathname])
  return <>
    <aside className="asideleft">
      <ul>
        <Link href="/">
          <li className={activeLink === '/' ? 'navactive' : ''}
            onClick={() => handleLinkClicked('/')}>
            <FaHome />
            <span>Deshbord</span>
          </li>
        </Link>
        <Link href="/blogs">
          <li className={activeLink === '/blogs' ? 'navactive' : ''}
            onClick={() => handleLinkClicked('/blogs')}>
            <BsPostcard />
            <span>Blogs</span>
          </li>
        </Link>
        <Link href="/blogs/addblog">
          <li className={activeLink === '/blogs/addblog' ? 'navactive' : ''}
            onClick={() => handleLinkClicked('/blogs/addblog')}>
            <MdOutlineAddPhotoAlternate />
            <span>Add Blog</span>
          </li>
        </Link>
        <Link href="/draft">
          <li className={activeLink === '/draft' ? 'navactive' : ''}
            onClick={() => handleLinkClicked('/draft')}>
            <MdOutlinePending />
            <span>Pending</span>
          </li>
        </Link>
        <Link href="/setting">
          <li className={activeLink === '/setting' ? 'navactive' : ''}
            onClick={() => handleLinkClicked('/setting')}>
            <IoSettingsOutline />
            <span>Settings</span>
          </li>
        </Link>
      </ul>
    </aside>
  </>
}