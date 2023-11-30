
async function login(req,res){
  console.log("login")
  return res.send({login:true})
}

async function register(){
  console.log("register")
}


module.exports = {login,register}