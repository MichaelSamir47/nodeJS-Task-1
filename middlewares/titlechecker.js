const Posts = require('../consts.js')
module.exports.titleChecker=(req,res,next)=>{


// let title = req.query.title;
// let deescrition;
// switch(title){
//   case 0:
//     return Posts()[0];
//     return next()
//     // break;
//     default:
//     deescrition = "Invalid title";
// }

    if(req.query.title<7){
      return next()
    }else{
      return res.status(400).send({msg:"Invalid title ID"})
    }
}