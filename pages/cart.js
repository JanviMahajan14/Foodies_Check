import baseUrl from '../utils/baseUrl'
import { parseCookies, destroyCookie } from "nookies";
import DeleteIcon from '@material-ui/icons/Delete';
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const handleLogin = async () => {
  const router = useRouter();
  router.push('/login');
}

const Cart = ({ error, products, token }) => {
  const router = useRouter();
  if(error){
    toast.error(error, { position: toast.POSITION.TOP_RIGHT });
    destroyCookie(null, 'token')
    destroyCookie(null, 'role')
    handleLogin()
    return (<></>)
  }

  const handleDeleteItem = async (productId) => {
    try {
      const res = await fetch(`${baseUrl}api/cart`, {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          productId
        })
      })
      const data = await res.json();
      router.push('/cart');
      toast.success('Item removed from Cart!', { position: toast.POSITION.TOP_RIGHT })
    }
    catch (error) {
      toast.error("Oops! Unable to delete", { position: toast.POSITION.TOP_RIGHT });
    }
  }

  const cartItems = products.map((item) => {
    return (
      <div style={{
        display: 'flex',
        margin: '30px',
        padding: '20px',
        borderBottom: '1px solid blue',
        justifyContent: 'space-around'
      }} key={item._id}>
        <img src={item.product.mediaUrl} width="100px" height="100px" />
        <p>{item.product.name} - <span> ₹ {item.product.price}</span></p>
        <DeleteIcon style={{ color: "red", fontSize: 40 }} onClick={() => handleDeleteItem(item.product._id)} />
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
      <h2>Cart Items
        <img
          src='/cart.svg'
          alt=" Trolley icon"
          width='auto'
          height='70px'
        />
      </h2>
      {cartItems}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx) 
  if (!token) {
    const { res } = ctx
    res.writeHead(302, { Location: "/login" })
    res.end()
  }

  const res = await fetch(`${baseUrl}api/cart`,{
    headers: {
      'Authorization' : token
    }
  })
  const products = await res.json() 
  if(products.error){
    return {
      props:{ error:products.error }
    }
  }
  // console.log("products", products) 
  return {
    props: { products, token }
  }
}
 
export default Cart;