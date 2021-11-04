import * as React from 'react'
import { useEffect, useState } from 'react'
import QuestionCard from '_/components/QuestionCard'
import Header from '_/components/Header'
import {
  QuestionI,
  TOTAL_QUESTIONS,
  checkIfAnswerCorrect,
  getDifficultyLevel,
  prepareQuestion
} from '_/utils'

export default function App(): JSX.Element {
  const [score, setScore] = useState(0)
  const [difficulty, setDifficulty] = useState(1)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [question, setQuestion] = useState<null | QuestionI>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<null | string>(null)

  useEffect(() => setQuestion(prepareQuestion(difficulty)), [])

  const handleSelectAnswer = (question: string) => setSelectedAnswer(question)

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || !question) return
    const isAnswerCorrect = checkIfAnswerCorrect(selectedAnswer, question)
    if (isAnswerCorrect) {
      const nextQuestionNumber = currentQuestion + 1
      const nextDifficultLevel = getDifficultyLevel(nextQuestionNumber)
      const nextQuestion = prepareQuestion(nextDifficultLevel, question)
      setCurrentQuestion(nextQuestionNumber)
      setScore(score + question.points)
      setDifficulty(nextDifficultLevel)
      setSelectedAnswer(null)
      setQuestion(nextQuestion)
    }
  }

  return (
    <div>
      <pre>{selectedAnswer}</pre>
      <Header
        score={score}
        totalQuestions={TOTAL_QUESTIONS}
        currentQuestion={currentQuestion}
      />
      <h1>{question?.question || 'loading'}</h1>
      {question?.answers.map((answer, index) => (
        <QuestionCard
          answer={answer}
          selectAnswer={(answer) => handleSelectAnswer(answer)}
          key={`answer-${index}`}
        />
      ))}
      <button onClick={handleSubmitAnswer} disabled={!selectedAnswer}>
        submit
      </button>
    </div>
  )
}
