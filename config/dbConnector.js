import mongoose from "mongoose";
import 'dotenv/config'


const dbConnertor = async () => {
    try{
        mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("The DB has been connected!"))
    }
    catch(err){
        console.log(err);
    }
}

export default dbConnertor