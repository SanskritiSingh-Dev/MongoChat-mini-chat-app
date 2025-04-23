const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

//mongoose connection establish
main()
    .then(() => console.log("connection successful"))
    .catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/MongoChat');
}

//some random chat array
let allChats = [
    {
        from: "Shivani",
        to: "Naveen",
        msg: "Hello dude, how are you?",
        created_at: new Date()
    },
    {
        from: "Naveen",
        to: "Shivani",
        msg: "Hey Shivani! I'm good, just busy with work.",
        created_at: new Date()
    },
    {
        from: "Anjali",
        to: "Rohit",
        msg: "Don't forget our meeting at 4 PM!",
        created_at: new Date()
    },
    {
        from: "Rohit",
        to: "Anjali",
        msg: "Got it! See you at 4.",
        created_at: new Date()
    },
    {
        from: "Sarthak",
        to: "Meera",
        msg: "What's up? Long time no see!",
        created_at: new Date()
    },
    {
        from: "Meera",
        to: "Sarthak",
        msg: "Haha yeah, let’s catch up soon!",
        created_at: new Date()
    },
    {
        from: "Priya",
        to: "Aryan",
        msg: "Did you check out that new web series?",
        created_at: new Date()
    },
    {
        from: "Aryan",
        to: "Priya",
        msg: "Yes! It’s amazing. Waiting for season 2.",
        created_at: new Date()
    }
]
Chat.insertMany(allChats);
