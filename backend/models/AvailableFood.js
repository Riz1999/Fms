const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    month:{
        type:String,
        required:true
    },
    week:{type:Number},
    days:{
        monday:{
            breakfast:{ type:Array},
            lunch:{type:Array},
            dinner:{type:Array},
        },
        tuesday:{
            breakfast:{ type:Array},
            lunch:{type:Array},
            dinner:{type:Array},
        },
        wednesday:{
            breakfast:{ type:Array},
            lunch:{type:Array},
            dinner:{type:Array},
        },
        thursday:{
            breakfast:{ type:Array},
            lunch:{type:Array},
            dinner:{type:Array},
        },
        friday:{
            breakfast:{ type:Array},
            lunch:{type:Array},
            dinner:{type:Array},
        },
        saturday:{
            breakfast:{ type:Array},
            lunch:{type:Array},
            dinner:{type:Array},
        },
        sunday:{
            breakfast:{ type:Array},
            lunch:{type:Array},
            dinner:{type:Array},
        }
    }
})
const AvailableFood = mongoose.model("AvailableFood",foodSchema)
module.exports = AvailableFood