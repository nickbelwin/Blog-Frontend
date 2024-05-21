import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { basePath, monthFull } from '../Constants/constants';
import Footer from '../Footer/Footer';
import parse from 'html-react-parser';

function BlogByCategory(props) {
    const { category } = useParams();
    console.log(category);
    const naviagte = useNavigate();
    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(false);
    const [postDate, setPostDate] = useState("");

    const blogDetails = async () => {
        try {
            setLoading(true);
            let res = await axios(`${basePath}/getBlogs/${category}`);
            console.log(res);
            if (res?.status === 200) {
                setBlog(res?.data?.data);
                let date = res?.data?.data?.date;
                date = date.split("-");
                let month = parseInt(date[1]);
                date = `${monthFull[month - 1]} ${date[2]}, ${date[0]}`;
                setPostDate(date);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    useEffect(() => {
        blogDetails();
        window.scrollTo(0, 0);
    }, [])


    return (
        <>
            <section className=' width80 m-auto'>
                <nav className=' flex flex-row items-center text-sm'>
                    <nav onClick={(e) => { naviagte("/") }} className=' text-yellow-300 cursor-pointer'>Home</nav>
                    <span className=' px-1'><svg class="separator" fill="currentColor" width="8" height="8" viewBox="0 0 8 8" aria-hidden="true" focusable="false">
                        <path d="M2,6.9L4.8,4L2,1.1L2.6,0l4,4l-4,4L2,6.9z"></path>
                    </svg></span>
                    <nav>{blog?.title}</nav>
                </nav>
                {
                    !loading ?
                        <div className=' grid grid-cols-4 gap-3 mt-10'>
                            {
                                Array.isArray(blog) && blog?.map((val, idx) => {
                                    return (
                                        <>
                                            {
                                                <div onClick={(e) => { naviagte(`/blog-details/${val?._id}`) }} className='hoverBlur bg-white rounded-lg p-4 overflow-hidden'>
                                                    <div className=' h-72 w-full rounded-lg overflow-hidden'>
                                                        <img className=' w-full h-full object-cover' src={val?.image} alt="" />
                                                    </div>
                                                    <div>
                                                        <h1 className=' text-2xl font-bold textEllipsis py-2'>{val?.title}</h1>
                                                        <p className=' overflow-hidden h-36'>{parse(`${val?.description}`)}</p>
                                                    </div>
                                                </div>
                                            }
                                        </>
                                    )
                                })
                            }
                        </div> :
                        <div className=' w-full h-60'>
                            <img className=' m-auto w-44' src="/img/loading2.gif" alt="" />
                        </div>
                }
            </section>
            <Footer />
        </>
    );
}

export default BlogByCategory;