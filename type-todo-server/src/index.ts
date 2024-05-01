import express from 'express';
import cors from 'cors';
import { Schema, model, connect } from 'mongoose';


//creating interface to represent our MongoDb document
interface INote {
    note: string,
    completed: boolean
}

//making the scheme for notes
const noteSchema = new Schema<INote>({
    note: { type: String, required: true },
    completed: { type: Boolean, required: true },
})

//creating a model
const Note = model<INote>('Note', noteSchema);

//database connection
run().catch(err => console.log(err));

async function run() {
    await connect("mongodb+srv://user2020:admin123@cluster0.st63fth.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

    console.log("Connected to database")
}



// making the server
const server: express.Application = express();

// middlewares
server.use(cors())
server.use(express.json())

// get all notes
server.get('/', async (req, res) => {

    const notes = await Note.find().lean();

    res.json(notes)
})

// create a new Note for TODO
server.post('/', async (req, res) => {
    const { note, completed } = req.body

    const newNote = { note, completed }

   const n = await Note.create(newNote)

    if (n) {
        return res.send("created")
    } else {
        return res.send("not created")
    }
res.send("from the post")

})

//update existing note in the TODO app
server.patch('/', async(req, res)=>{
    const{ id, note, completed } = req.body
    if(!id || !note || typeof completed !== 'boolean'){
        return res.status(400).json({message: "please enter all the fields"})
     }

     const findNote = await Note.findById(id)

     if(!findNote){
        return res.status(400).json({message: "note not found!!"})
     }

     findNote.note =  note;
     findNote.completed = completed;

     await findNote.save();

     res.json({message: "task updated successfully"})

})


//deleting note in the TODO app
server.delete( '/:id', async(req,res) => {
     const id = req.params[ "id" ]

    const note = await Note.findById(id).exec()

    const result = await note?.deleteOne()

    res.json( {message: "Task deleted successfully"} )
    // console.log(req.params)
} )



server.listen(8000, () => {
    console.log("server is running !!");
})
