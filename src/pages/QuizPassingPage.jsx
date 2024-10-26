import React from 'react';
import Header from "../modules/Header";
import * as quizMock from "../mocks/quizMock";
import QuizQuestion from "../components/quiz/passing/QuizQuestion";
import {Button, Container, Stack, Typography} from "@mui/material";

const QuizPassingPage = () => {
    const quiz = quizMock.passingQuiz;
    const answers = [];

    function addAnswer(newAnswer) {
        let index = answers.findIndex(answer => answer.id === newAnswer.id);

        if (index >= 0) {
            answers[index] = newAnswer;
        } else {
            answers.push(newAnswer);
        }

        console.log(JSON.stringify(answers));
    }

    return (
        <div>
            <Header />

            <QuizPassingInfo title={quiz.title} theme={quiz.theme} totalQuestions={quiz.questions.length}/>

            <Container sx={{ display:"flex", flexDirection:"column", justifyContent:"center"}}>
                <Stack spacing={3}>
                    {
                        quiz.questions.map((question, i) => {
                            return <QuizQuestion
                                question={question}
                                index={i}
                                addAnswer={addAnswer}
                                key={question.id} />
                        })
                    }
                </Stack>

                <Button sx={{ mt:3 }}>
                    Завершить тест
                </Button>
            </Container>
        </div>
    );
};

const QuizPassingInfo = ({title, theme, totalQuestions}) => {
    return (
        <Container>
            <Typography>{title}</Typography>
            <Typography>{theme}</Typography>
            <Typography>{totalQuestions}</Typography>
        </Container>
    );
}

export default QuizPassingPage;