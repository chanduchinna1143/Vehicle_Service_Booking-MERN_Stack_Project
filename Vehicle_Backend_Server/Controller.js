const signupDetails =require('./signModel')

exports.newuser=async (req,res) => {
     const {name,email,password}=req.body;
     if(!name || !email || !password){
         return res.status(403).json({error:"Fill all fields"})
     }

     const exist = await signupDetails.findOne({email});
     if(exist){
        return res.status(403).json({error:"Email is in use"})
     }else{
        const newuser=new signupDetails({name,email,password});
        await newuser.save();
        return res.send(newuser);
     } 
}

exports.login=async (req,res) => {
   const {email,password} = req.body;
   if(!email || !password){
      return res.status(403).json({error:"Fill all feilds"})
   }
   const exist = await signupDetails.findOne({email});
   if(exist){
     if(exist.password == password){
       return res.status(200).json({ message: "Login successful"})
   }else{
        return res.status(404).json({message:"password incorrect"})
   }}else{
      return res.status(404).json({message:"user not found"})
   }
     
}