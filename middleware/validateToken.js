const jwt=require("jsonwebtoken")

const validate=(req,res,next)=>{
    const authHead=req.headers.authorization
    // Check whether the Authorization header exists
    // and whether it starts with "Bearer"
    if(!authHead || !authHead.startsWith("Bearer")){
        // Create an error if the Bearer token is missing
        let error=new Error("Don't have bearer in here")
        error.statusCode=401;
        // Pass the error to the global error handler
        return next(error) 
    }

    // Split the Authorization header using a space
    // Example: "Bearer abc123" becomes ["Bearer", "abc123"]
    const token=authHead.split(" ")[1];
    // Check whether the actual token exists
    if(!token){
        let error = new Error("There is no token!!!")
        error.statusCode=401;
        return next(error)
    }

    // Verify the token using the access token secret
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN,
        // Callback receives either an error or decoded token data
        (err,decodes)=>{
            // If verification fails (invalid or expired token)
            if(err){
                let error=new Error("Invalid token or token expier!!!.Please login again")
                error.statusCode=401
                return next(error)
            }
            // Store decoded token information in the response object
            res.user=decodes._id
            // Token is valid, continue to the next middleware or route
            next()
        }
    )
}
module.exports=validate