// styles
import './Chat.scss'
// global dependencies
import { useParams } from "react-router-dom"

// Chat page
function Chat(props) {
    const {id} = useParams()
    const chatType = 'chatgroup'

    return (
        <div className="page chatPage">
            {chatType === 'chatgroup' &&
            <div className="chatPage__topRow">
                <div className="topRow__chatInfo">
                     <img src="/assets/ava.png" alt="" />
                     <h3>sos</h3>
                </div>
                <button>settings</button>
            </div>
            }
            <div className="chatPage__messages">
                <div className="messages__message">
                    <div className="message__senderInfo">
                        <img src="/assets/ava.png" alt="" />
                        <h2>dima</h2>
                    </div>
                    <p>
                        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, excepturi! Quas omnis dignissimos delectus rerum magni? Nisi magni ratione veniam odio. Quod saepe temporibus cupiditate molestiae numquam nam, voluptates illo?
                    </p>
                    <time>
                       12:47
                    </time>
                    
                </div>

                <div className="messages__message myMessage">
                    <div className="message__senderInfo">
                        <img src="/assets/ava.png" alt="" />
                        <h2>nikita</h2>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, consequuntur? Consectetur harum neque amet quos veritatis nam dignissimos quis quibusdam iste odio esse facilis, voluptates perspiciatis? Quo molestiae tempora iure.
                    </p>
                   <time>
                       12:47
                   </time>
                </div>
                <div className="messages__message">
                    <div className="message__senderInfo">
                        <img src="/assets/ava.png" alt="" />
                        <h2>dima</h2>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, excepturi! Quas omnis dignissimos delectus rerum magni? Nisi magni ratione veniam odio. Quod saepe temporibus cupiditate molestiae numquam nam, voluptates illo?
                    </p>
                    <time>
                       12:47
                    </time>
                    
                </div>

                <div className="messages__message myMessage">
                    <div className="message__senderInfo">
                        <img src="/assets/ava.png" alt="" />
                        <h2>nikita</h2>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, consequuntur? Consectetur harum neque amet quos veritatis nam dignissimos quis quibusdam iste odio esse facilis, voluptates perspiciatis? Quo molestiae tempora iure.
                    </p>
                   <time>
                       12:47
                   </time>
                </div>
                <div className="messages__message">
                    <div className="message__senderInfo">
                        <img src="/assets/ava.png" alt="" />
                        <h2>dima</h2>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, excepturi! Quas omnis dignissimos delectus rerum magni? Nisi magni ratione veniam odio. Quod saepe temporibus cupiditate molestiae numquam nam, voluptates illo?
                    </p>
                    <time>
                       12:47
                    </time>
                    
                </div>

                <div className="messages__message myMessage">
                    <div className="message__senderInfo">
                        <img src="/assets/ava.png" alt="" />
                        <h2>nikita</h2>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, consequuntur? Consectetur harum neque amet quos veritatis nam dignissimos quis quibusdam iste odio esse facilis, voluptates perspiciatis? Quo molestiae tempora iure.
                    </p>
                   <time>
                       12:47
                   </time>
                </div>
                <div className="messages__message">
                    <div className="message__senderInfo">
                        <img src="/assets/ava.png" alt="" />
                        <h2>dima</h2>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, excepturi! Quas omnis dignissimos delectus rerum magni? Nisi magni ratione veniam odio. Quod saepe temporibus cupiditate molestiae numquam nam, voluptates illo?
                    </p>
                    <time>
                       12:47
                    </time>
                    
                </div>

                <div className="messages__message myMessage">
                    <div className="message__senderInfo">
                        <img src="/assets/ava.png" alt="" />
                        <h2>nikita</h2>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, consequuntur? Consectetur harum neque amet quos veritatis nam dignissimos quis quibusdam iste odio esse facilis, voluptates perspiciatis? Quo molestiae tempora iure.
                    </p>
                   <time>
                       12:47
                   </time>
                </div>
            </div>
            <div className="chatPage__bottomRow">
                <textarea placeholder='your message...'/>
                <button>send</button>
            </div>
        </div>
    )
}

export default Chat