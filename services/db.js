const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/eventApp',{
    useNewUrlParser:true,
    useUnifiedTopology:true 
})
const Event = mongoose.model('Event',{
    uid: Number,
    username: String,
    password: String,
    evnts:Array 
})
module.exports={
    Event
}