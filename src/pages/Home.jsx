import React from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../constants/constants'

const Home = () => {
    const [data, setData] = useState(null);
    const profile = JSON.parse(localStorage.getItem("user"));
    const fetchData = async () => {
        // console.log(localStorage.getItem("token"))
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(BASE_URL+"/api/v1/user/", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
            // console.log(response.data.users);
            setData(response.data.users);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(()=>{
    fetchData();

    },[])
    // console.log(data)
  return (
    <div>
        <Navbar></Navbar>
        <div className='w-full h-full flex-col justify-items-center pt-10'>
            {data && data.map((user, index) => {
                if(user._id === profile._id) {
                    return null; // Skip rendering the current user's card
                }
                return (
                    <Card key={index} name={user}/>
                )
            })}
        </div>
    </div>
  )
}

export default Home