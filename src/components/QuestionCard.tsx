import * as React from 'react'

interface QuestionCardProps {
  selectAnswer: (event: string) => void
  selected: string | null
  answer: string
}

export default function QuestionCard(props: QuestionCardProps): JSX.Element {
  const isSelected = props.selected === props.answer
  return (
    <button
      className={`btn card ${isSelected ? 'active' : ''}`}
      onClick={() => props.selectAnswer(props.answer)}
    >
      {props.answer}
    </button>
  )
}
