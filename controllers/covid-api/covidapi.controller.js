const axios = require('axios')

const getCovidData = async (req, res) => {
    const queryData = req.query;
    const page = queryData.page ? parseInt(queryData.page) : 1;
    const limit = queryData.limit ? parseInt(queryData.limit) : 7;
    const search = queryData.search || '';
  
    try {
      const response = await axios.get(
        `https://corona.lmao.ninja/v2/countries?page=${page}&limit=${limit}`
      );
      const data = response.data;

      const filteredData = data.filter((item) =>
        item.country.toLowerCase().includes(search.toLowerCase())
      );
  
      const startIdx = (page - 1) * limit;
      const endIdx = startIdx + limit;
  
      const chunkData = filteredData.slice(startIdx, endIdx);
  
      return res.status(200).json(chunkData);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Can't get covid data." });
    }
};

module.exports = {
    getCovidData
}