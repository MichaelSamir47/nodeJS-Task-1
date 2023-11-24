module.exports.titleChecker=(req,res,next)=>{
    if(req.query.title<7){
      return next()
    }else{
      return res.status(400).send({msg:"Invalid title ID"})
    }
}