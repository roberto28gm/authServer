const mongoose = require("mongoose");


const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.CONN_STR, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Database online');

    } catch (error) {
        console.log(error);
        throw new Error('Database Error');
    }
}


module.exports = {
    dbConnection
}