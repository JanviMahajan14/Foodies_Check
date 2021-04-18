import { useState } from 'react'
import { Button, Icon } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import baseUrl from '../utils/baseUrl'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();


const styles = {
    container: {
        display: "flex",
        flexwrap: "wrap",
        justifyContent:"space-around"
    },
    uploadbtn: {
        backgroundColor: "#039be5",
        color: "white",
        fontFamily: "Merriweather Sans, sans-serif",
        display: "block",
        width: "100%",
        margin : "20px"
    },
    submitBtn: {
        backgroundColor: "#4caf50",
        color: "white",
        fontFamily: "Merriweather Sans, sans-serif",
        width: "100%",
        margin: "20px"
    },
    form: {
        height: "80vh",
        width: "80vh",
    },
    input: {
        width: "100%",
        padding: "12px 20px",
        margin: "8px 0",
        display: "inline - block",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxSizing: "border - box",
    },
}

const AddItem = () => {
    const [ name, setName ] = useState("")
    const [ price, setPrice ] = useState("")
    const [ isVeg, setIsVeg ] = useState(true)
    const [mediaUrl, setMediaUrl] = useState("")

    const uploadImage = async () => {
        try {
            const formData = new FormData();
            formData.append('file', mediaUrl);
            formData.append('upload_preset', "Instagram-Clone");
            formData.append('cloud_name', "smilingcloud");

            const response = await fetch("https://api.cloudinary.com/v1_1/smilingcloud/image/upload", {
                method: "post",
                body: formData
            })

            const data = await response.json();
            if (data.error) {
                throw new Error(data.error.message);
            }
            return data.url
        }
        catch (error) {
            toast.error(error.message, { position: toast.POSITION.TOP_RIGHT });
        }
    }
    
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const media = await uploadImage()
            const res = await fetch(`${baseUrl}api/products`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    price,
                    isVeg,
                    mediaUrl:media
                })
            })
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success('Item added successfully!', { position: toast.POSITION.TOP_RIGHT })
        }
        catch (error) {
            toast.error(error.message, { position: toast.POSITION.TOP_RIGHT });
        }
    }

    return (
        <div style={styles.container}>
            <form onSubmit={(e) => handleSubmit(e)} style={styles.form}>
                <label for="name">Dish Name</label>
                <input id="name" type="text" name="name" placeholder="Dish Name" onChange={(e) => setName(e.target.value)} style={styles.input}/>
                <label for="price"for="name">Price</label>
                <input id="price" type="text" name="price" placeholder="Price" onChange={(e) => setPrice(e.target.value)} style={styles.input} />
                <Button variant="contained" className="btn2" color="primary" style={styles.uploadbtn}>
                    <input id="actual-btn" type="file" id="actual-btn" accept="image/*" onChange={(e) => setMediaUrl(e.target.files[0])} hidden/>
                    <label for="actual-btn">Upload image</label>
                </Button>
                <img src={mediaUrl ? URL.createObjectURL(mediaUrl) : ""} alt="No image selected :(" width="200px" height="200px"/>
                <span id="actual-btn">{mediaUrl.name}</span>
                <Button variant="contained" style={styles.submitBtn} endIcon={<SendIcon />} type="submit" name="action">
                    Submit
                </Button>
            </form>
            <img src="/chef.png" width="600px" height="600px" style={{padding:"40px"}}/>
        </div>
    );
}
 
export default AddItem;