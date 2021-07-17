const express=require('express');
const session =require('express-session');
const cors =require('cors');
const dataService=require('./services/data.service');
const app=express();
app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}))
app.use(session({
    secret:'randomsecurestring',
    resave:false,
    saveUninitialized:false
}))
app.use(express.json())
app.use((req,res,next)=>{
    console.log("middleware")
    next();
})
// const authMiddleware =(req,res,next)=>{
//     if(!req.session.currentUser){
//         return res.json({
//             statusCode:401,
//             status:false,
//             message:"please log in"
//         })
//      }
//      else{
//          next();
//      }
//     }
    
app.get('/',(req,res)=>{
    res.send("This is a get method")
})
app.post('/register',(req,res)=>{
   dataService.register(req.body.uid,req.body.uname,req.body.pswd)
   .then(result=>{
    res.status(result.statusCode).json(result)
    // res.status(200).send("success")
   })
});
app.post('/login',(req,res)=>{
    dataService.login(req,req.body.uid,req.body.pswd)
    .then(result=>{
        res.status(result.statusCode).json(result) 
    })
});
 app.post('/save',(req,res)=>{
    //  console.log(req.body)
    dataService.save(req.body.uid,req.body.pswd,req.body.date,req.body.evnt)
    .then(result=>{
        res.status(result.statusCode).json(result) 
    })
});
app.post('/view',(req,res)=>{
    //  console.log(req.body)
    dataService.view(req,req.body.uid)
    .then(result=>{
        res.status(result.statusCode).json(result) 
    })
});
app.post('/deleteevnt',(req,res)=>{
    //  console.log(req.body)
    dataService.deleteevnt(req,req.body.index)
    .then(result=>{
        res.status(result.statusCode).json(result) 
    })
});
app.post('/updateevnt',(req,res)=>{
    //  console.log(req.body)
    dataService.updateevnt(req.body.uid,req.body.dates,req.body.evnts,req.body.ndate,req.body.nevnt)
    .then(result=>{
        res.status(result.statusCode).json(result) 
    })
});
app.listen(3000,()=>{
    console.log("server started at port: 3000")
})


