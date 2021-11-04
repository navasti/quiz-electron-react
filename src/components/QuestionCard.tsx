import * as React from 'react'

interface QuestionCardProps {
  selectAnswer: (event: string) => void
  answer: string
}

export default function QuestionCard(props: QuestionCardProps): JSX.Element {
  const handleSelectAnswer = () => props.selectAnswer(props.answer)
  return <div onClick={handleSelectAnswer}>{props.answer}</div>
}
