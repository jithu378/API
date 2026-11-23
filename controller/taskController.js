const getAllTask = (req, res) => {
    let data = [
        {
            task : "Watching tv",
            description : "Watching",
            status : "pending"
        },
        {
            task : "playing game",
            description : "playing",
            status : "pending"
        }
    ]
    res.json({data})
}

const addOneTask = (req, res) => {
    const {task, description, status} = req.body
    let data = {
        task : task,
        description : description,
        status : status
    }
    res.json("Data added")
}

const updateTask = (req,res) => {
    res.json("data updated")
}
const deleteTask = (req,res) => {
    res.json("data deleted")
}

module.exports = {getAllTask, addOneTask, updateTask, deleteTask}