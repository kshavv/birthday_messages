const express=require("express");
const router=express.Router();
const {check,validationResult}=require("express-validator");

// const jwt=require("jsonwebtoken");

//@route    GET 
//@desc     authenticate user and get token
//@access   Public
router.get('/',(req,res)=>{
    res.render('../client/signIn.ejs',{error:""});
})



//@route    POST api/auth
//@desc     authenticate user and get token
//@access   Public
const regDataCheck=[
    check('username','name is required').not().isEmpty(),
    check('password','please enter a password with 6 or more character').isLength({min:6})    
];

router.post('/',regDataCheck,async(req,res)=>{

    const errors=validationResult(req); 
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {username,password}=req.body;
    

})


module.exports=router; 