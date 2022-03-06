const express=require("express");
const router=express.Router();
const {check,validationResult}=require("express-validator");
const path = require('path');

//for handling file upload
const multer=require('multer');


const jwt=require("jsonwebtoken");
const auth=require("../middleware/auth");





//@route    GET 
//@desc     the signIn route
//@access   Public
router.get('/',(req,res)=>{
    res.render('../client/signIn.ejs',{error: ""});
})



//@route    POST api/auth
//@desc     authenticate user and get token
//@access   public
const regDataCheck=[
    check('username','name is required').not().isEmpty(),
    check('password','please enter a password with 6 or more character').isLength({min:6})    
];

router.post('/',regDataCheck,async(req,res)=>{
    const errors=validationResult(req); 
    if(!errors.isEmpty()){
        return res.status(400).render('../client/signIn.ejs',{error:"Invalid Credentials!"});
    }

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

        jwt.sign(payload,process.env.jwtSecret,
        {expiresIn:3600},
        (err,token)=>{
        if(err)
            throw err;
        console.log(token);
        // return res.json({token:token})
        });


    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');     
    }
})


//@route    GET /main screen
//@desc     route for main screen
//@access   private
router.get('/main',auth,(req,res)=>{
    res.render('../client/main.ejs',{message:""});

})

const storage=multer.diskStorage({
    destination:path.resolve(__dirname,"../data"),
    filename:function(req,file,cb){
        cb(null,'book'+path.extname(file.originalname))
    }
});

const upload=multer({
    storage:storage,
    limits:{fileSize:2*1000*1000}

}).single('book');










//@route    POST /uploadsheet
//@desc     route for uploading the sheet
//@access   private
router.post('/uploadsheet',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err.message);
        }
        else{
            console.log(req.file);
            // res.send({msg:"👍"});
        }
    });
    res.render('../client/main.ejs',{message:"done"});
})


module.exports=router; 