const User = require('../../models/User');

const getUserList = async (req, res) => {
    try {
        const userList = await User.find({})

        return res.status(200).json(userList)
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Can't get User List" });
    }
};

module.exports = {
    getUserList
};