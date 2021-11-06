import * as React from 'react'

interface QuestionCardProps {
  selectAnswer: (event: string) => void
  selected: string | null
  answer: string
}

export default function QuestionCard(props: QuestionCardProps): JSX.Element {
  const isSelected = props.selected === props.answer
  const handleSelectAnswer = () => props.selectAnswer(props.answer)
  return (
    <div
      className={isSelected ? 'card active' : 'card'}
      onClick={handleSelectAnswer}
    >
      {props.answer}
    </div>
  )
}
