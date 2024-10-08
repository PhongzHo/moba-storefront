"use client"
import React from 'react';
import { BarsThree } from "@medusajs/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useState } from 'react'
import { motion } from "framer-motion"

interface DropdownMenuProps {
    items: { name: string; handle: string; id: string }[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ items }) => {
    const [isOpen, setOpen] = useState(false)
    const toggle = () => {
        setOpen(!isOpen)
    } 
    const showMenu = {
        enter: {
            opacity: 1,
            y: 0,
            display: "block",
        },
        exit: {
            y: 0,
            opacity: 0,
            transition: {
                duration: 0.3,
            },
            transitionEnd: {
                display: "none",
            },
        },
    };

    return (
        <>
            <motion.div
                onClick={() => toggle()}
                onHoverStart={() => {setOpen(true)}}
                onHoverEnd={() => {setOpen(false)}}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                }}
                whileHover={{ backgroundColor: "#3133331f" }}
                className='absolute mt-1 inline-block text-left p-2 rounded-lg'
            >
                <motion.button
                    id="dropdown-button"
                    className="flex flex-1 relative gap-2 items-center rounded-full text-moba-black z-[100]"
                >
                    <BarsThree />
                    <span>Danh Mục</span>
                </motion.button>
                {items.map((item) => (
                    <motion.ul
                        key={item.id}
                        variants={showMenu}
                        initial="exit"
                        animate={isOpen ? "enter" : "exit"}
                        className="absolute left-0 bg-white mt-6 border rounded-xl p-2 justify-center"
                    >
                        {items.map((item) => (
                            <LocalizedClientLink href={`/categories/${item.handle}`}
                                key={item.id}
                            >
                                <motion.li
                                    whileHover={{
                                        textDecorationLine: "underline",
                                        color: "#CA2A58",
                                        x: 2,
                                    }}
                                    key={item.id}
                                    className="cursor-pointer px-4 py-2 text-blue-primary w-48"
                                >
                                    {item.name}
                                </motion.li>
                            </LocalizedClientLink>
                        ))}
                    </motion.ul>
                ))}
            </motion.div >
        </>
    );
};

export default DropdownMenu;

// <div className="relative inline-block text-left transition-opacity duration-300">
//                 {/* Nút Menu */}
//                 <Button
//                     id="dropdown-button"
//                     onClick={toggleDropdown}
//                     size='large'
//                     variant='transparent'
//                     className="flex items-center rounded-full text-black"
//                 >
//                     <BarsThree />
//                     <span>Danh Mục</span>
//                 </Button>

//                 {/* Menu Dropdown */}
//                 <div
//                     id="dropdown-menu"
//                     className="absolute right-0 m-2 w-48 origin-top-right bg-white border transition-opacity duration-300 border-gray-200 rounded-lg shadow-lg hidden" // Sử dụng lớp hidden để ẩn menu
//                 >
//                     <ul className="py-1 transition-opacity duration-300">
//                         {items.map((item) => (
//                             <li key={item.handle} className="hover:bg-moba-green m-2 rounded-md">
//                                 <LocalizedClientLink
//                                     href={`/categories/${item.handle}`}
//                                     className="block px-4 py-2 text-gray-700 hover:text-moba-black"
//                                 >
//                                     {item.name}
//                                 </LocalizedClientLink>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>