import mongoose from "mongoose";
import {Todos} from '../utils/types/todos'

const todoSchema = new mongoose.Schema<Todos>({
    title: {type: String, required: true},
    description: {type: String, required: false},
    completed: {type: Boolean, default: false},
    userId:{type: mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    deletedAt: {type: Boolean, default: false},
    alarmAt:{type:String, default:null}
})

export default mongoose.model<Todos>("Todo", todoSchema)