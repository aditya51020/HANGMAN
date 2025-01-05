import React, { Component } from 'react'
import imgWin from "/victory.gif"

export default class IsWinner extends Component {
  render() {
    return (
      <div className='absolute top-24 right-20 '>
    <div className="w-[400px] bg-white rounded-lg shadow-xl flex flex-col items-center justify-center ">
        <img className="w-16 rounded-full object-cover mb-4" src={imgWin} alt="Game Icon" />
        <h1 className="text-xl font-semibold text-center text-gray-800">Are Whaa!! you are winner</h1>

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
