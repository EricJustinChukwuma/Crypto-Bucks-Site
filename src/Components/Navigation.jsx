import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="lg:w-[40%] w-[90%] lg:mt-16 mt-24 lg:mb-0 -mb-4 flex justify-around align-middle border border-cyan rounded-lg">
        <NavLink 
            to="/"
            end
            className={
                ({isActive}) => {
                    return `w-full text-base text-center font-tertiary m-2.5 px-2 py-1
                    ${isActive ? 'bg-cyan fill-cyan text-gray-100' : 'bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300'} 
                    border-0 cursor-pointer rounded capitalize font-semibold transition-all ease-linear`
                }
            }
        >
            Crypto
        </NavLink>

        <NavLink 
            to="/trending"
            end
            className={
                ({isActive}) => {
                    return `w-full text-base text-center font-tertiary m-2.5 px-2 py-1  
                    ${isActive ? 'bg-cyan fill-cyan text-gray-100' : 'bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300'} 
                    border-0 cursor-pointer rounded capitalize font-semibold transition-all ease-linear`
                }
            }
        >
            Trending
        </NavLink>
        
        <NavLink 
            to="/saved"
            end
            className={
                ({isActive}) => {
                    return `w-full text-base text-center font-tertiary m-2.5 px-2 py-1  
                    ${isActive ? 'bg-cyan fill-cyan text-gray-100' : 'bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300'} 
                    border-0 cursor-pointer rounded capitalize font-semibold transition-all ease-linear`
                }
            }
        >
            Saved
        </NavLink>
    </nav>
  )
};

export default Navigation;