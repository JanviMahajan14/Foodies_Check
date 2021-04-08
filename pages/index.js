import { Card, Typography, CardContent, Icon, Button } from '@material-ui/core'
import AdjustIcon from '@material-ui/icons/Adjust'
import baseUrl from '../utils/baseUrl'

const Home = ({ items }) => {

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
            2
            <Button className="btn2" color="primary" >
              <i className="fa fa-plus-circle fa-lg" aria-hidden="true" />
            </Button>
          </div>
          <Button variant="contained" style={{
            backgroundColor: "#039be5",
            color: "white",
            fontFamily: "Merriweather Sans, sans-serif",
            marginTop: "10px",
            display: "block",
            width:"100%"
          }}>
          Add
          </Button>
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
