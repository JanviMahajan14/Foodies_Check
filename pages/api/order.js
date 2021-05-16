import Order from '../../models/order'
import jwt from 'jsonwebtoken'

export default async (req, res) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(400).send({ error: "you must log in" })
    }

    try {
        const { _id } = jwt.verify(authorization, "pizza1234")
        const orders = await Order.find({ user: _id }).populate("products.product")
        res.send(orders)
    }
    catch (error) {
        return res.status(400).send({ error })
    }
}