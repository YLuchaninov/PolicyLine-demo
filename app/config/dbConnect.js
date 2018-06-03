import mongoose from 'mongoose';
import config from '../config';

let connection; // for future using
mongoose.Promise = global.Promise;

const connectToDb = async () => {
    try {
        connection = await mongoose.connect(config.database.url);
    }
    catch (err) {
        console.log(err);
    }
};

export default connectToDb;