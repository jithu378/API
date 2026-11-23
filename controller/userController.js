const bcrypt=require("bcrypt")
const user=require("../models/userModel")
const jwt=require("jsonwebtoken")

// REGISTER
let register=(async(req,res)=>{
    const{username,useremail,userpassword}=req.body
    // Check whether all required fields are provided
    if(!username || !useremail || !userpassword){
        let error=new Error("All field are requiered")
        error.statusCode=400
        throw error
    }
    // Check whether the email already exists in the database
    const existuser=await user.findOne({useremail})
    if(existuser){
        let error=new Error("Enter another email")
        error.statusCode=400
        throw error
    }
    // Hash the user's password using bcrypt
    const hashpass=await bcrypt.hash(userpassword,10)
    // Create a new user document in MongoDB
    const userdata=await user.create({
        username:username,useremail:useremail,userpassword:hashpass
    })
    res.status(201).json({userdata})
})

// LOGIN
let login=(async(req,res)=>{
    let{email,pass}=req.body
    // Check whether email and password are provided
    if(!email || !pass){
        let error=new Error("All field are requied")
        error.statusCode=400
        throw error
    }
    // Find the user in MongoDB using the provided email
    let User=await user.findOne({useremail:email})
    // Check whether the user exists
    if(!User){
        let error=new Error("Invalied email !!")
        error.statusCode=400
        throw error
    }
    // Compare the entered password with the hashed password in MongoDB
    let match=await bcrypt.compare(pass,User.userpassword)
    // Check whether the passwords match
    if(!match){
        let error=new Error("Invalied password !!")
        error.statusCode=400
        throw error
    }

// Access token
    // Generate an access token containing user information
    const accessToken = jwt.sign(
        {
            userId: User._id,
            tokenType: "access"
        },
        process.env.ACCESS_TOKEN, // Secret key used to sign the access token
        {expiresIn:"15m"} // Access token expires after 15 minutes
    );

// Refresh token
    // Generate a refresh token containing the user's ID
    const refreshToken =jwt.sign({
        userId:User._id,
        tokenType:"refresh"
    },
    process.env.REFRESH_TOKEN, // Secret key used to sign the refresh token
    {expiresIn:"7d"} // Refresh token expires after 7 days
    );

    // Store the refresh token inside an HTTP-only cookie
    res.cookie("refreshToken",refreshToken ,{
        httpOnly:true, // Prevent JavaScript from accessing the cookie
        secure:false, // Cookie can be sent over HTTP
        sameSite:"lax", // Provides cross-site request protection
        maxAge:7 * 24 * 60 * 60 * 1000 // Cookie expires after 7 days
    });
    // Send successful login response with the access token
    res.status(200).json({
        massage:"Login Successful",
        accessToken
    })
})

// REFRESH TOKEN
let refresh = ((req,res)=>{
    // Retrieve the refresh token from the browser cookie
    const refreshToken=req.cookies.refreshToken;
    // Check whether the refresh token exists
    if(!refreshToken){
        let error=new Error("Refresh token is missing!!")
        error.statusCode=401
        throw error
    }
    // Verify the refresh token using the refresh secret key
    const decodes=jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN
    )
    // Check whether the provided token is actually a refresh token
    if(decodes.tokenType !== "refresh"){
        let error=new Error("Invalied refresh token!!")
        error.statusCode=401
        throw error
    }
    // Generate a new access token using the user ID from the refresh token
    const newAccessToken=jwt.sign({
        userId : decodes.userId,
        tokenType:"access"
    },
    process.env.ACCESS_TOKEN,
    {expiresIn:"15m"}
);
// Send the newly generated access token to the client
res.status(200).json({
    massage : "Token refreshed sucessfully",
    access : newAccessToken
})
})

// LOGOUT
const logout=((req,res)=>{
    // Clear the refresh token cookie from the browser
    res.clearCookie("refreshToken",{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"lax"
    });

    res.status(200).json({
        massage:"Logout sccussfully"
    })
})

module.exports={register,login,refresh,logout}