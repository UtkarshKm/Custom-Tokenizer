const Tokenizer = require("./tokenizer");

// Create tokenizer instance
const tok = new Tokenizer();

// Train vocabulary on some text
tok.train("I love AI and AI loves me");

// Encode text into token IDs
const enc = tok.encode("I love AI");
console.log("Encoded:", enc);

// Decode token IDs back into text
console.log("Decoded:", tok.decode(enc));
