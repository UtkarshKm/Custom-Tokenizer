

  # 📝 Custom Tokenizer  — Word-Level Tokenization

This tokenizer works at the **word level**, meaning:

- It **splits text by spaces** into whole words.
- Each **unique word** gets a unique integer ID in the vocabulary.
- Special tokens are added for extra meaning:
  - `<PAD>` → Padding for sequences
  - `<UNK>` → Unknown words (not in vocab)
  - `<SOL>` → Start of line
  - `<EOL>` → End of line


---

## 📂 Project Structure

```
custom-tokenizer/
┣ demo.js           # Demo file to run and test the tokenizer
┣ tokenizer.js      # Tokenizer class implementation
┣ train.js          # Script to train tokenizer with a dataset
┣ training.txt      # Training text data
┣ vocab.json        # Vocabulary storage file
┗ README.md         # Documentation
```

---

## Quick Example

```js
const Tokenizer = require("./tokenizer");
const tok = new Tokenizer();
console.log(tok.encode("hello world")); // [ 2, 5, 6, 3 ]
console.log(tok.decode([2, 5, 6, 3])); // hello world
```

---

## ⚙️ Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/UtkarshKm/Custom-Tokenizer.git
   cd custom-tokenizer
   ```

2. **Install Node.js** (if not already installed):
   [Download Node.js](https://nodejs.org/)

3. **No extra dependencies are needed** — it only uses Node's built-in `fs` module.

---

## 📚 Usage

### 1️⃣ Training the Tokenizer

Run `train.js` to build your vocabulary from `training.txt`:

```bash
node train.js
```

- The tokenizer will read words from `training.txt` and create/update `vocab.json`.
- Special tokens are always added:

  - `<PAD>` → padding token
  - `<UNK>` → unknown words
  - `<SOL>` → start of line
  - `<EOL>` → end of line

---

### 2️⃣ Encoding Text

You can encode text into token IDs:

```js
const Tokenizer = require("./tokenizer");

const tokenizer = new Tokenizer();
const encoded = tokenizer.encode("hello world");
console.log(encoded);
```

**Output Example:**

```
[ 2, 5, 6, 3 ]
```

- `2` → `<SOL>`
- `5` → "hello"
- `6` → "world"
- `3` → `<EOL>`

---

### 3️⃣ Decoding Tokens

```js
const decoded = tokenizer.decode([2, 5, 6, 3]);
console.log(decoded);
```

**Output:**

```
hello world
```

If a token ID is **not** in the vocabulary, `<UNK>` will be used.

---

### 4️⃣ Demo Run

We included a `demo.js` file to quickly see everything in action:

```bash
node demo.js
```

---

## 📄 Example Dataset (`training.txt`)

You can put any large text here for better vocabulary coverage.
Example:

```
hello world this is a custom tokenizer
tokenizer converts words to tokens
unknown words will be replaced with <UNK>
```

---

## ❓ Notes

- If you decode a token ID not in the vocabulary, it will output `<UNK>`.
- Vocabulary is saved to `vocab.json` so you can reuse it later.
- You can keep retraining with more data to grow the vocabulary.

---

## 🛠️ Future Improvements

- Add **byte-pair encoding** (BPE) for subword tokenization
- Add **case-insensitive** option
- Add support for **punctuation handling**

---

**Author:** Utkarsh Kumawat
**License:** MIT
