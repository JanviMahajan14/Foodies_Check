import baseUrl from '../utils/baseUrl'
import { parseCookies } from "nookies";

const Cart = () => {
    return (
        <h1>Cart Page</h1>
    );
}

export async function getserverSideProps (ctx){
  const (token) = parseCookies(ctx) 
  const res = await fetch(`${baseUrl}/api/cart`,{
    headers: {
      "Authorization":token
    }
  })
  const products = await res.json() 
  console.log("products", products) 
  return {
    props: (products}
  }
}
 
export default Cart;