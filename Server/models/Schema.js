import mongoose from 'mongoose'

const fileSchema = new mongoose.Schema({
    path:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    downCount:{
        type:Number,
        required:true,
        default:0
    }
})

const FileSchema=mongoose.model('file',fileSchema)

export default FileSchema