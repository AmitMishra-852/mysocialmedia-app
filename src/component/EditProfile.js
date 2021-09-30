import { useState } from 'react';
import './EditProfile.css';
import { StateHandler } from "./login/context/Authcontext";
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link } from 'react-router-dom';

function EditProfile() {

    const { user, dispatch } = StateHandler();
    console.log("user", user)
    const [file, setFile] = useState(null)
    console.log(file)

    const SubmitHandler = async (e) => {
        e.preventDefault()
        let uploadimgUrl;

        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "profileImages")
        data.append("cloud_name", "philomath")
        try {
            const res = await axios.post("https://api.cloudinary.com/v1_1/philomath/image/upload", data)
            uploadimgUrl = res?.data
        } catch (err) {
            console.log(err)
        }
        try {
            const res = await axios.post(`https://mediaAppBackend.jerryroy.repl.co/api/user/currentUser/${user._id}`,
                { profilePicture: uploadimgUrl.secure_url })
            console.log("server response", res.data.profilePicture)
            localStorage.setItem("mainUser", JSON.stringify({ ...user, profilePicture: res.data.profilePicture }))
            dispatch({ type: "UPDATE-PROFILEPICTURE", payLoad: res.data.profilePicture })
            setFile(null)
        } catch (error) {

        }

    }

    return (
        <>
            <div className="editProfile">
                <div className="edituserImg">
                    <img
                        className="currentUser_img"
                        src={user.profilePicture}
                        alt=""
                    />
                    {
                        file && (
                            <div className="userUploadimg">
                                <img
                                    className="mainImg"
                                    src={URL.createObjectURL(file)}
                                    alt=""
                                />
                                <CloseIcon className="cancelImg" onClick={() => setFile(null)} />
                            </div>
                        )

                    }
                    <form className="profileImgForm" onSubmit={SubmitHandler}>
                        <label>
                            <EditIcon className="editIcon" />
                            <input
                                style={{ display: "none" }}
                                id="file"
                                type="file"
                                accept=".png,.jpeg,.jpg"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                        <button type="submit" className="submit_btn">UpLoad</button>
                    </form>

                </div>
                <Link to={`/profile/${user.userName}`} >
                    <ArrowBackIosIcon className="backArrow" />
                </Link>
            </div>
        </>
    )
}

export default EditProfile;
