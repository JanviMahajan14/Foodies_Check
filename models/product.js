import moongoose from 'mongoose'

const productSchema = new moongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required:true
    },
    isVeg: {
        type: Boolean,
        required: true
    },
    mediaUrl: {
        type: String,
        required: true
    }
})

export default moongoose.models.Product || moongoose.model('Product', productSchema);