const Contact = require('../../utils/contactMe');

const createContact = async (req, res) => {
    const { contactType, text, email } = req.body;

    try {
        await Contact.sendContactInfo('ggdnicolas@gmail.com', email, contactType, text)

        return res.status(200).json({ message: "Contact information send succesfuly." });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Can't send contact information" });
    }
};

module.exports = {
    createContact
}