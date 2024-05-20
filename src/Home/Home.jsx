import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { basePath, navList, testList } from '../Constants/constants'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import "./home.css";


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import axios from "axios";
import parse from 'html-react-parser';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


function Home(props) {
    const navigate = useNavigate();
    const [allBlogs, setAllBlogs] = useState([]);
    const box1 = useRef(null);
    const box2 = useRef(null);
    const box3 = useRef(null);
    const slideleft = useRef(null);
    const getBlogdata = async () => {
        let res = await axios(`${basePath}/getBlogs`);
        console.log(res.data.data);
        setAllBlogs(res.data.data);
    }
    useEffect(() => {
        getBlogdata();
    }, []);

    gsap.registerPlugin(useGSAP);
    gsap.registerPlugin(ScrollTrigger);

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

        gsap.from('.pop', {
            scale: 0,
            opacity: 0,
            duration: 1,
            delay: 0.2
        });
        gsap.fromTo(box1.current, { y: 100, opacity: 0, }, {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.3,
            scrollTrigger: {
                trigger: box1.current,
                scroller: 'body'
            }
        });
        gsap.fromTo(box2.current, { y: 100, opacity: 0, }, {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.3,
            scrollTrigger: {
                trigger: box2.current,
                scroller: 'body'
            }
        });
        gsap.fromTo(box3.current, { y: 100, opacity: 0, }, {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.3,
            scrollTrigger: {
                trigger: box3.current,
                scroller: 'body'
            }
        });
        gsap.fromTo(slideleft.current, { x: 100, opacity: 0, stagger: 0.2,}, {
            x: 0,
            opacity: 1,
            duration: 1,
            delay: 0.3,
            stagger: 0.2,
            scrollTrigger: {
                trigger: slideleft.current,
                scroller: 'body'
            }
        });
    }
    );
    return (
        <section>
            <div className=' width90  m-auto'>
                <section id='page1'>
                    <h1 className=' py-5 text-5xl font-extrabold w-3/4 m-auto text-center pop'>Enlighten
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
                                Array.isArray(allBlogs) && allBlogs?.map((val) => {
                                    return (
                                        <>
                                            {
                                                val?.category.includes("Diversity") ?
                                                    <div key={val._id} className=' relative h-fit'>
                                                        <SwiperSlide className='  '>
                                                            <div>
                                                                <img className=' w-full h-full object-cover' src={val?.image} alt="" />
                                                                <h1 onClick={(e) => { navigate(`/blog-details/${val?._id}`) }} className=' cursor-pointer hoverYellow px-3 blurBack text-left absolute z-30 w-full bottom-3 left-0 font-semibold text-2xl py-4 text-white'>{val?.title}</h1>
                                                            </div>
                                                        </SwiperSlide>
                                                    </div> : null
                                            }
                                        </>
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
                                    Array.isArray(allBlogs) && allBlogs?.map((val) => {
                                        return (
                                            <>
                                                {
                                                    val?.category.includes("Workplace") ?
                                                        <div className=' relative h-fit'>
                                                            <SwiperSlide className='  '>
                                                            <div >
                                                                    <img className=' w-full h-full object-cover' src={val?.image} alt="" />
                                                                    <h1 onClick={(e) => { navigate(`/blog-details/${val?._id}`) }} className='w-full px-3 py-2 hoverYellow blurBack text-left absolute z-30 bottom-3 left-0 font-semibold text-lg text-white'>{val.title}</h1>
                                                                </div>
                                                            </SwiperSlide>
                                                        </div> : null
                                                }
                                            </>
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
                                    Array.isArray(allBlogs) && allBlogs?.map((val) => {
                                        return (
                                            <>
                                                {
                                                    val?.category.includes("Building Relation") ?
                                                        <div className=' relative h-fit'>
                                                            <SwiperSlide className='  '>
                                                            <div >
                                                                    <img className=' w-full h-full object-cover' src={val?.image} alt="" />
                                                                    <h1 onClick={(e) => { navigate(`/blog-details/${val?._id}`) }} className=' w-full px-3 py-2 blurBack hoverYellow text-left absolute z-30 bottom-3 left-0 font-semibold text-lg text-white'>{val.title}</h1>
                                                                </div>
                                                            </SwiperSlide>
                                                        </div> : null
                                                }
                                            </>
                                        )
                                    })
                                }

                            </Swiper>
                        </div>
                    </div>
                </section>
                <section id='page2' className=' mb-10 flex flex-col items-center justify-center gap-10'>
                    <div className=' '>
                        <div ref={box1}>
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
                            <div className=' grid grid-cols-2 gap-4 ' >
                                
                                <div onClick={(e) => { navigate(`/blog-details/${allBlogs[0]?._id}`) }} className=' bg-white rounded-lg p-4 hoverBlur'>
                                    <div className=' h-80 w-full'>
                                        <img className=' w-full h-full object-cover' src={allBlogs[0]?.image} alt="" />
                                    </div>
                                    <div className=' h-36 overflow-hidden'>
                                        <h1 className=' text-xl font-bold'>{allBlogs[0]?.title}</h1>
                                        <p>{parse(`${allBlogs[0]?.description}`)}</p>
                                    </div>
                                </div>
                                <div className=' flex flex-col gap-2 height30 overflow-y-scroll overflow-x-hidden m-2'>
                                    {

                                        Array.isArray(allBlogs) && allBlogs?.map((val) => {
                                            return (
                                                <div ref={slideleft} onClick={(e) => { navigate(`/blog-details/${val?._id}`) }} className='hoverBlur flex flex-row gap-2 bg-white rounded-lg p-2 '>
                                                    <div className=' w-28 h-24'>
                                                        <img className=' w-full h-full object-cover' src={val?.image} alt="" />
                                                    </div>
                                                    <p className=' text-lg font-bold'>{val?.title}</p>
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
                    <div ref={box2} className=' page3'>
                        <nav className=' flex items-end justify-between greenBorderBottom  mb-3 text-lg '>
                            <h1 className=' whitespace-nowrap w-fit font-semibold bg-green-600 text-white py-0.5 px-3 mr-10 '>
                                Latest
                            </h1>
                        </nav>
                        <div className=' grid grid-cols-4 gap-2'>
                            {
                                Array.isArray(allBlogs) && allBlogs?.map((val, idx) => {
                                    return (
                                        <>
                                            {
                                                idx <= 7 ?
                                                    <div onClick={(e) => { navigate(`/blog-details/${val?._id}`) }} className='hoverBlur bg-white rounded-lg p-4 overflow-hidden'>
                                                        <div className=' h-72 w-full'>
                                                            <img className=' w-full h-full object-cover' src={val?.image} alt="" />
                                                        </div>
                                                        <div>
                                                            <h1 className=' text-2xl font-bold textEllipsis py-2'>{val?.title}</h1>
                                                            <p className=' overflow-hidden h-36'>{parse(`${val?.description}`)}</p>
                                                        </div>
                                                    </div> : null
                                            }
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div ref={box3} className=' page4'>
                        <nav className=' flex items-end justify-between babyBlueBorderBottom mb-3 text-lg '>
                            <h1 className=' whitespace-nowrap w-fit font-semibold bg-blue-600 text-white py-0.5 px-1 mr-10 '>
                                Diversity
                            </h1>
                        </nav>
                        <div className=' grid grid-cols-4 gap-2'>
                            {
                                Array.isArray(allBlogs) && allBlogs?.map((val, idx) => {
                                    return (
                                        <>
                                            {
                                                idx <= 7 && val?.category?.includes("Diversity") ?
                                                    <div onClick={(e) => { navigate(`/blog-details/${val?._id}`) }} className='hoverBlur bg-white rounded-lg p-4 overflow-hidden'>
                                                        <div className=' h-72 w-full'>
                                                            <img className=' w-full h-full object-cover' src={val?.image} alt="" />
                                                        </div>
                                                        <div>
                                                            <h1 className=' text-2xl font-bold textEllipsis py-2'>{val?.title}</h1>
                                                            <p className=' overflow-hidden h-36'>{parse(`${val?.description}`)}</p>
                                                        </div>
                                                    </div> : null
                                            }
                                        </>
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