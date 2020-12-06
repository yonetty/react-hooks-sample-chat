import {useState, useEffect, useRef} from 'react';
import {io} from 'socket.io-client';

const useChatService = (initialMessage) => {
    const [messages, setMessages] = useState([initialMessage]);

    const socketRef = useRef();

    useEffect(() => {
        console.log('Connectinng..');
        socketRef.current = io();
        socketRef.current.on('broadcast', payload => {
            console.log('Recieved: ' + payload);
            setMessages(prevMessages => [...prevMessages, payload]);
        });
        return () => {
            console.log('Disconnecting..');
            socketRef.current.disconnect();
        };
    }, []);

    const sendMessage = (name, text) => {
        const aMessage = {
            name: name,
            text: text,
        };
        socketRef.current.emit('send', aMessage);
        setMessages(prevMessages => [...prevMessages, aMessage]);
    }

    return [messages, sendMessage];
}

export default useChatService;