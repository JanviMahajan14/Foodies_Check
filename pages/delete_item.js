import { useRouter } from 'next/router'
import baseUrl from '../utils/baseUrl'
import DeleteIcon from '@material-ui/icons/Delete';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();


const MenuList = ({ items }) => {
    const router = useRouter();

    const handleDeleteItem = async (item_name) => {
        try {
            const res = await fetch(`${baseUrl}api/products`, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: item_name
                })
            })
            const data = await res.json();
            router.push('/delete_item');
            toast.success('Item removed successfully!', { position: toast.POSITION.TOP_RIGHT })
        }
        catch(error) {
            toast.error("Oops! Unable to delete", { position: toast.POSITION.TOP_RIGHT }); 
        }
    }


    const itemList = items.map((item) => {
        return (
            <div style={{
                display: 'flex',
                margin: '30px',
                padding: '20px',
                borderBottom: '1px solid blue',
                justifyContent: 'space-around'
            }}>
                <img src={item.mediaUrl} width="100px" height="100px"/>
                <p>{item.name}</p>
                <DeleteIcon style={{ color: "red", fontSize: 40 }} onClick={()=>handleDeleteItem(item.name)} />
            </div>
        )
    })

    return (
        <div style={{
            fontFamily: "Merriweather Sans, sans-serif",
            padding: "50px",
            marginLeft: 'auto',
            marginRight: 'auto',
            width: "80%",
            textAlign: "center",
        }}>
            <h2>Delete Items
            <img
                src='/delete.svg'
                alt=" Trash icon"
                width='auto'
                height='70px'
            />
            </h2>
            {itemList}
        </div>
    );
}

export async function getStaticProps() {
    const res = await fetch(`${baseUrl}api/products`)
    const data = await res.json()
    return {
        props: {
            items: data
        }
    }
}

 
export default MenuList;