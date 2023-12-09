import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Cookies from 'js-cookie';

const ChatApp = () => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const userId = Cookies.get('user_id');
        console.log('User ID from cookies:', userId);

        const newSocket = io('http://localhost:3999', {
            auth: {
                userSocketId: userId,
                isAdmin: Cookies.get('isAdmin') === 'true',
            },
        });
        setSocket(newSocket);

        const fetchData = async () => {
            try {
                const token = Cookies.get('token');
                const response = await axios.get('http://localhost:3999/previous-messages', {
                    headers: {
                        authorization: token,
                    },
                });

                if (response.status === 200) {
                    console.log('Fetched messages:', response.data.messages);
                    setMessages(response.data.messages);
                }
            } catch (error) {
                console.error('Error fetching previous messages:', error);
            }
        };

        fetchData();

        newSocket.on('connect', () => {
            console.log('Connected to Socket.IO server!');
        });

        newSocket.on('disconnect', () => {
            console.log('Disconnected from Socket.IO server!');
        });

        newSocket.on('connect_error', (error) => {
            console.error('Socket.IO connection error:', error);
        });

        newSocket.on('chat message', ({ sender_role, content, socket_id }) => {
            console.log('Received message:', sender_role, content, socket_id);
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender_role, content, socket_id: socket_id || Date.now() }, // Use a fallback value if socket_id is undefined
            ]);
        });
        

        newSocket.on('admin joined', ({ adminSocketId }) => {
            console.log('Admin joined the room:', adminSocketId);
        });

        return () => {
            console.log('Disconnecting from Socket.IO server...');
            newSocket.disconnect();
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = Cookies.get('user_id'); // Assuming user_id is the cookie name for the user ID
        const isAdmin = Cookies.get('isAdmin') === 'true';

        try {
            const token = Cookies.get('token');

            if (inputValue.trim() !== '') {
                const data = {
                    message: inputValue,
                    adminResponse: inputValue,
                    userSocketId: userId,
                };

                if (isAdmin) {
                    const adminSocketId = socket.id;
                    data.adminSocketId = adminSocketId;
                }

                const response = await axios.post('http://localhost:3999/chat', data, {
                    headers: {
                        authorization: token,
                    },
                });

                if (response.status === 200) {
                    // If the message was successfully sent to the server, no need to emit it to other clients
                }

                setInputValue('');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
            {messages.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {messages.map((message) => (
                        <li
                            key={message.socket_id}
                            style={{
                                padding: '10px',
                                background: message.sender_role === 'admin' ? '#efefef' : 'transparent',
                                borderRadius: '4px',
                                marginBottom: '8px',
                            }}
                        >
                            {`${message.sender_role === 'admin' ? 'Admin' : 'User'}: ${message.content}`}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No messages available.</p>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', marginTop: '20px' }}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    autoComplete="off"
                    style={{
                        border: 'none',
                        padding: '10px',
                        flexGrow: 1,
                        borderRadius: '4px',
                        marginRight: '8px',
                    }}
                />
                <button
                    type="submit"
                    style={{
                        background: '#333',
                        border: 'none',
                        padding: '10px 15px',
                        borderRadius: '4px',
                        color: '#fff',
                        cursor: 'pointer',
                    }}
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatApp;
