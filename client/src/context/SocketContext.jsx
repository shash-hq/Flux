import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [latestTrend, setLatestTrend] = useState(null);

    useEffect(() => {
        // Connect to the backend
        const newSocket = io('http://localhost:5001', {
            transports: ['websocket'], // Force WebSocket
        });

        newSocket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        newSocket.on('new_trend', (trend) => {
            console.log('Received new trend:', trend);
            setLatestTrend(trend);
        });

        newSocket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    return (
        <SocketContext.Provider value={{ socket, latestTrend }}>
            {children}
        </SocketContext.Provider>
    );
};
