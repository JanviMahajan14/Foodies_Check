import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import baseUrl from '../utils/baseUrl';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 600,
        fontSize: '40px'
    },
});

function UserRoles() {
    const classes = useStyles();
    const [ users, setUsers ] = useState([])
    const { token } = parseCookies();
    useEffect(() => {
        fetchUser()
    },[])

    const fetchUser = async () => {
        const res = await fetch(`${baseUrl}api/users`, {
            method: "GET",
            headers: {
                'Authorization' : token
            }
        })
        const data = await res.json();
        setUsers(data)
    }

    const handleRole = async (_id, role) => {
        const res = await fetch(`${baseUrl}api/users`, {
            method: "PUT",
            headers: {
                'Authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id,
                role
            })
        })
        const data = await res.json();
        const updatedUsers = users.map((user) => {
            if (user.role != data.role && user.email==data.email) {
                return data
            }
            else {
                return user
            }
        })
        setUsers(updatedUsers)
    }

    return (
        <>
        <h2 style={{ margin: '20px'}}>User Roles</h2>
        <TableContainer component={Paper} >
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><b>Name</b></TableCell>
                        <TableCell align="center"><b>Email</b></TableCell>
                        <TableCell align="right"><b>Role</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="center">{row.email}</TableCell>
                            <TableCell style={{ cursor : 'pointer'}} align="right" onClick={() => handleRole(row._id,row.role)}>{row.role}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}

export default UserRoles