const mongoose=require("mongoose")

async function connect() {
    try{
        await mongoose.connect(process.env.CONNECTION)
        console.log(`Database connected at port ${process.env.CONNECTION}`)
    }catch(error){
        console.log("Database not connected")
        console.log(error.massage)
    }
}

module.exports=connect