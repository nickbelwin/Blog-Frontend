import React, { useEffect } from 'react';
import "./header.css";
import { Link, Outlet } from 'react-router-dom';
import { navList } from '../Constants/constants';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Header(props) {

    gsap.registerPlugin(useGSAP);
    useGSAP(() => {

        gsap.from('.nav', {
            y: -40,
            opacity: 0,
            duration: 0.2,
            delay: 0.1,
            stagger: 0.1
        });

        gsap.from('.navOne', {
            x: -80,
            opacity: 0,
            duration: 0.5,
            delay: 1,
        });

        gsap.from('.logo', {
            x: -400,
            opacity: 0,
            duration: 1,
            delay: 0.5,
        });
        gsap.from('.logoName', {
            x: 400,
            opacity: 0,
            duration: 1,
            delay: 0.5,
        });
      
    }
    );
    const isSticky = (e) => {
        const header = document.getElementById('header');
        const scrollTop = window.scrollY;
        scrollTop >= 72 ? header?.classList.add('sticky') : header?.classList.remove('sticky');
        
    };
    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });
    return (
        <>
            <section className=' mb-5'>
                <header className=' px-10 py-0 bg-black text-white flex items-center justify-between'>
                    <div className='flex items-center gap-3 font-semibold navOne'>
                        <nav className=' hoverWhite py-0.5 px-1 rounded-lg '>About Us</nav>
                        <nav className='  hoverWhite py-0.5 px-1 rounded-lg '>Contact</nav>
                    </div>
                    <div className=' flex items-center gap-3'>
                        <div className='  flex items-center gap-1 hoverWhite py-0.5 px-1 rounded-lg '>
                            <img className=' w-6 navOne' src="/img/linkedin-png.png" alt="linkedin icon" />
                            <h4 className=' text-sm font-semibold navOne'>LinkedIn</h4>
                        </div>
                        <div className='  flex items-center gap-1 py-0.5 px-1 rounded-lg navOne'>
                            <h1 className=' text-3xl font-bold'>12</h1>
                            <div className=' text-xs font-semibold'>
                                <h4 className=' h-3'>May</h4>
                                <h4>2024</h4>
                            </div>
                        </div>
                    </div>
                </header>
                <header className=' width90 m-auto grayBorderBottom' >
                    <div className=' m-auto py-4 w-fit flex items-center gap-2'>
                        <img className=' logo w-16' src="/img/logo.webp" alt="" />
                        <div className=' logoName'>
                            <div className=' text-3xl font-extrabold '>
                                <h1 className=' h-6 '>POSH &</h1>
                                <h1 className=' '>GENDER</h1>
                            </div>
                            <p className=' text-xxs font-semibold'>UNITE FOR EQUALITY AND JUSTICE</p>
                        </div>
                    </div>
                </header>
                <header id="header" className=' width90 m-auto grayBorderBottom'>
                    <nav className=' w-fit m-auto py-2 px-10'>
                        <ul className=' flex flex-wrap justify-center text-sm font-semibold items-center'>
                            {
                                navList?.map((val, idx) => {
                                    return (
                                        <Link className=' flex items-center nav'>
                                            <li className=' whitespace-nowrap  hoverBlack py-0.5 px-1 rounded-lg'>{val?.name} </li>
                                            <span className=' px-1 text-blue-600'>{navList?.length - 1 != idx ? "|" : null}</span>
                                        </Link>
                                    )
                                })
                            }
                        </ul>
                    </nav>
                </header>
            </section>
            <Outlet />
        </>

    );
}

export default Header;