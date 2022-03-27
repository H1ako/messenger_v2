// styles
import './UploadPicture.scss'
// global dependencies
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { signUpPuctureFileState, signUpPuctureState } from '../../recoil/SignUpAtom'

function UploadPicture() {

    const [pictureFile, setPictureFile] = useRecoilState(signUpPuctureFileState)
    const [picture, setPicture] = useRecoilState(signUpPuctureState)

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
            />
            <label htmlFor='chatPictureUpload'>
                <img src={picture} />
            </label>
        </div>
    )
}

export default UploadPicture