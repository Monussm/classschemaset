const express=require("express");
const app=express();
const port=process.env.port || 3000
const path=require("path");
const hbs=require("hbs")
const mypublic=path.join(__dirname,"../public");
const mypartials=path.join(__dirname,"../partials");
app.use(express.urlencoded({extended:false}));
app.use(express.static(mypublic));
app.set("view engine","hbs")
hbs.registerPartials(mypartials);
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
await mongoose.connect('mongodb+srv://monug1513:monu123@mangement.4fzmmsn.mongodb.net/');
}
const teacherSchema = new mongoose.Schema({
    firstname: String,
    lastname:String,
    emailid:String,
    mobilenumber:Number,
    password:String,
    confirmpassword:String,
    newpassword:String
});
const Teacher = mongoose.model('Teacher',teacherSchema);

app.get("/",(req,res)=>{

res.render("index")

})
app.get("/teachersign",(req,res)=>{
res.render("teachersign")
})
app.post("/teachersign",async(req,res)=>{ 
const emailid=req.body.emailid
const password=req.body.password
const check=await Teacher.findOne({emailid})
console.log(check)
if(check==null){
res.send("emailid not found")

}
else{

  if(check.emailid===emailid){
    if(check.password==password){
    
    res.send("login")                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    
    
    }
    else{
    
    res.send("password not match")
    
    
    
    }
    
    
    }
    else{
    
    
    res.send("id not matched")
    
    
    }
    
    


}

})
app.get("/teachersignup",(req,res)=>{

res.render("teachersignup")
})

app.post("/teachersignup",async(req,res)=>{

const password=req.body.password
const confirmpassword=req.body.confirmpassword
if(password===confirmpassword){
res.send("Passowrd and confirmpassowrd Match")
console.log("Match")


}
else{
res.send("Password and confirmpassowrd not match")
console.log("Not match")


}




const teacherinfo = new Teacher({ 
  firstname:req.body.firstname,
  lastname:req.body.lastname,
  emailid:req.body.emailid,
  mobilenumber:req.body.mobilenumber,
  password:req.body.password,
  confirmpassword:req.body.confirmpassword,
  newpassword:req.body.newpassword
});
// teacherinfo.save()
// res.send("Successful")
console.log(teacherinfo)

})

app.get("/teacherforget",(req,res)=>{

res.render("teacherforget")


})
app.post("/teacherforget",async(req,res)=>{
  const emailid=req.body.emailid
  const newpassword=req.body.newpassword
  const data=await Teacher.findOne({emailid})
  if(data==null){

    res.send("email id not found")

  }
  else
  {
    if(data.emailid==emailid){
    const update=await Teacher.findOneAndUpdate({emailid},{$set:{password:newpassword}})
    console.log(update)
  
    }
    else{
  
  
  res.send("na bhail")
  
    }
  }
  
})













// adminimformation here
app.get("/adminsignup",(req,res)=>{
res.render("adminsignup")
})

app.get("/adminlogin",(req,res)=>{

res.render("adminlogin")

})
app.get("/adminforget",(req,res)=>{

res.render("adminforget")

})

app.post("/adminlogin",(req,res)=>{
res.render("adminsignup")
})








app.listen(port,(req,res)=>{

console.log("Running on Port 3000")



})