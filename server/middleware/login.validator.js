exports.loginValidator = (req,res,next)=>{
    const {username,password} = req.body;
    if(req.body&&username&&password){
        next()
    }else{
        res.status(404).send({mesaage :"All input fields are required"})
    }
}