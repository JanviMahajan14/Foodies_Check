import jwt from 'jsonwebtoken'
import Cart from '../../models/cart'

export default async (req, res) => {
	switch (req.method) {
		case "GET":
			await fetchUserCart(req, res)
			break
		case "PUT":
			await addProductToCart(req, res)
			break
		case "DELETE":
			await deleteProductFromCart(req,res)
	}
}


const fetchUserCart = async (req,res) => {
	const { authorization } = req.headers
	if (!authorization) {
		return res.status(400).send({ error: "you must log in" })
	}

	try {
		const { _id } = jwt.verify(authorization, "pizza1234")
		const cart = await Cart.findOne({ user: _id }).populate("products.product")
		res.send(cart.products)
	}
	catch (error) {
		return res.status(400).send({ error })
	}
}


const addProductToCart = async (req, res) => {
	const { authorization } = req.headers
	if (!authorization) {
		return res.status(400).send({ error: "you must log in" })
	}

	try {
		const { quantity, productId } = req.body;
		const { _id } = jwt.verify(authorization, "pizza1234")
		const cart = await Cart.findOne({ user: _id })
		const newProduct = {
			quantity,
			product: productId
		}
		await Cart.findOneAndUpdate({ _id: cart._id }, {
			$push: {
				products : newProduct
			}
		})
		res.send({ message: "Product added successfully!"})
	}
	catch (error) {
		return res.status(400).send({ error })
	}
}

const deleteProductFromCart = async (req,res) => {
	const { authorization } = req.headers
	if (!authorization) {
		return res.status(400).send({ error: "you must log in" })
	}

	try {
		const { productId } = req.body
		const { _id } = jwt.verify(authorization, "pizza1234")
		const cart = await Cart.findOne({ user: _id })
		const data = await Cart.findOneAndUpdate({ _id: cart._id }, {
			$pull: {
				products: {
					product : productId
				}
			},
		}, { new : true }).populate('products.product')
		res.send(data)
	}
	catch (error) {
		return res.status(400).send({ error })
	}
}