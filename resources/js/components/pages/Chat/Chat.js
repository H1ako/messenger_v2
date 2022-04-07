// styles
import './Chat.scss'
// global dependencies
import { useParams } from "react-router-dom"
import { useEffect, useState, useRef } from 'react'
import { useRecoilValue } from 'recoil'
// recoil atoms
import { userInfoState } from '../../../recoil/UserAtom.js'
// libs
import { customFetch } from '../../../libs/customFetch'
// components
import ChatMessage from './ChatMessage'

// Chat page
function Chat() {
    const { chatId } = useParams()
    const [chatInfo, setChatInfo] = useState({})
    const [messages, setMessages] = useState([])
    const [messageText, setMessageText] = useState([])
    const [companionInfo, setCompanionInfo] = useState({})
    const userInfo = useRecoilValue(userInfoState)
    const messagesBottom = useRef()

    const sendMessage = () => {
        if (!messageText) return
        const messageData = {
            text: messageText
        }

        setMessageText("")

        customFetch(`/chats/${chatId}/new-message`, "POST", JSON.stringify(messageData))
    }

    const handeEnter = e => {
        if (e.key === 'Enter' && e.shiftKey) {
            sendMessage()
        }
    }

    useEffect(() => {
        customFetch(`/api/chats/${chatId}`, "POST")
        .then(data => data.json())
        .then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else if (data) {
                setChatInfo(data.chat)
                setMessages(data.messages)
                setCompanionInfo(data.companion?.[0])
            }
        })
        const channel = Echo.private(`chatbox.${chatId}`)
        .listen('MessageSend', (e) => {
            setMessages(state => ([...state, e.message]));
        })

        return () => {
            Echo.leaveChannel(channel)
        }
    }, [])

    useEffect(() => {
        messagesBottom.current.scrollIntoView()
    }, [messages])
    
    return (
        <div className="page chatPage" onKeyUp={handeEnter}>
            {chatInfo.chat_type === 'groupchat' ?
            <div className="chatPage__topRow">
                <div className={`topRow__chatInfo${!chatInfo.name ? ' notLoaded' : ''}`}>
                     <img src={chatInfo.picture} alt="" />
                     <h3>{chatInfo.name}</h3>
                </div>
                <button>settings</button>
            </div>
            :
            <div className="chatPage__topRow">
                <div className={`topRow__chatInfo${!companionInfo?.name || !companionInfo?.surname ? ' notLoaded' : ''}`}>
                     <img src={companionInfo?.picture} alt="" />
                     <h3>{`${companionInfo?.name} ${companionInfo?.surname}`}</h3>
                </div>
            </div>
            }
            <div className="chatPage__messages">
                {messages.map(message =>(
                    <ChatMessage
                        key={message.id}
                        currentUserId={userInfo.id}
                        sender={message.sender}
                        text={message.text}
                        time={message.updated_at}
                    />
                ))}
                <div ref={messagesBottom} className="messages__bottom" />
            </div>
            <div className="chatPage__bottomRow">
                <textarea
                    autoFocus
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder='your message...'
                />
                <button
                    onClick={sendMessage}
                >send
                </button>
            </div>
        </div>
    )
}

export default Chat