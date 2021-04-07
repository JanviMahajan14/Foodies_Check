import initDB from '../../utils/initDB'

initDB()

export default (req, res) => {
    res.send({ message: "hello sexy" })
}