import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { createSocketConnection } from "../constants/socket";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios'
import { BASE_URL } from "../constants/constants";

const Chat = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const { targetId } = useParams();
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const fetchChats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(BASE_URL + "/api/v1/chat/" + targetId, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const mapped = res.data.messages.map((msg) => ({
        firstName: msg.sender.firstName,
        lastName: msg.sender.lastName,
        text: msg.text,
        self: msg.sender.firstName === user.firstName,
        createdAt: msg.createdAt,
      }));
      setMessages(mapped);

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchChats();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const socketInstance = createSocketConnection();
    setSocket(socketInstance);

    socketInstance.emit("joinChat", { userId: user._id, targetId, sender: user.firstName });

    socketInstance.on("messageReceived", ({ firstName, lastName, newMessage }) => {
      setMessages(messages => [
        ...messages,
        {
          firstName,
          lastName,
          text: newMessage,
          self: firstName === user.firstName,
          createdAt: new Date().toISOString(),
        }
      ]);
    });

    return () => {
      socketInstance.disconnect();
    }
    // eslint-disable-next-line
  }, [user._id, targetId, user.firstName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket) return;
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId: user._id,
      targetId,
      newMessage
    });
    setNewMessage("");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 flex flex-col">
      <Navbar />
      <div className="flex flex-col w-full h-full flex-1 items-center justify-center py-2 sm:py-4 px-1 sm:px-0">
        <div className="w-full max-w-full sm:max-w-2xl bg-white rounded-xl shadow-lg flex flex-col h-[90vh] sm:h-[80vh] border border-gray-200">
          {/* Chat Header */}
          <div className="flex items-center px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-500 to-purple-400 rounded-t-xl relative">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-indigo-700 rounded-full p-2 shadow transition"
              aria-label="Back"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-base sm:text-lg mr-2 sm:mr-3 ml-8">
              <span>
                {targetId?.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div>
              <div className="font-semibold text-white text-base sm:text-lg">Chat Room</div>
              <div className="text-xs text-indigo-100">Online</div>
            </div>
          </div>
          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-2 sm:py-3 space-y-2 sm:space-y-3 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg?.self ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`relative px-3 py-2 sm:px-4 sm:py-2 rounded-2xl max-w-[85%] sm:max-w-[70%] text-sm sm:text-base break-words shadow-sm ${
                    msg?.self
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                  }`}
                >
                  <span className="block text-xs font-semibold mb-1 opacity-70">
                    {msg?.self ? "You" : `${msg?.firstName} ${msg?.lastName || ""}`}
                  </span>
                  {msg.text}
                  <span className="block text-[10px] text-right text-gray-300 mt-1">
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                  </span>
                  {/* Bubble tail */}
                  <span
                    className={`absolute bottom-0 ${
                      msg?.self
                        ? "right-0 translate-x-1/2"
                        : "left-0 -translate-x-1/2"
                    } w-3 h-3 bg-inherit rounded-full`}
                    style={{
                      boxShadow: msg?.self
                        ? "-4px 4px 0 0 #4f46e5"
                        : "4px 4px 0 0 #fff",
                    }}
                  ></span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {/* Chat Input */}
          <form
            className="flex items-center border-t px-2 sm:px-4 py-2 sm:py-3 bg-white rounded-b-xl"
            onSubmit={sendMessage}
          >
            <input
              type="text"
              className="flex-1 px-3 sm:px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 text-gray-800 text-sm sm:text-base"
              placeholder="Type a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              type="submit"
              className="ml-2 sm:ml-3 px-4 sm:px-5 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition text-sm sm:text-base"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;