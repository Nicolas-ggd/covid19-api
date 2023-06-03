const User = require('../../models/User');

const userLogout = async (req, res) => {
    const cookies = req.cookies;

    try {
        if (!cookies?.jwt) {
            return res.status(204).json({ message: "No content" });
        }

        const refresh_token = cookies.jwt;
        const authUser = await User.find({ refresh_token });

        if (!authUser) {
            res.clearCookie(
                'jwt',
                {
                    httpOnly: true,
                    sameSite: 'None',
                    secure: true
                }
            );
            return res.status(204).json({ "message": "No content, no problesms :)" });
        }

        await User.updateOne(
            { refresh_token: refresh_token },
            {
                $set: {
                    refresh_token: ''
                }
            }
        );

        res.clearCookie(
            'jwt',
            {
                httpOnly: true,
                sameSite: 'None',
                secure: true
            }
        );

        res.status(204).json({ message: "No content" });
    } catch (error) {
        return res.status(400).json(error);
    }
};

module.exports = {
    userLogout
};