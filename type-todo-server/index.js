"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = require("mongoose");
//making the scheme for notes
const noteSchema = new mongoose_1.Schema({
    note: { type: String, required: true },
    completed: { type: Boolean, required: true },
});
//creating a model
const Note = (0, mongoose_1.model)('Note', noteSchema);
//database connection
run().catch(err => console.log(err));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, mongoose_1.connect)("mongodb+srv://user2020:admin123@cluster0.st63fth.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to database");
    });
}
// making the server
const server = (0, express_1.default)();
// middlewares
server.use((0, cors_1.default)());
server.use(express_1.default.json());
// get all notes
server.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield Note.find().lean();
    res.json(notes);
}));
// create a new Note for TODO
server.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { note, completed } = req.body;
    const newNote = { note, completed };
    const n = yield Note.create(newNote);
    if (n) {
        return res.send("created");
    }
    else {
        return res.send("not created");
    }
    res.send("from the post");
}));
//update existing note in the TODO app
server.patch('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, note, completed } = req.body;
    if (!id || !note || typeof completed !== 'boolean') {
        return res.status(400).json({ message: "please enter all the fields" });
    }
    const findNote = yield Note.findById(id);
    if (!findNote) {
        return res.status(400).json({ message: "note not found!!" });
    }
    findNote.note = note;
    findNote.completed = completed;
    yield findNote.save();
    res.json({ message: "task updated successfully" });
}));
//deleting note in the TODO app
server.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params["id"];
    const note = yield Note.findById(id).exec();
    const result = yield (note === null || note === void 0 ? void 0 : note.deleteOne());
    res.json({ message: "Task deleted successfully" });
    // console.log(req.params)
}));
server.listen(8000, () => {
    console.log("server is running !!");
});
