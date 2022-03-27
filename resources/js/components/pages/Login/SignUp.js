import UploadPicture from "../../UploadPicture/UploadPicture"

// home page
function SignUp() {
    return (
        <div className="loginPage__signUp">
            <h1>sign up</h1>
            <div className="signUp__info">
                <UploadPicture />
                <div className="info__main">
                    <input type="text" placeholder="name" />
                    <input type="text" placeholder="surname" />
                    <input type="email" placeholder="email" />
                </div>
            </div>
            <div className="signUp__passwords">
                <input type="password" placeholder="password" />
                <input type="password" placeholder="password again" />
            </div>
        </div>
    )
}

export default SignUp