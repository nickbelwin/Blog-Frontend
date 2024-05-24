import React from 'react';
import "./footer.css";

function Footer(props) {
    return (
        <footer>
            <footer className=' bg-gray-100 grid footerOne p-10 mt-20'>
                <div className=' flex flex-col gap-4'>
                    <img className=' w-52' src="/img/footer-logo.webp" alt="" />
                    <p className=' text-gray-500 '>Rajashri Rajashekhar is a multifaceted individual. As a dedicated philanthropist, prolific author and a seasoned POSH, HR & Business consultant, she brings a plethora of knowledge to empower organizations and individuals alike, fostering positive change and inclusive workplaces.</p>
                </div>
                <div className=' grid footerOneChild'>
                    <div>
                        <h1 className=' font-extrabold text-lg mb-4'>Explore Services</h1>
                        <ul className=' flex flex-col gap-1'>
                            <li>⚤ Poornam Foundation</li>
                            <li>⚤ POSH Compliance</li>
                            <li>⚤ Talent Co HR</li>
                            <li>⚤ Slikun Institute</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className=' font-extrabold text-lg mb-4'>Quick Explore</h1>
                        <ul className=' flex flex-col gap-1'>
                            <li>⚤ POSH Consulting</li>
                            <li>⚤ Women Leadership</li>
                            <li>⚤ Diversity Inclusion</li>
                            <li>⚤ Gender Neutrality</li>
                            <li>⚤ ASK Workshops</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className=' font-extrabold text-lg mb-4'>Connect With Rajashri</h1>
                        <ul className=' flex flex-col gap-1'>
                            <li><span>Phone: </span>+91 98200 12052</li>
                            <li><span>Email: </span>rajashekhar.rajashri@gmail.com</li>
                        </ul>
                        <h1 className=' font-extrabold text-lg mt-4 mb-2'>Rajashri's Linkedin</h1>
                        <div className='  flex items-center gap-1 hoverWhite py-0.5 px-1 rounded-lg w-fit linkedin'>
                            <img className=' w-6 navOne' src="/img/linkedin-png.png" alt="linkedin icon" />
                            <h4 className=' text-lg font-semibold navOne'>LinkedIn</h4>
                        </div>
                    </div>
                </div>
            </footer>
            <footer className=' relative py-4 bg-black text-white text-center'>
                <button className=' bg-gray-400 px-3 py-2 absolute right-2 top-2'> <img className=' w-4' src="img/upArrow.png" alt="" /> </button>
                <h3 className='copyright text-pink-500 font-semibold'>Copyright © 2024 Rajashri Rajashekhar - Powered by ENSO </h3>
            </footer>
        </footer>
    );
}

export default Footer;