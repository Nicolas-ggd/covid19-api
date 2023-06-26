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

const getOnlineUserList = async (req, res) => {
    try {
        const onlineUserList = await User.find({ online: true });

        return res.status(200).json(onlineUserList);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "can't get online user list" });
    }
};

module.exports = {
    getUserList,
    getOnlineUserList
};