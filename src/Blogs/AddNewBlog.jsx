import React, { useState, useEffect } from 'react';
import { basePath, categoryList, months, navList } from '../Constants/constants';
import axios from "axios";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';

function AddNewBlog(props) {
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        author: "",
        category: [],
        image: "",
        description: "",
    });
    const [allBlogs,setAllBlogs]=useState([]);
    const [todayDate, setTodayDate] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [description,setDescription]=useState("");

    useEffect(()=>{
        if(description){
            setFormData({...formData, description: description});
        }
    },[description])
    const handleCategory = (e) => {
        let data = e.target.value;
        console.log(formData?.category);
        if ( Array.isArray(formData.category) && !formData?.category.includes(data)) {
            let cate = [...formData?.category, data];
            setFormData({ ...formData, category: cate });
        }
    }
    const handleRemoveCtegory = (e) => {
        let idx = e.target.id;
        let cate = formData?.category;
        cate = cate.filter((val, index) => {
            if (index != idx) {
                return val;
            }
        })
        setFormData({ ...formData, category: cate });
    }
    useEffect(() => {
        let today = new Date();
        let date = today.getDate();
        let month = today.getMonth();
        let year = today.getFullYear();
        setTodayDate({
            date: date,
            month: month,
            year: year,
        })
    }, []);
    const getBlogdata=async()=>{
        let res= await axios("http://localhost:4000/getBlogs");
        console.log(res.data.data);
        setAllBlogs(res.data.data);

    }
    useEffect(()=>{
        getBlogdata();
    },[])
    const [currentAddedBlog, setCurrentAddedBlog] = useState(false);
    const [loading, setLoading] = useState(false);
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
        gsap.from('.popUp', {
            x: 400,
            opacity: 0,
            scale: 0.5,
            duration: 1.2,
            delay: 0.5,
        });
    }
    );
    const postBlog = async (e) => {
        e.preventDefault();
        setErrorMsg(false);
        try {
            setLoading(true);
            let res = await axios.post(`${basePath}/insertBlog`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(res);
            // getBlogData();
            if (res.status === 200) {
                setCurrentAddedBlog(res.data.data);
                setFormData({
                    title: "",
                    date: "",
                    author: "",
                    category: [],
                    image: "",
                    description: "",
                });
                document.getElementById("blog").reset();
            }
            else if (res.status === 400) {
                setErrorMsg(res.data.message);
                setTimeout(() => {
                    setErrorMsg(false);
                }, 3000);
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
            setErrorMsg(error.response.data.message);
            setTimeout(() => {
                setErrorMsg(false);
            }, 5000);
            setLoading(false);
        }
    }
    console.log(formData);
    return (
        <div className=' relative '>
            <header>
                <header className=' px-10 py-0 bg-black text-white flex items-center justify-end'>
                    {/* <div className='flex items-center gap-3 font-semibold navOne'>
                        <nav className=' hoverWhite py-0.5 px-1 rounded-lg '>About Us</nav>
                        <nav className='  hoverWhite py-0.5 px-1 rounded-lg '>Contact</nav>
                    </div> */}
                    <div className=' flex items-center gap-3'>
                        <div className='  flex items-center gap-1 hoverWhite py-0.5 px-1 rounded-lg '>
                            <img className=' w-6 navOne' src="/img/linkedin-png.png" alt="linkedin icon" />
                            <h4 className=' text-sm font-semibold navOne'>LinkedIn</h4>
                        </div>
                        <div className='  flex items-center gap-1 py-0.5 px-1 rounded-lg navOne'>
                            <h1 className=' text-3xl font-bold'>{todayDate?.date}</h1>
                            <div className=' text-xs font-semibold'>
                                <h4 className=' h-3'>{months[todayDate?.month]}</h4>
                                <h4>{todayDate?.year}</h4>
                            </div>
                        </div>
                    </div>
                </header>
                <header className=' mb-7 grayBorderBottom' >
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
            </header>
            {currentAddedBlog ?
                <section className=' fixed min-h-screen z-10 w-screen top-0 left-0 blurBack flex items-center justify-center'>
                    <div className='p-5 rounded-lg bg-white overflow-y-scroll  w-2/4 height90 my-5'>
                        <div className='  '>
                            <button className=' bg-red-200 font-semibold text-red-600 px-4 py-1 rounded-lg' onClick={(e) => { setCurrentAddedBlog(false); }} >Close</button>
                            <div className=' flex flex-col items-center justify-center gap-2'>
                                <h1 className=' text-3xl font-bold'>{currentAddedBlog?.title}</h1>
                                <div>
                                    <h4 className=' text-gray-400 font-semibold'>{currentAddedBlog?.author} | {currentAddedBlog?.date}</h4>
                                </div>
                                <div className='w-96 '>
                                    <img className=' w-full h-full object-cover' src={currentAddedBlog?.image} alt="" />
                                </div>
                                <div className=' text-left w-full'>
                                    <h1 className=' text-xl font-semibold text-left w-full'>Description</h1>
                                    <p className=' border-2 rounded-lg p-3'>{currentAddedBlog?.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> : null}

            <div className="grayBlurShadow formBox flex flex-col items-center justify-center  bg-white border-2 rounded-xl m-auto my-3">
                <h1 className=" text-4xl font-bold my-2 bg-blue-100 w-full rounded-lg py-2 text-center">Add New Blog</h1>
                <form id='blog' onSubmit={postBlog} className=' w-full flex flex-col items-center justify-center gap-5'>
                    <div className=' w-full'>
                        <label htmlFor="" className=' font-semibold ml-2'>Title</label>
                        <input value={formData?.title} type="text" className=" border-2 rounded-xl mb-3 px-3 py-2 w-full" placeholder="Title*" onChange={(e) => { setFormData({ ...formData, title: e.target.value }); setErrorMsg(false); }} />
                    </div>
                    <div className=' grid gridResponse gap-3 w-full'>
                        <div className=' w-full'>
                            <label htmlFor="" className=' font-semibold ml-2'>Author</label>
                            <input value={formData?.author} type="text" className=" border-2 rounded-xl mb-3 px-3 py-2 w-full" placeholder="Author*" onChange={(e) => { setFormData({ ...formData, author: e.target.value }); setErrorMsg(false); }} />
                        </div>
                        <div className=' w-full flex flex-col'>
                            <label htmlFor="" className=' font-semibold ml-2'>Category</label>
                            <select id='category' value={""} className=' outline-none border-2 rounded-xl mb-3 px-3 py-2 ' onChange={(e) => { handleCategory(e); setErrorMsg(false); }}  >
                                <option value="" selected disabled>--Select--</option>
                                {
                                    categoryList?.map((val) => {
                                        return (
                                            <option key={val.name} value={val.name}>{val?.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <div className=' flex items-center flex-wrap gap-2 w-full '>
                                {Array.isArray(formData?.category) && formData?.category?.map((val,idx) => {
                                    return <h1 className=' w-fit px-2 border-2 rounded-lg bg-blue-400 text-white font-semibold' key={val} >{val} <span className='hoverBlack px-1 rounded-lg cursor-pointer' id={idx} onClick={handleRemoveCtegory}>X</span></h1>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className=' grid gridResponse gap-3 w-full'>
                        <div className=' w-full'>
                            <label htmlFor="" className=' font-semibold ml-2'>Publish Date</label>
                            <input value={formData?.date} type="date" className=" border-2 rounded-xl mb-3 px-3 py-2 w-full" placeholder="Date" onChange={(e) => { setFormData({ ...formData, date: e.target.value }); setErrorMsg(false); }} />
                        </div>
                        <div className=' w-full'>
                            <label htmlFor="" className=' font-semibold ml-2'>Upload Image</label>
                            <input type="file" accept="image/png, image/gif, image/jpeg, image/webp, image/jpg" className=" border-2 rounded-xl mb-3 px-3 py-2 w-full" placeholder="Image" onChange={(e) => { setFormData({ ...formData, image: e.target.files[0] }); setErrorMsg(false); }} />
                        </div>
                    </div>
                    <div className=' w-full'>
                        <label htmlFor="" className=' font-semibold ml-2'>Description</label>
                        <ReactQuill
                        id='textBox'
                        theme='snow'
                        className=" mb-3 w-full"
                        // defaultValue={"Blog Description*"}
                        placeholder='Blog Description*'
                        value={description}
                        // onChange={(e) => { setFormData({ ...formData, description: e.target.value }); setErrorMsg(false); }}
                        onChange={setDescription}
                        />
                        {/* <textarea value={formData?.description} className=" border-2 rounded-xl mb-3 px-3 py-2 w-full" rows={5} placeholder="Blog Description*" onChange={(e) => { setFormData({ ...formData, description: e.target.value }); setErrorMsg(false); }}  ></textarea> */}
                    </div>
                    <div className=' relative w-full pt-5'>
                        {errorMsg ?
                            <div className='errorBox popUp flex items-center justify-center w-full'>
                                <div className='fail'>
                                    <h1 className=' '>{errorMsg}</h1>
                                </div>
                            </div> : null}
                        <button className=" bg-blue-600 font-semibold hoverBlack text-white px-6 py-2 text-lg rounded-xl w-full" type='submit'>{loading ? "Loading..." : "Submit"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddNewBlog;