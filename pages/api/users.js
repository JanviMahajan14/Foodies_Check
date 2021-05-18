import jwt from 'jsonwebtoken'
import User from '../../models/user';

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await fetchUsers(req, res)
            break
        case "PUT":
            await changeRole(req, res)
            break
    }
}

const fetchUsers = async(req, res) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(400).send({ error: "you must log in" })
    }

    try {
        const { _id } = jwt.verify(authorization, "pizza1234")
        const user = await User.find({ _id: { $ne: _id } })
        res.send(user)
    }
    catch (error) {
        return res.status(400).send({ error })
    }
}

const changeRole = async(req, res) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(400).send({ error: "you must log in" })
    }

    try {
        const { _id, role } = req.body
        const newRole = role=="user" ? "admin" : "user"
        const user = await User.findOneAndUpdate({ _id },{ role : newRole},{ new : true })
        res.send(user)
    }
    catch (error) {
        return res.status(400).send({ error })
    }
}