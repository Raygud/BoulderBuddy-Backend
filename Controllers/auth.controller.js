import UserModel from '../Models/user.model.js'
import dotevn from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
dotevn.config()
import { Sequelize } from "sequelize"
const Op = Sequelize.Op;

class AuthController{
    constructor(){
        console.log("Running authentification")
    }
    
    login = async (req, res) => {
        console.log(req.body);
        const {username, password} = req.body;

        if(username && password){
            const data = await UserModel.findOne({
                attributes:['id','Firstname','Lastname','Username' ,'Password'],
                where: {
                    [Op.or]: [
                        { Username: username },
                        { Email: username }]}        
            })
            
            console.log(data)

            if(data === null){
                return res.sendStatus(404)
               }

            

            bcrypt.compare(password, data.Password, (err,result) => {
                if(result){
                    console.log("PENIS")
                    console.log(data)
                    const payload = {
                        Id : data.id,
                        Firstname : data.Firstname,
                        Lastname : data.Lastname,
                        Username : data.Username,
                        Email : data.Email}
                    const token = jwt.sign(payload, process.env.PRIVATE_KEY)
                    return res.json({ token : token})
                }else{
                    res.sendStatus(401)
                }
            })
        }else{
            res.sendStatus(418)
        }

    }
    
    protected = async (req, res) =>{
        console.log("hey")
        res.sendStatus(200)
    }
}

export {AuthController}