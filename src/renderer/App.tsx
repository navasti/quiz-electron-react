import * as React from 'react'
import { useEffect, useState } from 'react'
import QuestionCard from '_/components/QuestionCard'
import Header from '_/components/Header'
import {
  QuestionI,
  TOTAL_QUESTIONS,
  checkIfAnswerCorrect,
  getDifficultyLevel,
  prepareQuestion,
  isLastQuestion
} from '_/utils'

export default function App(): JSX.Element {
  const [score, setScore] = useState(0)
  const [difficulty, setDifficulty] = useState(1)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [question, setQuestion] = useState<null | QuestionI>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<null | string>(null)
  const [gameFinished, setGameFinished] = useState(false)

  useEffect(() => setQuestion(prepareQuestion(difficulty)), [])

  const handleSelectAnswer = (question: string) => setSelectedAnswer(question)

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || !question) return
    const isAnswerCorrect = checkIfAnswerCorrect(selectedAnswer, question)
    if (isAnswerCorrect) {
      if (isLastQuestion(currentQuestion)) {
        setGameFinished(true)
        return
      }
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
    <main className="main-wrapper">
      <Header
        score={score}
        totalQuestions={TOTAL_QUESTIONS}
        currentQuestion={currentQuestion}
      />
      <h1 className="question">{question?.question || 'loading'}</h1>
      <section className="cards">
        {question?.answers.map((answer, index) => (
          <QuestionCard
            answer={answer}
            selected={selectedAnswer}
            selectAnswer={(answer) => handleSelectAnswer(answer)}
            key={`answer-${index}`}
          />
        ))}
      </section>
      <button
        className="submit-button"
        onClick={handleSubmitAnswer}
        disabled={!selectedAnswer}
      >
        Submit
      </button>
    </main>
  )
}
