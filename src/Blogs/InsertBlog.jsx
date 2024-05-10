import { useState } from "react";
import React from 'react';

function InsertBlog(props) { 
    const [formData,setFormData]=useState({
        title:"",
        description:""
    });
    const [loading,setLoading]=useState(false);

    const postBlog= async()=>{
        try {
            setLoading(true);
            let res= await fetch("http://localhost:4000/insertBlog",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...formData})
            });
            let resJson= await res.json();
            console.log(resJson);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    console.log(formData);

    return (
        <div>
            <input type="text" onChange={(e)=>{ setFormData({ ...formData, title:e.target.value })}} />
            <textarea onChange={(e)=>{ setFormData({ ...formData, description:e.target.value })}}></textarea>
            <button onClick={postBlog}>submit</button>
            {loading? <h1>Loading...</h1>:null }
        </div>
    );
}

export default InsertBlog;