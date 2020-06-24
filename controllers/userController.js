const { User } = require("../model/userSchema");

const registerController = async (req, res) => {
    try {
        const { data } = req.body;
        const { email } = data;
        const userList = await User.find({ email });
        if (!userList.length) {
            const result = await User.create(data);
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

module.exports = {
    registerController
}