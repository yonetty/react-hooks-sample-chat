import {useState, useEffect, useRef} from 'react';
import Message from './Message';
import {io} from 'socket.io-client';

const Chat = ({name}) => {
    const [messages, setMessages] = useState([{
        name: '管理人', text: `ようこそ、${name}さん`
    }]);

    const [text, setText] = useState('');

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

    const handleInputChange = (e) => {
        setText(e.target.value);
    };

    const handleButtonClick = (e) => {
        const aMessage = {
            name: name,
            text: text,
        };
        socketRef.current.emit('send', aMessage);
        setMessages(prevMessages => [...prevMessages, aMessage]);
        setText('');
    }

    return (
        <div>
            <div className="input">
                <input type="text" placeholder="メッセージ" value={text} onChange={handleInputChange} />
                <button disabled={!text} onClick={handleButtonClick}>送信</button>
            </div>
            <ul>
                {
                    messages.map((msg, idx) => {
                        return (
                            <Message key={idx} name={msg.name} text={msg.text} />
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default Chat;