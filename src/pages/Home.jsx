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
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-start py-6 px-2 sm:px-4">
                <div className="w-full max-w-5xl flex flex-col">
                    <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-6 text-center font-mono">
                        People
                    </h2>
                    {data && data.length > 1 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                            {data.map((user, index) => {
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
                    ) : (
                        <div className="text-center text-gray-500 py-8">
                            No other users found.
                        </div>
                    )}
                </div>
            </div>
            <footer className="text-center py-4 text-white text-base opacity-90 font-serif tracking-wide">
                &copy; {new Date().getFullYear()} Chat App. All rights reserved.
            </footer>
        </div>
    );
};

export default Home;