"use client";

import React from 'react'
import { useRouter } from 'next/navigation';
import { FaRegUserCircle } from "react-icons/fa";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

import Image from 'next/image';

const DotIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
    >
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  );
};


const navbar = () => {
  const router = useRouter();

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <nav className="navbar top-0 left-0 right-0 z-50 bg-[#0B0C14]/80 border[#727DA1]/15- fixed flex justify-center">
      <div className="navbar-content flex justify-between w-300">
        <div className="flex p-6 items-center">
          {/* <h1 onClick={() => handleNavigate('/')} className="cursor-pointer text-2xl font-bold px-4 text-[#FAF9F6] hover:text-[#aad6ec] transition-colors duration-300">LoGO</h1> */}
          <Image src="/navlogo.png" alt='...' width={180} height={0} layout="intrinsic" onClick={() => handleNavigate('/')} className="cursor-pointer text-2xl font-bold px-2 pt-1 text-[#FAF9F6] hover:text-[#aad6ec] transition-colors duration-300" />
          <div className="flex gap-6 pl-6">
            <h2 onClick={() => handleNavigate('/predict')} className="cursor-pointer text-[#FAF9F6] hover:text-[#aad6ec] transition-colors duration-300">Home Loan Eligibilty Predictor</h2>
            <h2 onClick={() => handleNavigate('/emi-calculator')} className="cursor-pointer text-[#FAF9F6] hover:text-[#aad6ec] transition-colors duration-300">EMI Calculator</h2>
          </div>
        </div>
        <SignedOut>
          <div className="flex items-center gap-6">
            <FaRegUserCircle className="text-2xl text-white" />

            <div className="bg-[#113551] w-21 text-white font-semibold px-4 py-2 rounded-md cursor-pointer hover:bg-[#0c1c2c] transition duration-300">
              <SignInButton className="cursor-pointer" />
            </div>
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              baseTheme: "light",
              elements: {
                userButtonPopoverActionButton: "hover:bg-red-500",
              },
            }}
          />
        </SignedIn>
      </div>

    </nav >
  )
}

export default navbar

