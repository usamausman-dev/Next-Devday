import React from 'react'
import { useState } from 'react';
import Link from 'next/link';
import { MdArrowBackIosNew } from 'react-icons/md'
import { HiUser } from 'react-icons/hi'
import { useSession, signIn, signOut } from 'next-auth/react'

const Sidebar = () => {

    const [open, setOpen] = useState(false);

    // const Menus = [
    //     { title: "Organizations", link: '/dashboard', icon: 'fa-solid fa-building' },
    //     { title: "Projects", link: '/project', icon: 'fa-solid fa-briefcase' },
    // ]

    return (
        <div className={`${open ? "w-72" : "w-20"} duration-300 h-screen p-5 pt-8 bg-orange-500 relative`}>

            <MdArrowBackIosNew color='#f97316' size={27} onClick={() => setOpen(!open)} className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 p-1.5 bg-white  ${!open && "rotate-180"}`} />
            <div className='flex items-center text-white'>
                <div className='flex justify-center items-center'>
                    <HiUser size={25} color='white' />
                    {open && <span className='text-md ml-2'>UserName</span>}
                </div>
            </div>

            <ul className='pt-6'>
                {/* {Menus.map((menu, index) => {
                    return (
                        <Link href={menu.link} key={index}>
                            <li
                                key={index}
                                className={`group text-slate-50 text-sm flex items-center gap-x-4 cursor-pointer  p-2 hover:bg-light-white rounded-md  ${menu.title === 'Logout' ? 'fixed bottom-5' : ''}`}>
                                <i className={menu.icon}></i>
                                <span
                                    style={{ transitionDelay: `${index + 1}00ms` }}
                                    className={`${!open && 'opacity-0 translate-x-28 overflow-hidden'} whitespace-pre origin-left duration-500 hover:text-[#72c179] hover:font-semibold`}>
                                    {menu.title}
                                </span>

                                <span
                                    className={`${open && "hidden"} absolute left-48 bg-white font-semibold text-sm whitespace-pre text-orange-500 rounded-md overflow-hidden drop-shadow-lg px-0 py-0 w-0 group-hover:p-2  group-hover:left-24 group-hover:duration-300 group-hover:w-fit`}>
                                    {menu.title}
                                </span>
                            </li>
                        </Link>
                    )
                })} */}


                <li onClick={() => signOut({ callbackUrl: '/login' })} className="group text-slate-50 text-sm flex items-center gap-x-4 cursor-pointer  p-2 hover:bg-light-white rounded-md fixed bottom-5">
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <span
                        className={`${!open && 'opacity-0 translate-x-28 overflow-hidden'} whitespace-pre origin-left duration-500 hover:text-[#72c179] hover:font-semibold`}>
                        Logout
                    </span>

                    <span
                        className={`${open && "hidden"} absolute left-48 bg-white font-semibold text-sm whitespace-pre text-orange-500 rounded-md overflow-hidden drop-shadow-lg px-0 py-0 w-0 group-hover:p-2  group-hover:left-24 group-hover:duration-300 group-hover:w-fit`}>
                        Logout
                    </span>
                </li>
            </ul>
        </div>
    )
}
export default Sidebar