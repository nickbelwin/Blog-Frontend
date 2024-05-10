import { useEffect, useState } from "react";
import React from 'react';

function InsertBlog(props) {
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });
    const [loading, setLoading] = useState(false);
    const [allData, setAllData] = useState([]);

    const getBlogData = async () => {
        try {
            setLoading(true);
            let res = await fetch("https://blog-backend-inky.vercel.app/getBlogs");
            let resJson = await res.json();
            console.log(resJson.data);
            setAllData(resJson.data)
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    useEffect(() => {
        getBlogData();
    }, [])

    const postBlog = async () => {
        try {
            setLoading(true);
            let res = await fetch("https://blog-backend-inky.vercel.app/insertBlog", {
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
            <input type="text" onChange={(e) => { setFormData({ ...formData, title: e.target.value }) }} />
            <textarea onChange={(e) => { setFormData({ ...formData, description: e.target.value }) }}></textarea>
            <button onClick={postBlog}>{loading ? "Loading..." : "Submit"}</button>
            {!loading ?
                allData?.map((val) => {
                    return (
                        <div>
                            <h1 >{val?.title}</h1>
                            <p>{val?.description}</p>
                        </div>
                    )
                })
                : null}

        </div>
    );
}

export default InsertBlog;