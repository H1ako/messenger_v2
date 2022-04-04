// styles
import './UploadPicture.scss'
// global dependencies
import { useState } from 'react'
import { useRecoilState } from 'recoil'

function UploadPicture({ recoilState }) {

    const [pictureFile, setPictureFile] = useRecoilState(recoilState)
    const [picture, setPicture] = useState('')

    const pictureHandler = (event) => {
        const file = event.target.files[0]
        const value = URL.createObjectURL(file)

        setPictureFile(file)
        setPicture(value)
    }

    return (
        <div className='chatPicture'>
            <input
                onChange={pictureHandler}
                id='chatPictureUpload'
                type="file"
                accept=".png, .jpg, .jpeg"
            />
            <label htmlFor='chatPictureUpload'>
                <img src={picture} />
            </label>
        </div>
    )
}

export default UploadPicture