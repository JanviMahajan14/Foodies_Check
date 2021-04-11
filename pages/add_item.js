import { useState } from 'react'
import { Button, Icon } from '@material-ui/core'
import SendIcon  from '@material-ui/icons/Send'

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
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(name)
        console.log(price)
        console.log(isVeg)
        console.log(mediaUrl)
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