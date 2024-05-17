import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { navList, testList } from '../Constants/constants'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import "./home.css";


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';

function Home(props) {
    const navigate = useNavigate();
    // gsap.registerPlugin(useGSAP);

    useGSAP(() => {
        gsap.from('.swipOne', {
            x: -90,
            opacity: 0,
            duration: 1,
            delay: 0.2
        });
        gsap.from('.slideDown', {
            y: -90,
            opacity: 0,
            duration: 1,
            delay: 0.2
        });
        gsap.from('.slideUp', {
            y: 90,
            opacity: 0,
            duration: 1,
            delay: 0.2
        });

        gsap.from('.popUp', {
            scale:0,
            opacity: 0,
            duration: 1,
            delay: 0.2
        });
    }
    );
    return (
        <section>
            <div className=' width90  m-auto'>
                <h1 className=' py-5 text-5xl font-extrabold w-3/4 m-auto text-center popUp'>Enlighten
                    your thinking with a host of topics on which Rajashri meticulously presents her views
                    and opinions.</h1>
                <div className=' mb-10 grid sliderBox gap-2 bg-white rounded-lg p-5'>
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        id='swiperOne'
                        className="mySwiper swipOne"
                    >
                        {
                            testList?.map((val) => {
                                return (
                                    <Link to={`https://i.pinimg.com/564x/26/b3/0b/26b30b7baf1204e6f093fda17819e5d6.jpg`}>
                                        <div className=' relative h-fit'>
                                            <SwiperSlide className='  '>
                                                <Link target='_blank' to={`https://i.pinimg.com/564x/26/b3/0b/26b30b7baf1204e6f093fda17819e5d6.jpg`}>

                                                    <img className=' w-full h-full object-cover' src={val?.img} alt="" />
                                                    <h1 className=' px-3 blurBack text-left absolute z-30 bottom-3 left-0 font-semibold text-2xl py-4 text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi debitis molestiae beatae quae possimus pariatur, id hic nulla iusto repudiandae.</h1>

                                                </Link>
                                            </SwiperSlide>

                                        </div>
                                    </Link>
                                )
                            })
                        }

                    </Swiper>
                    <div className=' grid grid-cols-1 gap-2'>
                        <Swiper
                            spaceBetween={30}
                            centeredSlides={true}
                            autoplay={{
                                delay: 2800,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Autoplay, Pagination, Navigation]}
                            className="mySwiper swipTwo slideDown"
                        >
                            {
                                testList?.map((val) => {
                                    return (
                                        <div className=' relative h-fit'>
                                            <SwiperSlide className='  '>
                                                <Link target='_blank' to={`https://i.pinimg.com/564x/26/b3/0b/26b30b7baf1204e6f093fda17819e5d6.jpg`}>

                                                    <img className=' object-top' src={val?.img} alt="" />
                                                    <h1 className=' px-3 blurBack text-left absolute z-30 bottom-3 left-0 font-semibold text-lg text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>

                                                </Link>
                                            </SwiperSlide>
                                        </div>
                                    )
                                })
                            }

                        </Swiper>
                        <Swiper
                            spaceBetween={30}
                            centeredSlides={true}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Autoplay, Pagination, Navigation]}
                            className="mySwiper swipTwo slideUp"
                        >
                            {
                                testList?.map((val) => {
                                    return (
                                        <div className=' relative h-fit'>
                                            <SwiperSlide className='  '>
                                                <Link target='_blank' to={`https://i.pinimg.com/564x/26/b3/0b/26b30b7baf1204e6f093fda17819e5d6.jpg`}>

                                                    <img className=' object-top' src={val?.img} alt="" />
                                                    <h1 className=' px-3 blurBack text-left absolute z-30 bottom-3 left-0 font-semibold text-lg text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>

                                                </Link>
                                            </SwiperSlide>
                                        </div>
                                    )
                                })
                            }

                        </Swiper>
                    </div>
                </div>
                <section className=' mb-10 flex flex-col items-center justify-center gap-10'>
                    <div className=''>
                        <div>
                            <nav className=' flex items-end justify-between babyBlueBorderBottom mb-3 text-lg '>
                                <h1 className=' whitespace-nowrap w-fit font-semibold bg-blue-600 text-white py-0.5 px-1 mr-10 '>
                                    Don't Miss
                                </h1>
                                <ul className=' flex  w-full   text-lg font-semibold   '>
                                    <Link className=' flex items-center nav'>
                                        <li className=' whitespace-nowrap  hoverBlack py-0.5 px-4 rounded-lg'>All </li>
                                    </Link>
                                    {
                                        navList?.map((val, idx) => {
                                            return (
                                                <>
                                                    {idx <= 6 ?
                                                        <Link className=' flex items-center nav'>
                                                            <li className=' whitespace-nowrap  hoverBlack py-0.5 px-4 rounded-lg'>{val?.name} </li>
                                                        </Link> : null}
                                                </>
                                            )
                                        })
                                    }
                                </ul>
                            </nav>
                            <div className=' grid grid-cols-2 gap-4'>
                                <div className=' bg-white rounded-lg p-4'>
                                    <div className=' h-80 w-full'>
                                        <img className=' w-full h-full object-cover' src={testList[0].img} alt="" />
                                    </div>
                                    <div>
                                        <h1 className=' text-xl font-bold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, nobis?</h1>
                                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio iure, laborum temporibus quod natus quas tempora, dignissimos dolorum deserunt dicta facere illum aliquid. Reiciendis laboriosam consectetur quis quam facilis laborum.</p>
                                    </div>
                                </div>
                                <div className=' flex flex-col gap-2 height30 overflow-y-scroll'>
                                    {

                                        testList?.map((val) => {
                                            return (
                                                <div className=' flex flex-row gap-2 bg-white rounded-lg p-2 '>
                                                    <div className=' w-28 h-24'>
                                                        <img className=' w-full h-full object-cover' src={val?.img} alt="" />
                                                    </div>
                                                    <p className=' text-lg font-bold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, dolore?</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        {/* <div>
                            <div className=' blackBorderBottom'>
                                <h1 className=' whitespace-nowrap w-fit font-semibold bg-black text-white py-0.5 px-1 mr-10 '>
                                    Stay Connected
                                </h1>
                            </div>
                        </div> */}
                    </div>
                    <div>
                        <nav className=' flex items-end justify-between greenBorderBottom  mb-3 text-lg '>
                            <h1 className=' whitespace-nowrap w-fit font-semibold bg-green-600 text-white py-0.5 px-3 mr-10 '>
                                Latest
                            </h1>
                        </nav>
                        <div className=' grid grid-cols-4'>
                            {
                                testList?.map((val) => {
                                    return (
                                        <div className=' bg-white rounded-lg p-4'>
                                            <div className=' h-72 w-full'>
                                                <img className=' w-full h-full object-cover' src={val.img} alt="" />
                                            </div>
                                            <div>
                                                <h1 className=' text-xl font-bold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, nobis?</h1>
                                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio iure, laborum temporibus quod natus quas tempora, dignissimos dolorum deserunt dicta facere illum aliquid. Reiciendis laboriosam consectetur quis quam facilis laborum.</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <nav className=' flex items-end justify-between babyBlueBorderBottom mb-3 text-lg '>
                            <h1 className=' whitespace-nowrap w-fit font-semibold bg-blue-600 text-white py-0.5 px-1 mr-10 '>

                                Buidling Relations
                            </h1>
                        </nav>
                        <div className=' grid grid-cols-4'>
                            {
                                testList?.map((val) => {
                                    return (
                                        <div className=' bg-white rounded-lg p-4'>
                                            <div className=' h-72 w-full'>
                                                <img className=' w-full h-full object-cover' src={val.img} alt="" />
                                            </div>
                                            <div>
                                                <h1 className=' text-xl font-bold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, nobis?</h1>
                                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio iure, laborum temporibus quod natus quas tempora, dignissimos dolorum deserunt dicta facere illum aliquid. Reiciendis laboriosam consectetur quis quam facilis laborum.</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </section>
    );
}

export default Home;