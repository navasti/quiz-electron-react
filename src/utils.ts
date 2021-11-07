import questions from '_/questions'

export const TOTAL_QUESTIONS = 10

export interface QuestionI {
  difficulty: number
  question: string
  correctAnswer: string
  answers: Array<string>
  points: number
}

const shuffle = (array: any) => [...array].sort(() => Math.random() - 0.5)

export const checkIfAnswerCorrect = (answer: string, question: QuestionI) => {
  return question.correctAnswer === answer
}

export const isLastQuestion = (question: number) => question === TOTAL_QUESTIONS

export const getDifficultyLevel = (currentQuestion: number) => {
  if (currentQuestion <= 2) return 1
  else if (currentQuestion > 2 && currentQuestion <= 4) return 2
  else if (currentQuestion > 4 && currentQuestion <= 6) return 3
  else if (currentQuestion > 6 && currentQuestion <= 8) return 4
  else return 5
}

export const prepareQuestion = (
  difficulty: number,
  previous?: null | QuestionI
) => {
  const shuffled: Array<QuestionI> = shuffle([...questions])
  const found = shuffled.find((question) => {
    return previous
      ? question.difficulty === difficulty && question !== previous
      : question.difficulty === difficulty
  })!
  found.answers = shuffle(found.answers)
  return found
}
