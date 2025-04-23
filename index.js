const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");



app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//mongoose connection establish
main()
    .then(() => console.log("connection successful"))
    .catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/MongoChat');
}

//server connection to localhost
app.listen(8080, () => {
    console.log("server is listening to port 8080..")
});

//baic home page setup
app.get("/", (req, res) => {
    res.send("succesfully working");
});

// //chat document
// const chat1 = new Chat({
//     from: "Shivani",
//     to: "Naveen",
//     msg: "Hello dude, how are you?",
//     created_at: new Date()
// })
// chat1.save()
// .then(res=> {
//     console.log(res);
// })
// .catch(err =>{
//     console.log(err);
// });

//GET /chats index route to show all the chats
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs", { chats });
});

//GET /chats/new to create a new chat
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

// POST /chats to insert the new chat
app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    });
    newChat
    .save()
    .then(res => { 
        console.log("chat saved..") 
    })
    .catch(err => {
        console.log(err)
    });

    res.redirect("/chats");
});

//GET /chats/:id/edit edit route
app.get("/chats/:id/edit", async (req, res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
});

//PUT /chats/:id update the message and store it in DB
app.put("/chats/:id", async (req, res) => {
    let {id} = req.params;
    let { msg: newMsg } = req.body;
    let updateChat = await Chat.findByIdAndUpdate(id, {msg: newMsg}, {runValidators: true}, {new: true}
    );
    console.log(updateChat);
    res.redirect("/chats");
});

//POST delete the message
app.delete("/chats/:id", async (req, res) => {
    let {id} = req.params;
    let chatToBeDeleted = await Chat.findByIdAndDelete(id);
    console.log(chatToBeDeleted);
    res.redirect("/chats");
});
