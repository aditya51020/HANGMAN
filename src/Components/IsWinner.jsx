import React, { Component } from 'react';
import imgWin from '/Hangman/victory.gif';

export default class IsWinner extends Component {
  render() {
    return (
      <div className="inset-0 flex items-center justify-center">
        <div className="w-[90%] max-w-sm bg-white rounded-lg shadow-xl flex flex-col items-center justify-center p-6 sm:p-8">
          <img
            className="w-24 h-24 rounded-full object-cover mb-4"
            src={imgWin}
            alt="Game Icon"
          />
          <h1 className="text-lg sm:text-xl font-semibold text-center text-gray-800 mb-4">
            Are Whaa!! You are the winner!
          </h1>
          <button
            onClick={this.props.resetGame}
            className="w-full sm:w-1/2 py-2 bg-[#5E63BA] text-white rounded-lg hover:bg-[#8286c9] transition duration-300"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }
}

