import React, {useEffect, useState} from 'react';
import Header from "../modules/Header";
import QuizQuestion from "../components/quiz/passing/QuizQuestion";
import {Button, Container, Typography} from "@mui/material";
import useAuth from "../utils/hooks/useAuth";
import {useNavigate, useParams} from "react-router-dom";
import {checkPassedQuiz, getQuizForPassing} from "../api/QuizService";
import Inner from "../components/ui/Inner";
import IndentStack from "../components/ui/IndentStack";
import {links} from "../helpers/consts";

const QuizPassingPage = () => {
    const {user} = useAuth();
    const {id} = useParams();
    const [quiz, setQuiz] = useState(null);
    const answers = [];
    const navigate = useNavigate();

    useEffect(() => {
        getQuiz();
    }, []);

    function getQuiz() {
        getQuizForPassing(
            id,
            () => {},
            (data) => {setQuiz(data)},
            () => {}
        )
    }

    function toQuizzesForPassing() {
        navigate(links.QUIZZES_FOR_PASSING);
    }

    function finishQuiz() {
        const request = {
            questions: answers
        }

        checkPassedQuiz(
            id,
            request,
            () => {},
            toQuizzesForPassing,
            () => {}
        );
    }

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
            <Header user={user}/>

            <Container sx={{ display:"flex", flexDirection:"column", justifyContent:"center"}}>

                <Inner title={quiz?.title}>
                    <Typography>
                        Всего вопросов: {quiz?.questions.length}
                    </Typography>
                </Inner>

                <IndentStack>
                    {
                        quiz?.questions.map((question, i) => {
                            return <QuizQuestion
                                question={question}
                                index={i}
                                addAnswer={addAnswer}
                                key={question.id} />
                        })
                    }
                </IndentStack>

                <Button onClick={finishQuiz} sx={{ mt:3 }}>
                    Завершить тест
                </Button>
            </Container>
        </div>
    );
};

export default QuizPassingPage;