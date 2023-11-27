import React from 'react';
import { Outlet } from 'react-router-dom';
import Logo from "../Components/Logo";
import Navigation from "../Components/Navigation";
import { CryptoProvider } from './../Context/CryptoContext';
import { TrendingProvider } from '../Context/TrendingContext';
import { SavedProvider } from '../Context/SavedContext';

const Home = () => {
  return (
    // this is how you use multiple provider
    <CryptoProvider>
    <TrendingProvider>
    <SavedProvider>
      <main 
        className="w-full h-full flex flex-col items-center first-letter:content-center relative text-white font-tertiary pb-20 md:pb-4"
      >
        <div className="lg:w-screen lg:h-screen w-full h-full bg-gray-300 fixed -z-10" />
        <Logo />
        <Navigation />
        
        <Outlet />
      </main>
    </SavedProvider>
    </TrendingProvider>
    </CryptoProvider>
  )
};

export default Home;