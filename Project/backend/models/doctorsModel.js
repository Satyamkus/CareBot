import mongoose from "mongoose";

const doctorSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    image:{type:String,default:"https://cdn-icons-png.flaticon.com/512/9187/9187532.png"},
    speciality:{type:String,default:"General Physician"},
    degree:{type:String,default:"MBBS"},
    experience:{type:String,default:"2 years"},
    about:{type:String,default:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque."},
    available:{type:Boolean,default:true},
    fees:{type:Number,default:500},
    address:{type:Object,default:{street:"123 Main St", city:"Anytown", state:"Anystate", zip:"12345"}},
    date:{type:Number,default:Date.now()},
    slots_booked:{type:Object,default:{}}
},{minimize:false})

const doctorModel=mongoose.models.doctor || mongoose.model('doctor',doctorSchema)

export default doctorModel

