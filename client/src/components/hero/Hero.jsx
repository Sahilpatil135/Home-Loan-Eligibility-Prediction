"use client";

import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation';
import { HiArrowLongRight } from "react-icons/hi2";
import { motion } from 'framer-motion';

const Hero = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/predict');
  };

   // Animation Variants
   const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 1, 
        type: "spring", 
        stiffness: 80 
      } 
    },
  };

  return (
    <div className="relative h-screen w-full max-w-[1888px] bg-cover bg-center bg-no-repeat flex justify-center items-center" style={{ backgroundImage: "url('/bg_hero.png')" }}>
      <div className="hero-content text-center w-150">
        {/* <h4 className="text-2xl text-[#939DB8] ">LOGO</h4> */}
        <div className="flex justify-center">
          <Image src="/mainlogo.png" alt="..." width={200} height={0} className="justify-center" />
        </div>
        
         {/* Animated Text Elements */}
         <motion.h1 
          className="text-7xl font-semibold text-white mt-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          Predict. Qualify. Own Home.
        </motion.h1>

        <motion.h3 
          className="text-xl text-[#939DB8] mt-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          AI-powered home loan eligibility prediction for smarter, faster financial decisions.
        </motion.h3>

        <motion.button 
          onClick={handleClick}
          className="flex items-center mx-auto gap-2 px-8 py-3 mt-10 font-semibold text-white bg-[#113551] rounded-2xl shadow-lg cursor-pointer hover:bg-[#0c1c2c] transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div>
            Check Eligibility Now
          </div>
          <HiArrowLongRight size={30} />
        </motion.button>
      </div>
    </div>
  )
}

export default Hero