import baseUrl from '../utils/baseUrl'
import { parseCookies } from "nookies";
import cookie from 'js-cookie'
import {useRouter} from 'next/router'

const Cart = ({error}) => {
  const router = useRouter
  if(error){
      M.toast({html:error,classes:"red"})
      cookie.remove("user")
      cookie.remove("token")
      router.push('/login')
  }

  return (
    <h1>Cart Page</h1>
  );
}

export async function getserverSideProps (ctx){
  const {token} = parseCookies(ctx) 
  if(!token){
    return {
      props: {products}
    }
  }
  const res = await fetch(`${baseUrl}/api/cart`,{
    headers: {
      "Authorization":token
    }
  })
  const products = await res.json() 
  if(products.error){
    return{
      props:{error:products.error}
    }
  }
  console.log("products", products) 
  return {
    props: {products}
  }
}
 
export default Cart;