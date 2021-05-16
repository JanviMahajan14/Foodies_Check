import Stripe from 'stripe'
import { v4 as uuidv4 } from 'uuid';
import Cart from '../../models/cart'
import Order from '../../models/order'
import jwt from "jsonwebtoken";

const stripe = Stripe('sk_test_51IqxVLSI1jyc9zs6KzS7nosyeRU3msAyaJrlAgeEIOjUCpZrDq1NZs1LAat09lyVI0SBV0I8ktSkAY7MjTgMnAkT00ih9zPDkC')

export default async (req, res) => {
    const { paymentInfo } = req.body;
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(400).send({ error: "you must log in" })
    }

    try {
        const { _id } = jwt.verify(authorization, "pizza1234")
        const cart = await Cart.findOne({ user: _id }).populate("products.product")
        let price = 0;
        cart.products.forEach((item) => {
            price = price + item.product.price
        })
        const prevCustomer = await stripe.customers.list({
            email : paymentInfo.email
        })

        const isExistingCustomer = prevCustomer.data.length > 0
        let newCustomer
        if (!isExistingCustomer) {
            newCustomer = await stripe.customers.create({
                email: paymentInfo.email,
                source: paymentInfo.id
            })
        }

        await stripe.charges.create(
            {
                currency: "INR",
                amount: price * 100,
                receipt_email: paymentInfo.email,
                customer: isExistingCustomer ? prevCustomer.data[0].id : newCustomer.id,
                description: `you purchased a product | ${paymentInfo.email}`
            }, {
            idempotencyKey: uuidv4()
        }
        )
        await new Order({
            user: _id,
            email: paymentInfo.email,
            total: price,
            products: cart.products
        }).save()

        await Cart.findOneAndUpdate(
            { _id: cart._id },
            { $set: { products: [] } }
        )
        res.status(200).json({ message: "payment was successful" })

    }
    catch (error) {
        return res.status(400).send({ error })
    }
}