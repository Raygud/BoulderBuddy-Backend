import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { request } from 'express'
dotenv.config()

const verifyToken = (req, res, next) => {
        const bearerHeader = req.headers['authorization']
    console.log(bearerHeader)
    if (typeof bearerHeader !== 'undefined') {
        const requestToken = bearerHeader.split(' ')[1]
        jwt.verify(requestToken, process.env.PRIVATE_KEY, (err, data) => {
            if (!err) {
                next()
            } else {
                res.sendStatus(403)
            }
        })
    } else {
        console.log("Weee")
        res.sendStatus(401)
    }

}
export default verifyToken;