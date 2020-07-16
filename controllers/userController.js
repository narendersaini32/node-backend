const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require("../model/userSchema");

const registerController = async (req, res) => {
    try {
        const { data } = req.body;
        const { email, password } = data;
        const encPass = await bcrypt.hash(password, 10);
        const userList = await User.find({ email });
        if (!userList.length) {
            const result = await User.create({ email, password: encPass });
            res.send({
                success: true,
                message: "User Addeed successfully",
                result
            });
        } else {
            res.send({
                success: false,
                message: "Email already used!"
            });
        }
    }
    catch (error) {
        res.send("An error is occurred. Please Try again.")
    }

}

const loginController = async (req, res) => {
    try {
        const { data } = req.body;
        const { email, password } = data;
        const userList = await User.find({ email });

        if (userList.length) {
            const { password: storedPass, email } = userList[0];
            const result = await bcrypt.compare(password, storedPass);
            const token = jwt.sign({ email }, 'secretKey123456');
            res.send({
                success: result,
                message: result ? "Login successfully" : "Password not correct",
                token
            });
        } else {
            res.send({
                success: false,
                message: "User not found"
            });
        }

    } catch (error) {
        console.log("loginController -> error", error)
        res.send("An error is occurred. Please Try again.")
    }

}
const checkUserController = async (req, res) => {
    try {
        const { token } = req.body;
        const user = jwt.verify(token, 'secretKey123456');
        res.send({
            success: true,
            message: "User found",
            user
        });
    } catch (error) {
        res.send("An error is occurred. Please Try again.")
    }

}
module.exports = {
    registerController,
    loginController,
    checkUserController
}