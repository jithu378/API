const errorHandler = (err,req,res,next)=>{

    // Get the status code from the error object.
    // If no status code is provided, use 500 (Internal Server Error).
    const statusCode= err.statusCode?err.statusCode:500;
    
    switch (statusCode){

        // 400 - Bad Request
        // Used when the client sends invalid data or fails validation.
        case 400:{
            res.status(400)
            res.json({
                type:" Validation failed",
                message:err.message,
                errorStack:err.stack
            })
            break;
        }

        // 401 - Unauthorized
        // Used when authentication is missing or invalid.
        case 401:{
            res.status(401)
            res.json({
                type:" UnAuthorized ",
                message:err.message,
                errorStack:err.stack
            })
            break;
        }

        // 403 - Forbidden
        // Used when the user does not have permission to access a resource.
        case 403:{
            res.status(403)
            res.json({
                type:" Forbidden Error",
                message:err.message,
                errorStack:err.stack
            })
            break;
        }

        // 404 - Not Found
        // Used when the requested resource cannot be found.
        case 404:{
            res.status(404)
            res.json({
                type:" Not Found",
                message:err.message,
                errorStack:err.stack
            })
            break;
        }

        // 500 - Internal Server Error
        // Used when an unexpected error occurs on the server.
        case 500:{
            res.status(500)
            res.json({
                type:" server Error",
                message:err.message,
                errorStack:err.stack
            })
            break;
        }

        // If the status code doesn't match any case above,
        // send a 500 Internal Server Error response.
        default:{
            res.status(500)
            res.json({
                type:" server Error",
                message:err.message,
                errorStack:err.stack
            })
            break;
        }
    }
} 

module.exports=errorHandler;