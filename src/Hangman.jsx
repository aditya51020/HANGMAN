import React, { Component } from 'react';
import getRandomWord from './words';
import Display from './Components/Display';
import Input from './Components/Input';
import IsWinner from './Components/IsWinner';
import IsGameOver from './Components/IsGameOver';



const EMPTY_SPACE = "___";

class Hangman extends Component {
    constructor(props) {
        super(props);

        const wordData = getRandomWord();

        this.state = {
            word: wordData,
            guessedWord: new Set(),
            wrongGuesses: 0,
            isGameOver: false,
            isWinner: false,
            hint: wordData.hint,
            wrongGuessedLetters: new Set(),
        };

        // Bind methods
        this.getInput = this.getInput.bind(this);
        this.getGuessedWord = this.getGuessedWord.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    getGuessedWord() {
        const answer = this.state.word.word.toLowerCase();
        const answerArray = answer.split("").map((letter) => {
            return this.state.guessedWord.has(letter) ? letter.toUpperCase() : EMPTY_SPACE;
        });
        return answerArray.join(" ");
    }

    getInput(letter) {
        letter = letter.toLowerCase();

        if (
            this.state.isGameOver ||
            this.state.isWinner ||
            this.state.guessedWord.has(letter)
        ) {
            return;
        }

        const isCorrectGuess = this.state.word.word.includes(letter);
        const newWrongGuesses = this.state.wrongGuesses + (isCorrectGuess ? 0 : 1);

        this.setState((prevState) => {
            const updatedGuessedWord = new Set(prevState.guessedWord).add(letter);
            const updatedWrongGuessedLetters = new Set(prevState.wrongGuessedLetters);

            if (!isCorrectGuess) {
                updatedWrongGuessedLetters.add(letter);
            }

            return {
                guessedWord: updatedGuessedWord,
                wrongGuesses: newWrongGuesses,
                isGameOver: newWrongGuesses >= 6,
                isWinner: this.state.word.word
                    .split("")
                    .every((char) => updatedGuessedWord.has(char)),
                wrongGuessedLetters: updatedWrongGuessedLetters,
            };
        });
    }

    resetGame() {
        const newWordData = getRandomWord();
        this.setState({
            word: newWordData,
            guessedWord: new Set(),
            wrongGuesses: 0,
            isGameOver: false,
            isWinner: false,
            hint: newWordData.hint,
            wrongGuessedLetters: new Set(),
        });
    }

    render() {
        const MAX_WRONG = 6;
        const attempts = MAX_WRONG - this.state.wrongGuesses;
    
        const imagePaths = [
            '/Hangman/hangman-0.svg',
            '/Hangman/hangman-1.svg',
            '/Hangman/hangman-2.svg',
            '/Hangman/hangman-3.svg',
            '/Hangman/hangman-4.svg',
            '/Hangman/hangman-5.svg',
            '/Hangman/hangman-6.svg',
        ];
    
        const hangmanImage = imagePaths[this.state.wrongGuesses];
    
        const game = (
            <>
                <div className="col-span-2 absolute left-96 font-semibold lg:top-6 md:top-10 sm:top-16 text-sm md:text-base lg:text-lg items-center">
                    <Display word={this.getGuessedWord()} attempts={attempts} />
                    <h3 className="attempts flex items-center justify-center p-6 font-semibold text-sm md:text-base lg:text-lg ">
                        You have 
                        <span className="font-semibold text-red-600 mx-2"> {attempts} </span> Lives left
                    </h3>
                    <p className="hint flex items-center justify-center p-6 font-semibold text-sm md:text-base lg:text-lg">
                        Hint: {this.state.hint}
                    </p>
                </div>
                <div className="row-span-2 col-span-2 absolute mb-10 bottom-0 left-96">
                    <Input
                        getInput={this.getInput}
                        wrongGuessedLetters={this.state.wrongGuessedLetters}
                    />
                </div>
            </>
        );
    
        const winnerORLoser = this.state.isWinner ? (
            <IsWinner resetGame={this.resetGame} />
        ) : this.state.isGameOver ? (
            <IsGameOver resetGame={this.resetGame} word={this.state.word.word} />
        ) : (
            game
        );
    
       
        return (
            <div className="hangman w-full min-h-[40vh] lg:h-auto max-w-5xl bg-white relative mx-auto box-border">
                <div className="grid grid-rows-3 grid-flow-col gap-4">
                    <div className="row-span-3 p-4 sm:p-6 md:p-8 lg:p-10 mt-6 md:mt-8 lg:mt-10">
                        {/* Hangman image display */}
                        <img
                            src={hangmanImage}
                            alt={`Hangman ${this.state.wrongGuesses}`}
                            className="object-contain mb-2"
                            onError={() => console.log("Failed to load image")}
                        />
                    </div>
                    <div className="col-span-2 ">
                        {winnerORLoser}
                    </div>
                </div>
            </div>
        );
    }
    
}

export default Hangman;
