## Project Overview

This project is a custom word-level tokenizer implemented in Node.js. It splits text into words and assigns a unique integer ID to each word. The tokenizer supports special tokens like `<PAD>`, `<UNK>`, `<SOL>`, and `<EOL>`. The vocabulary is stored in `vocab.json` and can be extended by training the tokenizer with new text data.

### Key Technologies

*   **Language:** JavaScript (Node.js)
*   **Core Modules:** `fs` (built-in)

### Architecture

The project is composed of three main files:

*   `tokenizer.js`: Implements the `Tokenizer` class, which encapsulates all the tokenization logic.
*   `train.js`: A script for training the tokenizer and building the vocabulary.
*   `demo.js`: A script for demonstrating the tokenizer's functionality.

## Building and Running

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/UtkarshKm/Custom-Tokenizer.git
    cd custom-tokenizer
    ```
2.  **Install Node.js:**
    [Download Node.js](https://nodejs.org/)

### Training the Tokenizer

To train the tokenizer with the data in `training.txt`, run the following command:

```bash
node train.js
```

This will update the `vocab.json` file with new words from the training data.

### Running the Demo

To see the tokenizer in action, run the demo script:

```bash
node demo.js
```

This will demonstrate the encoding and decoding of a sample text.

## Development Conventions

### Coding Style

The code follows standard JavaScript conventions. It is written in a clear and modular way, with the core logic encapsulated in the `Tokenizer` class.

### Testing

There are no formal test files in this project. However, the `demo.js` script can be used as a manual test to verify the tokenizer's functionality.


