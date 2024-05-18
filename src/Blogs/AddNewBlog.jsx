import React, { useState } from 'react';
import { basePath, navList } from '../Constants/constants';
import axios from "axios";

function AddNewBlog(props) {
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        author: "",
        category: "",
        image: "",
        description: "",
    });
    const [currentAddedBlog, setCurrentAddedBlog] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleFileChange = (e) => {
        if (e.target.files) {
            console.log(URL.createObjectURL(e.target.files[0]));
            setFormData({ ...formData, image: URL.createObjectURL(e.target.files[0]) });
        }
    };
    const postBlog = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let res = await axios.post(`${basePath}/insertBlog`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            // let resJson = await res.json();
            console.log(res);
            // getBlogData();
            setFormData({
                title: "",
                date: "",
                author: "",
                category: "",
                image: "",
                description: "",
            });
            setCurrentAddedBlog(res.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    console.log(formData);
    return (
        <div className=' relative'>
            {currentAddedBlog ?
                <section className=' fixed min-h-screen  w-screen top-0 left-0 blurBack flex items-center justify-center'>
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
                                <div>
                                    <p>{currentAddedBlog?.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> : null}

            <div className=" formBox flex flex-col items-center justify-center p-4 bg-white border-2 rounded-xl m-auto my-3">
                <h1 className=" text-2xl font-bold my-2">Add New Blog</h1>
                <form id='blog' onSubmit={postBlog} className=' w-full flex flex-col items-center justify-center gap-5'>
                    <input value={formData?.title} type="text" className=" border-2 rounded-xl mb-3 px-3 py-2 w-full" placeholder="Title" onChange={(e) => { setFormData({ ...formData, title: e.target.value }) }} required />
                    <div className=' grid grid-cols-2 gap-3 w-full'>
                        <input value={formData?.author} type="text" className=" border-2 rounded-xl mb-3 px-3 py-2 w-full" placeholder="Author" onChange={(e) => { setFormData({ ...formData, author: e.target.value }) }} required />
                        <select value={formData?.category} className=' outline-none border-2 rounded-xl mb-3 px-3 py-2 ' onChange={(e) => { setFormData({ ...formData, category: e.target.value }) }} required >
                            <option value="" selected disabled>--Select Category--</option>
                            {
                                navList?.map((val) => {
                                    return (
                                        <option key={val.name} value={val.name}>{val?.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className=' grid grid-cols-2 gap-3 w-full'>
                        <input value={formData?.date} type="date" className=" border-2 rounded-xl mb-3 px-3 py-2 w-full" placeholder="Date" onChange={(e) => { setFormData({ ...formData, date: e.target.value }) }} required />
                        <input type="file" accept="image/png, image/gif, image/jpeg, image/webp, image/jpg" className=" border-2 rounded-xl mb-3 px-3 py-2 w-full" placeholder="Image" onChange={(e) => { setFormData({ ...formData, image: e.target.files[0] }) }} required />
                    </div>
                    <textarea value={formData?.description} className=" border-2 rounded-xl mb-3 px-3 py-2 w-full" rows={5} placeholder="Blog Description" onChange={(e) => { setFormData({ ...formData, description: e.target.value }) }} required ></textarea>
                    <button className=" bg-blue-600 font-semibold hoverBlack text-white px-6 py-2 text-lg rounded-xl w-full" type='submit'>{loading ? "Loading..." : "Submit"}</button>
                </form>
            </div>
        </div>
    );
}

export default AddNewBlog;