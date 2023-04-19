"use client";
import Link from "next/link";
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
}
// this will be a showcase page eventually
export default function Page() {
    // const section2Ref = useRef(null);

    // const { scrollYProgress } = useScroll({
    //     target: section2Ref,
    // });

    // const y = useParallax(scrollYProgress, 300);

    return (
        <main>
            <div className="relative h-[70vh] min-h-[400px] p-3">
                <div className="w-1/2 absolute transform -translate-y-1/2 top-1/2 p-3 -skew-x-6 flex flex-col items-center">
                    {["", "right-[16%]", "right-[8%]"].map((el, i) => (
                        <motion.div
                            initial={{ x: "-50vw" }}
                            // animate on page load
                            animate={{ x: 0 }}
                            transition={{ delay: 0.2 * i }}
                            key={i}
                            className={
                                "relative duration-100 -hover:translate-x-3 " +
                                el
                            }
                        >
                            <Image
                                alt="Recipe Card"
                                src={`/assets/images/card-${i + 1}.svg`}
                                width={180}
                                height={100}
                                className={
                                    "object-contain absolute top-2 left-0 blur-xl opacity-80 "
                                }
                            />
                            <Image
                                alt="Recipe Card"
                                src={`/assets/images/card-${i + 1}.svg`}
                                width={180}
                                height={100}
                                className={
                                    "object-contain mb-6 sm:visible invisible "
                                }
                            />
                        </motion.div>
                    ))}
                </div>
                <div className=" absolute left-1/2 top-1/2 transform -translate-y-1/2 sm:translate-x-0 -translate-x-1/2">
                    <div className=" flex flex-col sm:items-end items-start gap-3">
                        <h1 className="text-6xl font-black text-white">
                            <span className="text-bg-gradient-4">AI</span>{" "}
                            Prompts <br /> Made Easy
                        </h1>
                        <Link
                            href={"/gallery"}
                            className=" w-fit flex-row flex items-center"
                        >
                            Launch App <ChevronRightIcon className="w-7" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="relative flex items-center flex-col mt-10 p-3">
                <motion.div className=" absolute -left-1/3 -top-1/4 blur-md w-full h-[200%]">
                    <Image src={"/assets/images/glow-1.png"} fill alt="glow" />
                </motion.div>
                <div className=" relative text-4xl font-black text-white mt-20 text-center">
                    <h1>
                        Use pre-made{" "}
                        <span className=" text-bg-gradient-2">Recipes</span>
                    </h1>
                    <p className=" text-base font-medium mt-2">
                        {
                            "Recipes offer fields that you fill out to create prompts like a form!"
                        }
                    </p>
                </div>
                <div className=" reative p-2 mt-20 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, filter: "blur(20px)" }}
                        whileInView={{
                            opacity: 1,
                            filter: "blur(0px)",
                        }}
                        transition={{ delay: 0.2 }}
                        className=" relative flex flex-col gap-10 items-center"
                    >
                        {[
                            { text: "Write an essay about...", offset: "-20%" },
                            {
                                text: "Design a marketing campaign for...",
                                offset: "20%",
                            },
                            {
                                text: "Reply to this email responsibly...",
                                offset: "-20%",
                            },
                        ].map((el, i) => (
                            <div
                                key={i}
                                className=" text-center relative w-fit bg-white bg-opacity-20 text-white text-opacity-60 sm:px-10 px-4 py-1 rounded-lg sm:text-lg text-sm font-bold"
                                style={{
                                    transform: `translateX(${el.offset})`,
                                }}
                            >
                                {el.text}
                            </div>
                        ))}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            // make a delay
                            transition={{ delay: 0.5 }}
                            className="sm:visible
                             w-full h-full top-0"
                        >
                            <div
                                className="absolute w-36 h-6 bg-white bg-opacity-20 rounded-lg"
                                style={{
                                    right: -10,
                                    top: -50,
                                }}
                            />
                            <div
                                className="absolute w-36 h-6 bg-white bg-opacity-20 rounded-lg"
                                style={{
                                    left: -110,
                                    top: "40%",
                                }}
                            />
                            <div
                                className="absolute w-36 h-6 bg-white bg-opacity-20 rounded-lg"
                                style={{
                                    right: 10,
                                    bottom: -10,
                                }}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <div className="relative flex items-center mt-20 flex-col p-3">
                <div className=" absolute -left-1/3 -top-1/4 blur-md w-full h-[200%] -z-10">
                    <Image src={"/assets/images/glow-2.png"} fill alt="glow" />
                </div>
                <div className="relative text-4xl font-black text-white">
                    <h1>
                        Or <span className=" text-bg-gradient-3">Create</span>{" "}
                        your own
                    </h1>
                </div>
                <div className="relative p-2 mt-20 flex flex-row sm:gap-20 gap-5">
                    <motion.div
                        // animate floating effect
                        initial={{ y: 0 }}
                        animate={{ y: -10 }}
                        transition={{
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 1,
                        }}
                    >
                        <Image
                            src={"/assets/images/inputs-left.svg"}
                            width={200}
                            height={200}
                            alt="ui elements"
                        />
                    </motion.div>
                    <motion.div
                        // animate floating effect
                        initial={{ y: 0 }}
                        animate={{ y: -10 }}
                        transition={{
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 1,
                            delay: 0.2,
                        }}
                        className="relative"
                    >
                        <Image
                            src={"/assets/images/inputs-right.svg"}
                            width={200}
                            height={200}
                            alt="ui elements"
                        />
                        <motion.div
                            initial={{ x: 0, y: 0 }}
                            whileInView={{
                                x: [250, 0, 0, 0],
                                y: [100, 0, 0, 0],
                                scale: [1, 1, 0.8, 1],
                            }}
                            transition={{
                                duration: 1,
                                delay: 0.7,
                                // smoothest
                                ease: "easeInOut",
                            }}
                            className="absolute bottom-1 left-20"
                        >
                            <Image
                                src={"/assets/images/cursor.svg"}
                                width={60}
                                height={60}
                                alt="ui elements"
                            />
                        </motion.div>
                    </motion.div>
                </div>
                <p className="text-center mt-5">
                    Generate outputs with Chat-GPT and GPT-3! <br />
                    Access Stable Diffusion and GPT-4 via beta invite. <br />
                    Bard coming soon.
                </p>
            </div>

            <div className="relative flex items-center flex-col min-h-[400px] mt-20">
                <h1 className="text-4xl font-black text-white text-center max-w-md leading-relaxed">
                    Start making AI prompts{" "}
                    <span className="text-bg-gradient-4">for free</span>.
                </h1>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 500 }}
                >
                    <Link
                        href={"/gallery"}
                        className=" w-64 border-4 border-black border-opacity-20 flex-row justify-center flex items-center mt-10 bg-white text-black py-2 rounded-xl text-lg font-bold"
                    >
                        Launch App
                    </Link>
                </motion.button>

                {/* pricing */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    // very bounce
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <Link
                        href={"/purchase"}
                        className=" w-64 flex-row flex items-center mt-5 bg-white bg-opacity-20 justify-center text-white py-3 rounded-xl text-lg font-bold"
                    >
                        Generator Pricing
                    </Link>
                </motion.button>
            </div>
        </main>
    );
}
