import jwt from 'jsonwebtoken'
import Cart from '../../models/cart'

export default async (req, res) => {
	const { authorization } = req.headers
	if(!authorization){
		return res.status(400).send({error: "you must log in"})
	}

	try {
		const { _id } = jwt.verify(authorization, "pizza1234")
		const cart = await Cart.findOne({ user: _id })
		res.send(cart.products)
	}
	catch(error){
		return res.status(400).send({ error })
	}
}
