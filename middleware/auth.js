const jwt=require('jsonwebtoken');

module.exports=async function(req,res,next){

    const token=req.cookies.jwt;
    if(!token)
        return res.status(403).render('../client/forbidden.ejs');
    
    //verify token
    try {
        jwt.verify(token, process.env.jwtSecret,async (error, decoded) => {
            if (error) {
                console.log(error);
                return res.status(403).render('../client/forbidden.ejs');
            } 
            next();
        })
    } catch (error) {
        res.status(401).json({msg:"token is not valid"});
    }


}