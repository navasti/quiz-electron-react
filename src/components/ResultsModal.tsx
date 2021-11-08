import * as React from 'react'

interface ResultsModalProps {
  score: number
  active: boolean
  gameWon: boolean
  resetGame: () => void
  currentQuestion: number
}

export default function ResultsModal({
  score,
  active,
  gameWon,
  resetGame,
  currentQuestion
}: ResultsModalProps): JSX.Element {
  const answeredQuestions = gameWon ? currentQuestion : currentQuestion - 1
  return (
    <div className={`result-modal ${active ? 'active' : ''}`}>
      <h3 className="result-info">
        {gameWon
          ? 'Congratulations, you won! :)'
          : 'Sorry, you lost this time :('}
      </h3>
      <div className="score-info">
        <p>
          You answered to <b>{answeredQuestions}</b> questions and got{' '}
          <b>{score}</b> points.
        </p>
      </div>
      <button className="btn submit-button" onClick={resetGame}>
        Play again
      </button>
    </div>
  )
}
