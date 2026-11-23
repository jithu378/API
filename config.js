const mongoose=require("mongoose")

async function connect() {
    try{
        // Connect to MongoDB using the connection string stored in the .env file
        await mongoose.connect(process.env.CONNECTION_STRING)
        console.log(`Database connected at port ${process.env.CONNECTION_STRING}`)
    }catch(error){
        console.log("Database not connected")
        console.log(error.message)
    }
}

module.exports=connect