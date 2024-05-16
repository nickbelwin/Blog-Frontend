import React, { useState } from 'react';
import { basePath } from '../Constants/constants';

function AddNewBlog(props) {
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });
    const [loading, setLoading] = useState(false);

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
            <div className=" formBox flex flex-col items-center justify-center w-fit p-4 bg-white border-2 rounded-xl m-auto my-3">
                <h1 className=" text-2xl font-bold my-2">Add New Blog</h1>
                <input type="text" className=" border-2 rounded-xl mb-3 px-3 py-2 w-full" placeholder="Title" onChange={(e) => { setFormData({ ...formData, title: e.target.value }) }} />
                <textarea className=" border-2 rounded-xl mb-3 px-3 py-2 w-full" placeholder="Blog Description" onChange={(e) => { setFormData({ ...formData, description: e.target.value }) }}></textarea>
                <button className=" bg-blue-500 font-semibold text-white px-6 py-1 rounded-xl" onClick={postBlog}>{loading ? "Loading..." : "Submit"}</button>
            </div>
        </div>
    );
}

export default AddNewBlog;