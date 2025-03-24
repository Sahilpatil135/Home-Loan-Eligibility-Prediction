"use client";

import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation';
import { HiArrowLongRight } from "react-icons/hi2";

const Hero = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/predict');
  };

  return (
    <div className="relative h-screen w-full max-w-[1888px] bg-cover bg-center bg-no-repeat flex justify-center items-center" style={{ backgroundImage: "url('/bg_hero.png')" }}>
      <div className="hero-content text-center w-150">
        {/* <h4 className="text-2xl text-[#939DB8] ">LOGO</h4> */}
        <div className="flex justify-center">
          <Image src="/Logo_1.png" alt="..." width={250} height={0} priority className="justify-center" />
        </div>
        <h1 className="text-7xl font-semibold text-white mt-6">Predict. Qualify. Own Home.</h1>
        <h3 className="text-xl text-[#939DB8] mt-8">AI-powered home loan eligibility prediction for smarter, faster financial decisions.</h3>
        <button onClick={handleClick} className="flex items-center mx-auto gap-2 px-8 py-3 mt-10 font-semibold text-white bg-[#113551] rounded-2xl shadow-lg cursor-pointer hover:bg-[#0c1c2c] transition-all duration-300">
          <div>
            Check Eligibilty Now
          </div>
          <HiArrowLongRight size={30} />
        </button>
      </div>
    </div>
  )
}

export default Hero