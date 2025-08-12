const fs = require("fs");

class Tokenizer {
    constructor(vocabFile = "vocab.json") {
        this.vocabFile = vocabFile;
        this.specialTokens = ["<PAD>", "<UNK>", "<SOL>", "<EOL>"];
        this.vocab = {};
        this.revVocab = {};

        if (fs.existsSync(vocabFile)) {
            this.vocab = JSON.parse(fs.readFileSync(vocabFile, "utf8"));
        } else {
            this.specialTokens.forEach((t, i) => (this.vocab[t] = i));
            this.save();
        }

        this.revVocab = Object.fromEntries(
            Object.entries(this.vocab).map(([w, i]) => [i, w])
        );
    }

    save() {
        fs.writeFileSync(this.vocabFile, JSON.stringify(this.vocab, null, 2));
    }

    train(text) {
        text.split(/\s+/).forEach(w => {
            if (!this.vocab[w]) {
                this.vocab[w] = Object.keys(this.vocab).length;
            }
        });
        this.save();
        this.revVocab = Object.fromEntries(
            Object.entries(this.vocab).map(([w, i]) => [i, w])
        );
    }

    encode(text) {
        return [
            this.vocab["<SOL>"],
            ...text.split(/\s+/).map(w => this.vocab[w] ?? this.vocab["<UNK>"]),
            this.vocab["<EOL>"]
        ];
    }

    decode(ids) {
        return ids
            .filter(i => ![this.vocab["<SOL>"], this.vocab["<EOL>"], this.vocab["<PAD>"]].includes(i))
            .map(i => this.revVocab[i] || "<UNK>")
            .join(" ");
    }
}

module.exports = Tokenizer;
