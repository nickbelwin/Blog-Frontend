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
    const [loading, setLoading] = useState(false);
    const handleFileChange = (e) => {
        if (e.target.files) {
            console.log(URL.createObjectURL(e.target.files[0]));
          setFormData( {...formData, image:URL.createObjectURL(e.target.files[0]) });
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
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    console.log(formData);
    return (
        <div>
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