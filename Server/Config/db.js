import mongoose from "mongoose";

const Mongodb=async()=>{
  

mongoose.connect('mongodb://localhost:27017/fileShare').then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Connection error:', error.message);
});

}
export default Mongodb