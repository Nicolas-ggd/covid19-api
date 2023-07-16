const axios = require('axios')

const getCovidData = async (req, res) => {
    // url = https://corona.lmao.ninja/v2/countries
        let covidData
    try {
        await axios.get('https://corona.lmao.ninja/v2/countries')
        .then((res) => {
            const data = res.data;
            covidData = data;
        })
        .catch((res) => {
            console.log(res)
        })
        
        return res.status(200).json(covidData);
    } catch (error) {
        return res.status(400).json({ message: "Can't get covid data." })
    }
};

module.exports = {
    getCovidData
}