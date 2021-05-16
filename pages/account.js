import { parseCookies } from 'nookies'
import baseUrl from '../utils/baseUrl'
import Collapsible from "react-collapsible";

const Account = ( { orders } ) => {
    const cookie = parseCookies()
    const user = cookie.role ? cookie.role : ""
    if (orders.length == 0) {
        return (
            <div
                    style={{
                      border: "2px solid blue",
                      fontSize: "20px",
                      margin: "25px",
                      cursor : 'pointer',
                      padding : '20px',
                      color: 'red'
                    }}
            ><h3>You don't have any Order History !</h3></div>
        )
    }
    
    const OrderHistory = () => {
        return (
            orders.map((item) => {
                return (
                  <div
                    style={{
                      border: "2px solid blue",
                      fontSize: "20px",
                      margin: "25px",
                      cursor : 'pointer',
                      padding : '20px',
                      color: 'red'
                    }}
                    key={item._id}
                  >
                    <Collapsible trigger={item.createdAt}>
                        {
                            item.products.map((pitem) => {
                                return (
                                  <p style={{ margin: "10px" }} style={{ color: 'green', margin:'10px'}} key={pitem._id}>
                                    {pitem.product.name} - ₹{pitem.product.price}
                                  </p>
                                );
                            })
                        }
                        <h4>Total price : ₹{item.total} </h4>
                    </Collapsible>
                  </div>
                );
            })
        );
    }

    return (
        <div style={{
            fontFamily: "Merriweather Sans, sans-serif",
            padding: "50px",
            marginLeft: 'auto',
            marginRight: 'auto',
            width: "80%",
            textAlign: "center",
        }}>
            <h2>Your Order History
                <img
                    src='/cart.svg'
                    alt=" Trolley icon"
                    width='auto'
                    height='70px'
                />
            </h2>
            { OrderHistory() }
        </div>
    );
}
 
export async function getServerSideProps(ctx){
    const { token } = parseCookies(ctx)
    if (!token) {
        const { res } = ctx
        res.writeHead(302, { Location: "/login" })
        res.end()
    }

    const res = await fetch(`${baseUrl}api/order`, {
        headers: {
            'Authorization': token
        }
    })

    const data = await res.json()

    return {
        props: {
            orders : data
        }
    }
}

export default Account;