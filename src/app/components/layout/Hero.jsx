'use client';
import Image from 'next/image';
import rest_img from '../../../../public/rest_img.jpg';
import Right from '../icons/Right';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-4xl font-semibold text-light">
            Everything <br />
            is better
            <br /> with a&nbsp;
            <span className="text-primary"> good meal</span>
          </h1>
          <p className="my-6 text-gray-500 text-sm">
            Crafted with our finest recipes, passed down from generations past
          </p>
          <div className="flex gap-4 text-sm">
            <button className="flex justify-center bg-primary uppercase items-center gap-2 text-light px-4 py-2 rounded-full">
              Order now
              <Right />
            </button>
            <button className="flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold">
              Learn more
              <Right />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 place-self-center mt-4 lg:mt-0"
        >
          <div className="rounded-full bg-dark dark:bg-light w-[250px] h-[200px] lg:w-[400px] lg:h-[280px] relative">
            <Image
              src={rest_img}
              alt="img"
              width={500}
              height={500}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default Hero;
