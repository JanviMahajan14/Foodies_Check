import initDB from '../../utils/initDB'
import Product from '../../models/product'

initDB()

export default async(req, res) => {
    switch (req.method) {
        case "GET":
            await getAllProducts(req,res)
            break
        case "POST":
            await postProduct(req,res)
            break
        case "DELETE":
            await deleteProduct(req, res)
            break
    }
}

const getAllProducts = async(req,res) => {
    try {
        const items = await Product.find()
        res.send(items)
    }
    catch (error) {
        res.statusCode = 400;
        res.send({ error: error.message })
    }
}

const postProduct = async(req,res) => {
    try {
        const { name, price, isVeg, mediaUrl } = req.body
        if (!name || !price || !isVeg || !mediaUrl) {
            return res.status(400).send({ error: "Please fill all the fields" })
        }

        const item = new Product({
            name,
            price,
            isVeg,
            mediaUrl,
        })
        await item.save()
        res.send(item);
    }
    catch (error) {
        res.statusCode = 400;
        res.send({ error: error.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const item = await Product.findOneAndDelete({ name : req.body.name })
        if (!item) {
            return res.status(400).send({ error: "No such item available" })
        }
        res.send(item)
    }
    catch (error) {
        res.statusCode = 400;
        res.send({ error: error.message })
    }
}