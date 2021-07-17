const db=require('./db');
let currentUser;
 let Details = {
    1000: { uid: 1000,  username: "userone", password: "userone",evnts:[]},
    1001: { uid: 1001, username: "usertwo", password: "usertwo",evnts:[] },
    1002: { uid: 1002, username: "userthree", password: "userthree",evnts:[]},
    1003: { uid: 1003,  username: "userfour", password: "userfour",evnts:[]}
}
const register=(uid,uname,pswd)=>{
 return db.Event.findOne({uid})
 .then(user=>{
   console.log(user);
   if(user){
    return{
      statusCode:422,
      status:false,
      message:"user exist please login"
  } 
   }
  else{
    const newUser=new db.Event({
      uid,
      username:uname,
      password:pswd,
      evnts:[]
    })
    newUser.save();
    return {
      statusCode:200,
      status:true,
      message:"successfully registerd"
   }
  }

 })
 
}
const login=(req,uid,password)=>{
  var uid = parseInt(uid);
   return db.Event.findOne({uid,password})
   .then(user=>{
    //  console.log(user);
     if(user){
      req.session.currentUser=user.uid;
      console.log(req.session.currentUser)
      return {
        statusCode:200,
        status:true,
        message:"successfully login",
        name:user.username
    }
     }
     else{
      return {
        statusCode:422,
        status:false,
        message:"Invalid credentials"
    }
     }
   })
   
   
  }
 const save=(uid,password,date,evnt)=>{
  var uid = parseInt(uid);
  return db.Event.findOne({uid,password})
  .then(user=>{
    if(user){
      user.evnts.push({date:date,evnt:evnt})
      user.save()
      return {
        statusCode:200,
        status:true,
        message:"successfully saved"
    }
    }
    else{
      return {
        statusCode:422,
        status:false,
        message:"failed to add"
    }
    }
  })
    
  }
  const view=(req,uid)=>{
    // let uid=req.session.currentUser;
    return db.Event.findOne({uid})
   .then(user=>{
     if(user){
      return {
        statusCode:200,
        status:true,
        message:user.evnts,
        // date:user.evnts.date,
        // evnt:user.evnts.evnt
        userid:user.uid
    }
     }
     else{
      return {
        statusCode:422,
        status:false,
        message:"failed to view"
    }
     }
   })
  }
 const deleteevnt=(req,index)=>{
  let uid=req.session.currentUser;
  return db.Event.findOne({uid})
  .then(user=>{
    if(user){
      user.evnts.splice(index, 1);
       user.save()
     return {
       statusCode:200,
       status:true,
       message:"successfully deleted"
   }
    }
    else{
     return {
       statusCode:422,
       status:false,
       message:"failed to delete"
   }
    }
  })
 }
 const updateevnt=(uid,dates,evnts,ndate,nevnt)=>{
   console.log(uid,dates,evnts,ndate,nevnt)
  return db.Event.findOne({uid})
  .then(user=>{
    if(user){
    let len=user["evnts"].length
    console.log(len)
    for(let i=0;i<len;i++){
      if(user["evnts"][i]["date"] == dates && user["evnts"][i]["evnt"] == evnts){
        user["evnts"][i]["date"] = ndate;
        user["evnts"][i]["evnt"] = nevnt;
        
      }
    }
    user.markModified("evnts")
    user.save();
    return {
      statusCode:200,
      status:true,
      message:"successfully updated"
  }
    }
    else{
      return {
        statusCode:422,
        status:false,
        message:"failed to update"
    }
    }

  })
 }
module.exports={
    register,
    login,
    save,
    view,
    deleteevnt,
    updateevnt
}