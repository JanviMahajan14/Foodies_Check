import { useRouter } from 'next/router'
import { Card, Typography, CardContent, Icon, Button } from '@material-ui/core'
import AdjustIcon from '@material-ui/icons/Adjust'
import baseUrl from '../utils/baseUrl'
import { parseCookies } from "nookies";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();


const addToCart = async ( productId ) => {
  try {
    const { token } = parseCookies();
    const res = await fetch(`${baseUrl}api/cart`, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : token
      },
      body: JSON.stringify({
        quantity: 1,
        productId
      })
    })
    const data = await res.json();
    toast.success('Item added to Cart!', { position: toast.POSITION.TOP_RIGHT })
  }
  catch (error) {
    toast.error("Unable to add in cart", { position: toast.POSITION.TOP_RIGHT });
  }
}

const Home = ({ items }) => {
  const { token } = parseCookies();
  const router = useRouter();
  const user = token ? true : false  

  const itemList = items.map((item) => {
    return (
      <Card key={item._id} style={{
        border: "1px solid #bdbdbd",
        boxShadow:"none",
        maxWidth: 250,
        margin: "50px",
      }}>
        <CardContent style={{ textAlign: "center" }}>
          <img src={item.mediaUrl} height="200" width="100%" />
          <Typography
            variant="h5"
            component="h2"
            style={{ fontFamily: "Merriweather Sans, sans-serif" }}>
            {item.name}
          </Typography>
          <div style={{ marginTop: "10px" }}>
            {item.isVeg === true
              ?
              <AdjustIcon style={{ color: "green", marginBottom: "-5px" }}/>
              :
              <AdjustIcon style={{ color: "red" }} />
            }
            <span> ₹ {item.price}</span>
          </div>
          <div style={{ marginTop: "10px" }}>
            <Button className="btn2" color="primary" >
              <i className="fa fa-minus-circle fa-lg" aria-hidden="true" />
            </Button>
            1
            <Button className="btn2" color="primary" >
              <i className="fa fa-plus-circle fa-lg" aria-hidden="true" />
            </Button>
          </div>
          {user
            ?
            <Button variant="contained" style={{
              backgroundColor: "#039be5",
              color: "white",
              fontFamily: "Merriweather Sans, sans-serif",
              marginTop: "10px",
              display: "block",
              width: "100%"
            }} onClick={(e)=>{ addToCart(item._id) }}> Add </Button>
            :
              <Button variant="contained" style={{
                backgroundColor: "#039be5",
                color: "white",
                fontFamily: "Merriweather Sans, sans-serif",
                marginTop: "10px",
                display: "block",
                width: "100%"
              }} onClick={(e)=>{ router.push('/login') }}> Login to Shop! </Button>
          }
        </CardContent>
      </Card>
    )
  })

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-around",
      flexWrap: "wrap",
      flexGrow: 1,
    }}>
      {itemList}
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${baseUrl}api/products`)
  const data = await res.json()
  return {
    props: {
      items:data
    }
  }
}

export default Home;
