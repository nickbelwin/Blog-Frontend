import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { basePath, monthFull, months } from '../Constants/constants';
import parse from 'html-react-parser';
import Footer from '../Footer/Footer';

function BlogDetails(props) {
    const { id } = useParams();
    const naviagte= useNavigate();
    console.log(id);
    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(false);
    const [postDate, setPostDate] = useState("");

    const blogDetails = async () => {
        try {
            setLoading(true);
            let res = await axios(`${basePath}/getBlog/${id}`);
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
        window.scrollTo(0,0);
    }, [id])
    return (
        <>
            <section className=' blogDetailsBox m-auto'>
                <nav className=' flex flex-row items-center text-sm'>
                    <nav onClick={(e)=>{ naviagte("/")}} className=' text-yellow-300 cursor-pointer'>Home</nav>
                    <span className=' px-1'><svg class="separator" fill="currentColor" width="8" height="8" viewBox="0 0 8 8" aria-hidden="true" focusable="false">
                        <path d="M2,6.9L4.8,4L2,1.1L2.6,0l4,4l-4,4L2,6.9z"></path>
                    </svg></span>
                    <nav>{blog?.title}</nav>
                </nav>
                <div className=' py-10'>
                    <h1 className=' text-center text-5xl font-bold'>{blog?.title}</h1>
                    <h3 className=' text-center py-5 text-sm font-semibold text-gray-600'>
                        <span>{blog?.author}</span> 
                        <span className=' text-blue-600 px-1 font-bold'>/</span>
                        <span>{postDate}</span> 
                        <span className=' text-blue-600 px-1 font-bold'>/</span> 
                        <span>{blog?.category?.map((val, idx) => { return <span onClick={()=>{naviagte(`/blogs-category/${val}`)}} className='hoverYellow'>{blog?.category?.length - 1 === idx ? `${val}` : `${val}, `}</span> })}</span></h3>
                </div>
                <div className=' detailsImageBox py-5'>
                    <img className=' w-full h-full object-cover' src={blog?.image} alt={blog?.title} />
                </div>
                <div className=' descriptionBox text-gray-500 pb-10'>
                    {parse(`${blog?.description}`)}
                </div>
            </section>
            <Footer />
        </>
    );
}

export default BlogDetails;