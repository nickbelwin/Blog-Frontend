import { useEffect, useState } from "react";
import React from 'react';
import { basePath } from "../Constants/constants";
import "./blog.css";

function InsertBlog(props) {
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [allData, setAllData] = useState([]);

    const getBlogData = async () => {
        try {
            setLoading2(true);
            let res = await fetch(`${basePath}/getBlogs`);
            let resJson = await res.json();
            console.log(resJson.data);
            setAllData(resJson.data)
            setLoading2(false);
        } catch (error) {
            console.log(error);
            setLoading2(false);
        }
    }
    useEffect(() => {
        getBlogData();
    }, [])

    const postBlog = async () => {
        try {
            setLoading(true);
            let res = await fetch(`${basePath}/insertBlog`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData })
            });
            let resJson = await res.json();
            console.log(resJson);
            getBlogData();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    console.log(formData);

    return (
        <div>
            <div className=" flex flex-col items-center justify-center w-fit p-4 bg-white border-2 rounded-xl m-auto my-3">
                <h1 className=" text-2xl font-bold my-2">Add New Blog</h1>
                <input type="text" className=" border-2 rounded-xl mb-3 px-3 py-2 w-full" placeholder="Title" onChange={(e) => { setFormData({ ...formData, title: e.target.value }) }} />
                <textarea className=" border-2 rounded-xl mb-3 px-3 py-2 w-full" placeholder="Blog Description" onChange={(e) => { setFormData({ ...formData, description: e.target.value }) }}></textarea>
                <button onClick={postBlog}>{loading ? "Loading..." : "Submit"}</button>
            </div>
            <div className=" px-4">
            <h1 className=" text-4xl bg-gray-200 rounded-xl py-3 font-bold my-2 w-full">Blogs</h1>
            </div>
            <div className=" grid justify-center items-center cardBox gap-2 grow p-5 border-2 rounded-xl mx-3">
            
                {!loading2 ?
                    allData?.map((val) => {
                        return (
                            <div className=" border-2 bg-blue-200 rounded-xl p-3 card" >
                                <h1 className=" text-2xl font-semibold mb-4">{val?.title}</h1>
                                <h4 className=" text-left text-xs font-semibold text-gray-400">Description:</h4>
                                <p className=" text-left">{val?.description}</p>
                            </div>
                        )
                    })
                    : <h1 className=" w-fit m-auto text-lg font-semibold text-blue-600">Loading...</h1> }
            </div>

        </div>
    );
}

export default InsertBlog;