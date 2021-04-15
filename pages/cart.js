import { parseCookies } from "nookies";

const Cart = () => {
    return (
        <h1>Cart Page</h1>
    );
}

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
  }

  return {
    props: {},
  };
}
 
export default Cart;