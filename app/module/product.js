const costumeError = require('../handlers/errorHandler');
const model = require('../model');


const getRetention = async (req, res) => {
    const type = req?.query?.type;
    let result;
   
    if(!["1M.sub.gym.20","LT.5K.30"].includes(type) || !type) return costumeError("E05C400");
    
    try {
        result = await model.getRetention(type);
    }catch(e) {
        return costumeError("E01C503");
    }
    
    res.status(200).json({success: true, statusCode: 200, data: result});
}

const getRevenue = async (req, res) => {
    const type = req?.query?.type;
    let result;
    
    if(!["1M.sub.gym.20","LT.5K.30"].includes(type) || !type) return costumeError("E05C400");    

    try {
        result = await model.getRevenue(type);
    }catch(e) {
        return costumeError("E01C503");
    }
    
    res.status(200).json({success: true, statusCode: 200, data: result});
}

const setData = async (req,res) => {
    const data = req?.body?.data;
    
    if(!data || !Array.isArray(data) || !data.length) return costumeError("E05C400");

    await model.insertMany(data);

    res.status(200).json({success: true, statusCode: 200});
}

module.exports =  {
    getRetention,
    getRevenue,
    setData
}