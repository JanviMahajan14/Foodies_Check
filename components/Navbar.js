import Link from 'next/link'
import { useRouter } from 'next/router'
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button, IconButton} from "@material-ui/core";
import RestaurantIcon from '@material-ui/icons/Restaurant';
import { parseCookies, destroyCookie } from "nookies";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
    const classes = useStyles();
    const router = useRouter();
    const { token,role } = parseCookies();
    const user = token ? true : false
  
    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ background: "#1565c0" }}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
            <RestaurantIcon />
            </IconButton>
            <Typography
              variant="h5"
              className={classes.title}
              style={{ fontFamily: "Merriweather Sans, sans-serif", flexGrow: "1" }}
            >
            <Link href="/"><a>Foodies Check</a></Link>
            </Typography>
            {user
              ?
              <>
                <Link href="/account"><a><Button color="inherit">Account</Button></a></Link>
                <Link href="/cart"><a><Button color="inherit">Cart</Button></a></Link>
                {(role == "admin" || role == "root") &&
                  <>
                    <Link href="/add_item"><a><Button color="inherit">Add Items</Button></a></Link>
                    <Link href="/delete_item"><a><Button color="inherit">Delete Items</Button></a></Link>
                  </>
                }
                <Button color="inherit" onClick={(e) => {
                  destroyCookie(null, 'token')
                  destroyCookie(null, 'role')
                  router.push('/login')
                }}>Logout</Button>
              </>
              :
              <>
                <Link href="/signup"><a><Button color="inherit">Signup</Button></a></Link>
                <Link href="/login"><a><Button color="inherit">Login</Button></a></Link>
              </>
            }
          </Toolbar>
        </AppBar>
      </div>
    );
}

export default Navbar;