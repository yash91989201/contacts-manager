const mongoose=require('mongoose');
const contactSchema=new mongoose.Schema(
    {
        userId:Number,
        isStarred:Boolean,
        contactName:String,
        contactNumber:Number,
        contactEmail:String,
        contactType:String,
        contactImage:String
    }
);

const Contact=new mongoose.model('contact',contactSchema);
module.exports = Contact;