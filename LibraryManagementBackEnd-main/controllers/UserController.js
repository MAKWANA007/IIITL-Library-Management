const UserSchema = require('../models/Users.db')
const bcrypt = require("bcrypt")

const addUser = async (req, res) => {
    try {
        if (req.userExists) {
            res.send({
                status: 0,
                message: "An account already exists with this email address"
            })
            return
        }

        const { email, password } = req.body
        const hashedPwd = await bcrypt.hash(password, 10);

        const user = await UserSchema.create({
            email: email,
            password: hashedPwd
        })
        res.status(200).send({
            status: 1,
            message: "User registered successfully. Please login"
        })
    } catch (err) {
        console.log(err.message)
    }
}

const loginUser = async (req, res) => {
    try {
        const { email } = req.body
        const user = await UserSchema.findOne({ email: email })
        res.status(200).send({
            status: 1,
            message: "Logged in successfully",
            userData: {
                name: user.name,
                email: user.email
            }
        })
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = {
    addUser,
    loginUser
}