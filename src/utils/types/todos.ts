import { Document, Types } from "mongoose"

export interface Todos extends Document {
    userId:Types.ObjectId
    title:string
    completed:boolean
    id:string
    createdAt:string
    updatedAt:string
    deletedAt:boolean
    description:string
    alarmAt:string
}