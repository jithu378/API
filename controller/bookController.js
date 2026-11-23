const book=require("../models/bookModel")

const getBooks=(async(req,res)=>{
    let data=await book.find()
    if(!data){
        let error=new Error("No data to fetch!!")
        error.statusCode=404
        throw error
    }
    res.status(200).json({data})
})
const addBook=(async(req,res)=>{
    let{bookname,bookprice,stock}=req.body
    if(!bookname || !bookprice || !stock){
        let error=new Error("All values are requied")
        error.statusCode=400
        throw error
    }
    let image=`/uploads/book/${req.file.filename}`
    if(!image){
        let error=new Error("No image is uploaded")
        error.statusCode=404
        throw error
    }
    let data=await book.create({
        book_name:bookname,book_price:bookprice,stock:stock,image:image
    })
    res.status(200).json({data})
})
const getOneBook =(async(req,res)=>{
    let data=await book.findById(req.params.id)
    if(!data){
        let error=new Error("No data!!!")
        error.statusCode=404
        throw error
    }
    res.status(200).json({data})
})
const updateBook=(async(req,res)=>{
    let{bookname,bookprice,stock}=req.body
    if(!bookname || !bookprice || !stock){
        let error=new Error("All values are requied")
        error.statusCode=400
        throw error
    }
    let books=await book.findById(req.params.id)
    if(!books){
        let error=new Error("No book to update!!")
        error.statusCode=404
        throw error
    }
    books.book_name=bookname;
    books.book_price=bookprice;
    books.stock=stock;
    if(req.file){
        books.image=`/uploads/${req.file.filename}`
    }
    await books.save()
    res.status(200).json({
        massage:"Updated successfully",
        data:books
    })
})
const deleteBook=(async(req,res)=>{
    let data=await book.findByIdAndDelete(req.params.id)
    if(!data){
        let error=new Error("No book to delete!!")
        error.statusCode=404
        throw error
    }
    res.status(200).json({
        massage:"Book deleted succussfully"
    })
})

module.exports={getBooks,addBook,getOneBook,updateBook,deleteBook}