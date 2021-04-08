import Link from 'next/link'
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button, IconButton} from "@material-ui/core";
import RestaurantIcon from '@material-ui/icons/Restaurant';

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
            <Link href="/signup"><a><Button color="inherit">Signup</Button></a></Link>
            <Link href="/login"><a><Button color="inherit">Login</Button></a></Link>
            <Link href="/create"><a><Button color="inherit">Create</Button></a></Link>
          </Toolbar>
        </AppBar>
      </div>
    );
}

export default Navbar;