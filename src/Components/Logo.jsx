import React from "react";
import { Link } from "react-router-dom";
import { FaBitcoin } from "react-icons/fa";

const Logo = () => {
  return (
    <Link to="/"
      className="absolute top-6 left-6 mx-auto transform [text-decoration:none] text-lg text-cyan flex items-center gap-x-2"
    >
      <FaBitcoin size={70} className="lg:h-[55px] lg:w-[55px] w-[38px] h-[38px]" />
      <span>CryptoBucks</span>
    </Link>
  )
}

export default Logo