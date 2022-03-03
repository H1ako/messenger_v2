// styles
import './Selector.scss'

// home page
function Selector(props) {
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

export default Selector