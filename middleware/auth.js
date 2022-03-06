// this verifies the authenticity of tokens

const jwt=require('jsonwebtoken');
const config=require('config');


module.exports=async function(req,res,next){

    //get token from header
    const token=req.header('x-auth-token');

    if(!token)
        return res.status(403).render('../client/forbidden.ejs');

    
    //verify token
    try {
        jwt.verify(token, process.env.jwtSecret,async (error, decoded) => {
            if (error) {
              return res.status(403).render('../client/forbidden.ejs');
            } 
            next();
        })
    } catch (error) {
        res.status(401).json({msg:"token is not valid"});
    }


}