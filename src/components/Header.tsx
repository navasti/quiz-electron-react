import * as React from 'react'

interface HeaderProps {
  score: number
  totalQuestions: number
  currentQuestion: number
}

export default function Header(props: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="stage">
        <p>
          Question {props.currentQuestion} of {props.totalQuestions}
        </p>
      </div>
      <div className="score">
        <p>Score: {props.score}</p>
      </div>
    </header>
  )
}
