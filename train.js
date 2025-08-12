const fs = require("fs");
const Tokenizer = require("./tokenizer");

// Load training text
const text = fs.readFileSync("training.txt", "utf8");

// Create tokenizer and train
const tokenizer = new Tokenizer();
tokenizer.train(text);

console.log("Vocabulary trained and saved!");
