import React from 'react'

import { FaRegUserCircle } from "react-icons/fa";


import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";


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
  return (
    <nav className="navbar top-0 left-0 right-0 z-50 bg-[#0B0C14]/80 border[#727DA1]/15- fixed flex justify-center">
      <div className="navbar-content flex justify-between w-300">
        <div className="flex p-6 items-center">
          <h1 className="cursor-pointer text-2xl font-bold px-4 text-[#FAF9F6] hover:text-[#aad6ec] transition-colors duration-300">LogoName</h1>
          <div className="flex gap-6 pl-8">
            <h2 className="cursor-pointer text-[#FAF9F6] hover:text-[#aad6ec] transition-colors duration-300">Home Loan Eligibilty Prediction</h2>
            <h2 className="cursor-pointer text-[#FAF9F6] hover:text-[#aad6ec] transition-colors duration-300">EMI Calculator</h2>
          </div>
        </div>
        <SignedOut>
          <div className="flex items-center gap-2">
            <FaRegUserCircle className="text-2xl text-white" />

            <div className="bg-white w-19 text-black px-4 py-2 rounded-md hover:bg-gray-200 transition duration-300">
              <SignInButton />
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

