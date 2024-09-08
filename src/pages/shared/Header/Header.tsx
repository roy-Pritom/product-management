import  { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BadgePlus,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, Button } from "@nextui-org/react";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/features/auth/authSlice";
import { toast } from "sonner";

const Header = () => {
  // get user from decoded token
  const user=useAppSelector((state:RootState)=>state.auth.user);
  const dispatch=useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  // console.log(user);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // logout set token null
  const handleLogout = () => {
    const toastId = toast.loading('processing...')
    try {
      dispatch(logout())
      toast.success("logout successfully", { id: toastId, duration: 1000 })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
      console.log(error?.message);
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navITem = <>
    {
      user ?
        <div className="flex items-center gap-4">
          <Button onClick={handleLogout} variant="ghost"  color="primary" className="">Logout</Button>
          <Link to='/user-profile'>
            <Avatar />
          </Link>
        </div>
        :
        <>
          <Link to={"/login"}>
            <Button >Login</Button>
          </Link>
        </>
    }
  </>

  return (
    <header
      className={`  ${scrolling
        ? "bg-white dark:bg-slate-800 fixed w-full z-40"
        : "fixed w-full z-40 bg-white"
        }`}
    >
      <div className="container mx-auto py-3 flex justify-between items-center md:px-8 px-2">
        <div className="hidden md:block">
          <div className="flex items-center gap-6 ">
            <Link to='/'>
            <div className="flex items-center gap-2">
              
            <img src="https://cdn-icons-png.flaticon.com/128/9956/9956878.png" className="w-7 h-7" alt="" />
          <h1 className="text-lg font-bold text-slate-800 hover:text-blue-500">ECom</h1>
            </div>
            </Link>
            <Link to='/products' className="text-lg text-slate-800 hover:text-blue-500">
              Products
            </Link>
            <Link to='/create-product' className="flex justify-center items-center gap-1 hover:text-blue-500">
            <BadgePlus className="w-5 h-5"/>
              <h1 className="text-lg text-slate-800 hover:text-blue-500">Add Product</h1>
            </Link>
            <Link to='/about'>
              <h1 className="text-lg text-slate-800 hover:text-blue-500">About Us</h1>
            </Link>
          </div>
        </div>
        <div>
        </div>
        <div className="hidden md:flex items-center ">
        
          <div className="">
            {navITem}
          </div>
        </div>
        <div className="flex items-center gap-2 md:hidden ">
              
            <img src="https://cdn-icons-png.flaticon.com/128/9956/9956878.png" className="w-7 h-7" alt="" />
          <h1 className="text-lg font-bold text-slate-800 hover:text-blue-500">ECom</h1>
            </div>
        <button className="md:hidden text-slate-800" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        className="overflow-hidden md:hidden"
      >
        <div className="flex flex-col items-center bg-white dark:bg-slate-800 gap-5">
        <Link to='/products' className="text-lg text-slate-800 hover:text-blue-500">
              Products
            </Link>
            <Link to='/create-product' className="flex justify-center items-center gap-1 hover:text-blue-500">
            <BadgePlus className="w-5 h-5"/>
              <h1 className="text-lg text-slate-800 hover:text-blue-500">Add Product</h1>
            </Link>
            <Link to='/about'>
              <h1 className="text-lg text-slate-800 hover:text-blue-500">About Us</h1>
            </Link>
          {navITem}

        </div>
        
      </motion.div>
    </header>
  );
};

export default Header;
