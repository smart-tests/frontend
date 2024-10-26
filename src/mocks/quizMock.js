import {questionTypes} from "../helpers/consts";

export const quiz = {
    title: "Заголовок теста",
    theme: "тема теста",
    questions: [
        {
            id: 1,
            type: questionTypes.SINGLE_ANSWER,
            text: "сколько будет дважды два",
            points: 3,
            answers: [
                {
                    text: "три",
                    isRight: false
                },
                {
                    text: "один",
                    isRight: false
                },
                {
                    text: "два",
                    isRight: false
                },
                {
                    text: "четыре",
                    isRight: true
                }
            ]
        },
        {
            id: 2,
            type: questionTypes.SINGLE_ANSWER,
            text: "столица России",
            points: 3,
            answers: [
                {
                    text: "Пенза",
                    isRight: false
                },
                {
                    text: "Москва",
                    isRight: true
                },
                {
                    text: "Самара",
                    isRight: false
                },
                {
                    text: "Куйбышев",
                    isRight: false
                }
            ]
        }
    ]
}

export const passingQuiz = {
    title: "Заголовок теста",
    theme: "тема теста",
    questions: [
        {
            id: 111,
            type: questionTypes.SINGLE_ANSWER,
            text: "сколько будет дважды двасколько будет дважды двасколько будет дважды двасколько будет дважды двасколько будет дважды двасколько будет дважды двасколько будет дважды двасколько будет дважды двасколько будет дважды двасколько будет дважды двасколько будет дважды двасколько будет дважды двасколько будет дважды двасколько будет дважды двасколько будет дважды двасколько будет дважды двасколько будет дважды двасколько будет дважды двасколько будет дважды двасколько будет дважды двасколько будет дважды двасколько будет дважды двасколько будет дважды двасколько будет дважды двасколько будет дважды двасколько будет дважды двасколько будет дважды двасколько будет дважды двасколько будет дважды два",
            points: 3,
            answers: [
                {
                    id: 11,
                    text: "три"
                },
                {
                    id: 22,
                    text: "один"
                },
                {
                    id: 33,
                    text: "два"
                },
                {
                    id: 44,
                    text: "четыре"
                }
            ]
        },
        {
            id: 222,
            type: questionTypes.MULTI_ANSWER,
            text: "столица России",
            points: 3,
            answers: [
                {
                    id: 55,
                    text: "Пенза"
                },
                {
                    id: 66,
                    text: "Москва"
                },
                {
                    id: 77,
                    text: "Самара"
                },
                {
                    id: 88,
                    text: "Куйбышев"
                }
            ]
        },
        {
            id: 333,
            type: questionTypes.INPUT_ANSWER,
            text: "Сколько ног у человека?",
            points: 3,
            answers: []
        }
    ]
}

export const quizInfo = {
    quizes: [
        {
            id: "bec17d8d-32ff-4e13-9849-c90b0cd634c7",
            title: "Тест номер один",
            theme: "Тема теста номер один",
            timeLimit: "sef",
            questionNumber: 15,
            isEditable: true
        },
        {
            id: "e4cf823e-263c-41b5-ba97-213410feb868",
            title: "Второй тест",
            theme: "Тема второго теста",
            timeLimit: "sef",
            questionNumber: 10,
            isEditable: true
        },
        {
            id: "33ca327e-12ca-4fc6-85b7-08a28b8c848f",
            title: "Тест по математике",
            theme: "Дробные числа",
            timeLimit: "sef",
            questionNumber: 8,
            isEditable: true
        }
    ]
}