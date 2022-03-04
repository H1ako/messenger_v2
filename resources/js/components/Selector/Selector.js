// styles
import './Selector.scss'

// home page
function Selector({type}) {

    if (type === 'users') {
        return (
            <div className="selector">
                <button className='active'>
                    all
                </button>
                <button>
                    friends
                </button>
                <button>
                    requests
                </button>
            </div>
        )
    }
    
    if (type === 'chats') {
        return (
            <div className="selector">
                <button className='active'>
                    all
                </button>
                <button>
                    dialogs
                </button>
                <button>
                    groupchats
                </button>
            </div>
        )
    }

    return (
        <div className="error">error</div>
    )
}

export default Selector