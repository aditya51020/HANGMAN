import React, { Component } from 'react'
import img from "/lost.gif"

export default class IsGameOver extends Component {
  render() {
    return (
      <div className="absolute top-24 right-20 ">
    <div className="w-[400px] bg-white rounded-lg shadow-xl flex flex-col items-center justify-center ">
        <img className="w-16 rounded-full object-cover mb-4" src={img} alt="Game Icon" />
        <h1 className="text-xl font-semibold text-center text-gray-800">Abbey chal phir se try kar</h1>
        <h2 className="text-lg text-center text-gray-600">
            The correct answer is <span className="font-bold text-[#5E63BA]">{this.props.word}</span>
        </h2>
        <button 
            onClick={this.props.resetGame} 
            className="w-1/2 py-2 m-2 bg-[#5E63BA] text-white rounded-lg hover:g-[#8286c9] transition duration-300"
        >
            Play Again
        </button>
    </div>
</div>
    )
  }
}
