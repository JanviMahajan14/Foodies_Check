import jwt from 'jsonwebtoken'

export default async (req,res) => {
	const {authorization} = req.headers
	if(!authorization){
		return res.status(401).json({error:"you must log in"})
	}

	try{
		const { _id} = jwt.verify(authorization,process.env.JWT_SECRET)
		 const cart = await cart.findOne ({user:_id})
		 res.status(200).json(cart.products)
	}
	catch(err){
		return res.status(401).json({error:"you must log in"})
	}
}
