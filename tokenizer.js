const fs = require("fs"); // File system module to read/write vocab file

class Tokenizer {
    constructor(vocabFile = "vocab.json") {
        this.vocabFile = vocabFile;
        this.specialTokens = ["<PAD>", "<UNK>", "<SOL>", "<EOL>"]; // Reserved tokens
        this.vocab = {}; // word → id mapping
        this.revVocab = {}; // id → word mapping

        // If vocab file exists, load it
        if (fs.existsSync(vocabFile)) {
            this.vocab = JSON.parse(fs.readFileSync(vocabFile, "utf8"));
        } else {
            // Otherwise, create vocab with only special tokens
            this.specialTokens.forEach((t, i) => (this.vocab[t] = i));
            this.save(); // Save initial vocab
        }

        // Create reverse vocab mapping (id → word)
        this.revVocab = Object.fromEntries(
            Object.entries(this.vocab).map(([w, i]) => [i, w])
        );
    }

    // Save vocab to file
    save() {
        fs.writeFileSync(this.vocabFile, JSON.stringify(this.vocab, null, 2));
    }

    // Train vocab by adding new words from text
    train(text) {
        text.split(/\s+/).forEach((w) => {
            if (!this.vocab[w]) {
                // If word not in vocab
                this.vocab[w] = Object.keys(this.vocab).length; // Assign next index
            }
        });
        this.save(); // Save updated vocab
        // Update reverse mapping
        this.revVocab = Object.fromEntries(
            Object.entries(this.vocab).map(([w, i]) => [i, w])
        );
    }

    // Convert text to sequence of IDs
    encode(text) {
        return [
            this.vocab["<SOL>"], // Start of line
            ...text.split(/\s+/).map((w) => this.vocab[w] ?? this.vocab["<UNK>"]), // Map each word or unknown
            this.vocab["<EOL>"], // End of line
        ];
    }

    // Convert sequence of IDs back to text
    decode(ids) {
        return ids
            .filter(
                (i) =>
                    ![
                        this.vocab["<SOL>"],
                        this.vocab["<EOL>"],
                        this.vocab["<PAD>"],
                    ].includes(i)
            ) // Skip special tokens
            .map((i) => this.revVocab[i] || "<UNK>") // Map ID to word
            .join(" "); // Join back into string
    }
}

// Export Tokenizer class for use in other files
module.exports = Tokenizer;
