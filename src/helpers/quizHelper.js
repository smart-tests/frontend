import {questionTypes} from "./consts";

export const getEmptyQuestion = () => {
    return {
        type: questionTypes.SINGLE_ANSWER,
        text: null,
        points: 1,
        answers: [
            {
                text: null,
                isRight: true
            }
        ]
    }
}

export const getEmptyQuiz = () => {
    return {
        id: null,
        title: null,
        theme: null,
        isEditable: true,
        questions: [
            getEmptyQuestion()
        ]
    }
}

export const getQuestionChoice = (questionId, answerIds, textAnswer) => {
    return {
        id: questionId,
        answerIds: answerIds,
        textAnswer: textAnswer
    }
}