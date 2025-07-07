import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import axios from 'axios';
import { BASE_URL } from '../constants/constants';

const Home = () => {
    const [data, setData] = useState(null);
    const profile = JSON.parse(localStorage.getItem("user"));

    const fetchData = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(BASE_URL + "/api/v1/user/", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(response.data.users);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100">
            <Navbar />
            <div className="w-full flex flex-col items-center pt-6 px-2 sm:px-4">
                <div className="w-full max-w-2xl flex flex-col gap-4">
                    {data && data.map((user, index) => {
                        if (user._id === profile._id) {
                            return null; // Skip rendering the current user's card
                        }
                        return (
                            <div key={index} className="w-full">
                                <Card name={user} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Home;