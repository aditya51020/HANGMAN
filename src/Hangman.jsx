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

        this.getInput = this.getInput.bind(this);
        this.getGuessedWord = this.getGuessedWord.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    getGuessedWord() {
        const answer = this.state.word.word.toLowerCase();
        return answer
            .split("")
            .map((letter) =>
                this.state.guessedWord.has(letter) ? letter.toUpperCase() : EMPTY_SPACE
            )
            .join(" ");
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
            `Hangman/hangman-0.svg`,
            `Hangman/hangman-1.svg`,
            `Hangman/hangman-2.svg`,
            `Hangman/hangman-3.svg`,
            `Hangman/hangman-4.svg`,
            `Hangman/hangman-5.svg`,
            `Hangman/hangman-6.svg`,
        ];


        const hangmanImage = imagePaths[this.state.wrongGuesses];

        const game = (
            <>
                <div className="col-span-2 text-center font-semibold sm:text-2xl sm:mt-auto">
                    <Display word={this.getGuessedWord()} attempts={attempts} />
                    <h3 className="attempts p-4 text-sm md:text-base">
                        You have
                        <span className="text-red-600 mx-2">{attempts}</span>
                        lives left
                    </h3>
                    <p className="hint p-4 text-sm md:text-base sm:mt-auto">
                        Hint: {this.state.hint}
                    </p>
                </div>
                <div className="row-span-2 col-span-2 mt-4 sm:mt-auto">
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
            <div className="hangman w-full min-h-screen max-w-5xl bg-white p-4 mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-center">
                <div className="grid w-full lg:grid-rows-3 lg:grid-cols-3 gap-4">
                    {/* Hangman Image */}
                    <div className="row-span-3 flex justify-center items-center p-4 sm:p-2">
                        <img
                            src={hangmanImage}
                            alt={`Hangman ${this.state.wrongGuesses}`}
                            className="object-contain w-full sm:h-70 sm:h-60 md:h-56 lg:h-72 "
                            onError={() => console.log("Failed to load image")}
                        />
                    </div>

                    {/* Game Controls */}
                    <div className="col-span-2 lg:col-start-2 lg:row-span-3 text-center flex flex-col sm:gap-4 md:gap-6 lg:gap-8 items-center justify-center p-2
                     md:p-8 lg:relative absolute bottom-0 left-4 w-auto max-w-screen-lg mx-auto mb-10">
                        {winnerORLoser}
                    </div>

                </div>
            </div>
        );
    }
}

export default Hangman;
