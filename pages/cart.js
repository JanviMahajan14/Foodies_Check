import baseUrl from '../utils/baseUrl'
import { parseCookies, destroyCookie  } from "nookies";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const handleLogin = async () => {
  const router = useRouter();
  router.push('/login');
}

const Cart = ({ error }) => {

  if(error){
    toast.error(error, { position: toast.POSITION.TOP_RIGHT });
    destroyCookie(null, 'token')
    destroyCookie(null, 'role')
    handleLogin()
  }

  return (
    <h1>Cart Page</h1>
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
  console.log("products", products) 
  return {
    props: { products }
  }
}
 
export default Cart;