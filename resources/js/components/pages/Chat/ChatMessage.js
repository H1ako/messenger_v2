function ChatMessage({
    currentUserId,
    sender,
    text,
    time
}) {
    return (
        <div className={`messages__message${sender.id == currentUserId ? ' myMessage' : ''}`}>
            <div className="message__senderInfo">
                <img src={sender.picture} alt="" />
                <h2>{sender.name}</h2>
            </div>
            <p>
                {text}
            </p>
            <time>
                {time}
            </time>
        </div>
    )
}

export default ChatMessage