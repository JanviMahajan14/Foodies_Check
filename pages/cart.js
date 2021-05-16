import baseUrl from '../utils/baseUrl'
import { Button } from '@material-ui/core'
import { parseCookies, destroyCookie } from "nookies";
import DeleteIcon from '@material-ui/icons/Delete';
import StripeCheckout from "react-stripe-checkout";
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

  const handleCheckout = async (paymentInfo) => {
    const res = await fetch(`${baseUrl}api/payment`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        paymentInfo
      })
    })
    const data = await res.json();
    console.log(data)
    toast.success("Payment Succesfull!", {
       position: toast.POSITION.TOP_RIGHT,
    });
    await router.push("/account");
  }

  let price = 0;
  const cartItems = products.map((item) => {
    price = price + item.product.price
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
      <div>
        <h3> Total Price : {price}</h3>
        {products.length != 0 &&
          <StripeCheckout
            name="Foodies Check."
            description="Food items"
            ComponentClass="div"
            amount={price * 100}
            shippingAddress={true}
            billingAddress={true}
            zipCode={true}
            currency="INR"
            stripeKey="pk_test_51IqxVLSI1jyc9zs6odTKQr3GoGl76rlPgOxqvoJm6zHBUDYiz0YR3P6I3I8qOHbgBpL5JBiI7fTmuA629wr9SDYO008EuZvwpi"
            locale="en"
            token={(paymentInfo) => handleCheckout(paymentInfo)}
          >

            <Button variant="contained" color="secondary" style={{
              color: "white",
              fontFamily: "Merriweather Sans, sans-serif",
              marginTop: "10px",
            }}> Checkout </Button>
          </StripeCheckout >
        }
      </div>
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