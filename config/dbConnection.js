const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`Database Connected, Host: ${connect.connections[0].host}, Name: ${connect.connections[0].name}`);
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDb;