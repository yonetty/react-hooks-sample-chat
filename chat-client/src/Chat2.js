import {useState} from 'react';
import Message from './Message';
import useChatService from './useChatService';

const Chat2 = ({name}) => {
    const [messages, sendMessage] = useChatService({
        name: '管理人', text: `ようこそ、${name}さん`
    });

    const [text, setText] = useState('');

    const handleInputChange = (e) => {
        setText(e.target.value);
    };

    const handleButtonClick = (e) => {
        sendMessage(name, text);
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
                    messages.map(msg => {
                        return (
                            <Message name={msg.name} text={msg.text} />
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default Chat2;