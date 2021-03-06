require("dotenv").config();
const express=require("express");
const router=express.Router();
const {check,validationResult}=require("express-validator");
const path = require('path');
const multer=require('multer');
const jwt=require("jsonwebtoken");
const auth=require("../middleware/auth");
const readExcel=require('../functions/readExcel')


/**
 * @route   GET /
 * @desc    the sign In Route
 * @access  public
 */
router.get('/',(req,res)=>{
    res.render('../client/signIn.ejs',{error: ""});
})


/**
 * @route   POST /
 * @desc    authenticate user and get token
 * @access  public
 */
const regDataCheck=[
    check('username','name is required').not().isEmpty(),
    check('password','please enter a password with 6 or more character').isLength({min:6})    
];
router.post('/',regDataCheck,async(req,res)=>{
    const errors=validationResult(req); 
    if(!errors.isEmpty())
        return res.status(400).render('../client/signIn.ejs',{error:"Invalid Credentials!"});
    
    const {username,password}=req.body;
    try {
        //check the input credentials
        if(username!=process.env.user || password!=process.env.userPass){
            return res.status(400).render('../client/signIn.ejs',{error:"Invalid Credentials!"});
        }
        const user={
            username:username,
            password:password
        }
        const payload={user};
        const secretString=process.env.jwtSecret;
        jwt.sign(payload,secretString,{expiresIn:'2d'},(err,token)=>{
            if(err)
                throw err;
            //store the token in cookies
            res.cookie('jwt',token,{httpOnly:true});
            res.status(302).redirect('/main');
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');     
    }
})


/**
 * @route    GET /main 
 * @desc     route for main screen
 * @access   private
 */
router.get('/main',auth,(req,res)=>{
    res.render('../client/main.ejs',{message:""});
})


/**
 * @route    GET /forbidden
 * @desc     route to forbidden page
 * @access   public
 */
router.get('/forbidden',(req,res)=>{
    res.render('../client/forbidden.ejs');
})


let maxSize=2*1000*1000; //max permissible size of file
const storage=multer.diskStorage({
    destination:path.resolve(__dirname,"../data"),
    filename:function(req,file,cb){
        cb(null,'book'+path.extname(file.originalname))
    }
});

const upload=multer({
    storage:storage,
    limits:{fileSize:maxSize}
}).single('book');


/**
 * @route    POST /uploadsheet
 * @desc     route for uploading the sheet
 * @access   private
 */
router.post('/uploadsheet',auth,(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err.message)
            res.json({msg:err.message});
        }
        else{
            readExcel();
            res.json({msg:"File uploaded????"});
        }
    });
})


/**
 * @route    GET/logout
 * @desc     route for loggin out
 * @access   public
 */
router.get('/logout',(req,res)=>{
    return res.clearCookie("jwt").status(200).redirect('/')
})

module.exports=router; 
