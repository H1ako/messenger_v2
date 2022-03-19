// styles
import './UploadPicture.scss'
// global dependencies
import { useState, useRef } from 'react'

function UploadPicture() {

    const [picturePath, setPicturePath] = useState('')
    const [pictureFile, setPictureFile] = useState('')
    const inputRef = useRef()

    const pictureHandler = (event) => {
        const file = event.target.files[0]
        const value = URL.createObjectURL(file)

        setPictureFile(file)
        setPicturePath(value)
    }

    return (
        <div className='chatPicture'>
            <input
                ref={inputRef}
                onChange={pictureHandler}
                id='chatPictureUpload'
                type="file"
            />
            <label htmlFor='chatPictureUpload'>
                <img src={picturePath} />
            </label>
        </div>
    )
}

export default UploadPicture