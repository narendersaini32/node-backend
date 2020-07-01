const bcrypt = require('bcrypt');

const { User } = require("../model/userSchema");

const registerController = async (req, res) => {
    try {
        const { data } = req.body;
        const { email,password } = data;
        const encPass = await bcrypt.hash(password, 10);
        const userList = await User.find({ email });
        if (!userList.length) {
            const result = await User.create({email,password:encPass});
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

const loginController = async (req, res) =>{
    try{
        const { data } = req.body;
        const { email,password } = data;
        const userList = await User.find({ email });

        if(userList.length){
            const {password:storedPass} = userList[0];
            const result = await bcrypt.compare(password, storedPass);
            res.send({
                success: result,
                message: result ? "Login successfully" : "Password not correct"
            });
        }else{
            res.send({
                success: false,
                message: "User not found"
            });
        }

    }catch(error){
        res.send("An error is occurred. Please Try again.")
    }

}
module.exports = {
    registerController,
    loginController
}