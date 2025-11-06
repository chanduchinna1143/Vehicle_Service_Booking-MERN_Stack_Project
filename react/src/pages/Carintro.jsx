import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const carImageUrl =
  "/car2.png";

const CarIntro = ({ onComplete }) => {
  const controls = useAnimation();

  useEffect(() => {
    const runAnimation = async () => {
      await controls.start({
        x: "110vw",
        transition: { duration: 2, ease: "easeInOut" },
      });
      await new Promise((r) => setTimeout(r, 500));
      onComplete();
    };
    runAnimation();
  }, [controls, onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 overflow-hidden z-[9999]">
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-gray-700 to-gray-900 border-t-4 border-gray-600"></div>

      <motion.div
        className="relative flex flex-col items-center"
        animate={controls}
        initial={{ x: "-20vw" }}
        style={{ zIndex: 10 }}
      >
        <img
          src={carImageUrl}
          alt="Realistic Car"
          className="w-60 md:w-96 drop-shadow-lg "
        />
      </motion.div>

      <motion.h1
        className="absolute bottom-48 text-3xl md:text-4xl font-extrabold text-yellow-400 tracking-wide"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Honda Vehicle Booking Service
      </motion.h1>
    </div>
  );
};

export default CarIntro;
