import './share.css';
import {useState , useRef} from "react"
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import Sharephotobtns from "./Sharephotobtns";
import { StateHandler } from "./login/context/Authcontext";
import axios from 'axios';
import { Cancel } from '@material-ui/icons';



function Share() {
    const [file, setFile] = useState(null)
    const disc = useRef()
    const { user } = StateHandler()

    console.log(disc.current?.value)

    const uploadFileHandler =async(e) => {
        e.preventDefault()
        let mainData;
       
        const data = new FormData()
        data.append("file" , file)
        data.append("upload_preset","infocus")
        data.append("cloud_name","philomath")
        try{
            const res = await axios.post("	https://api.cloudinary.com/v1_1/philomath/image/upload",data)
            mainData = res?.data
        }catch(err){
           console.log(err)
           }

        try{
            const responsedData = await axios.post("https://mediaAppBackend.jerryroy.repl.co/api/post",{
            userId:user._id,
            disc:disc.current?.value,
            img:mainData?.url
        })
         window.location.reload()
        }catch(err){
         console.log(err)
        }

    };
     
    return (
        <div className="share">
            <div className="sharewrap">
                <img
                    className="share-image"
                    src={user?.profilePicture || "https://media.istockphoto.com/vectors/profile-picture-vector-illustration-vector-id587805156"}
                    alt="image" 
                />
                <input 
                    placeholder={`whats in your mind ${user?.userName}`} 
                    className="share-input" 
                    ref={disc}
                />
            </div>
            <hr className="sharehr" />
            {
               file && (
                   <div className="upload-img-container">
                       <img className="upload-img" src={URL.createObjectURL(file)} alt=""/>
                       <Cancel className="cancel-Upload-Img" onClick={()=>setFile(null)}/>
                   </div>
               )
            }
            <form className="share-all-btn" onSubmit={uploadFileHandler}>
                <div className="share-btns">
                    <label htmlFor="file">
                        <Sharephotobtns htmlColor="green" Icon={AddToPhotosIcon} title="Photos and Videos" />
                        <input 
                          style={{display:"none"}}
                          id="file" 
                          type="file"
                          accept=".png,.jpeg,.jpg"  
                          onChange={(e)=>setFile(e.target.files[0])}
                           />
                    </label>
                </div>
                <button type="submit" className="submit-image">UPLOAD</button>
            </form>
        </div>
    )
}

export default Share;
