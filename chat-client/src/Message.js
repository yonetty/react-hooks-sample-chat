const Message = ({name, text}) => {
    return (
        <li>
            <span className="name">{name}</span>
            <span className="text">{text}</span>
        </li>
    );
}

export default Message;