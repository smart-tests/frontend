import React, {useState} from 'react';
import {Backdrop, Box, Button, Card, CardContent, CircularProgress, Container, Stack, TextField} from "@mui/material";
import CreatingQuestionCard from "../../components/quiz/CreatingQuestionCard";
import * as quizHelper from "../../helpers/quizHelper";
import { saveQuiz as backendSaveQuiz } from "../../api/QuizService";

const CreatingQuizPanel = ({ data }) => {
    const [quiz, setQuiz] = useState(data);
    const [progressOpen, setProgressOpen] = useState(false);
    const [errorTitle, setErrorTitle] = useState(false);

    function saveQuiz() {
        if (!isQuizCorrect()) return;
        setProgressOpen(true);

        backendSaveQuiz(quiz,
            () => setProgressOpen(true),
            () => setProgressOpen(false),
            (err) => console.log(err));
    }

    function isQuizCorrect() {
        if (!quiz.title) {
            setErrorTitle(true);
            return false;
        }

        return true;
    }

    function changeQuestion(index) {
        const questionIndex = index;

        return (newQuestion) => {
            setQuiz(prev => {
                console.log("PREV")
                console.log(prev)

                prev.questions[questionIndex] = newQuestion;
                return prev;
            });
        }
    }

    function deleteQuestion(index) {
        const questionIndex = index;

        return () => {
            setQuiz(prev => {
                const newQuiz = structuredClone(prev);
                console.log(newQuiz);
                newQuiz.questions.splice(questionIndex, 1);

                return newQuiz;
            })
        }
    }

    const addQuestion = () => {
        setQuiz(prev => {
            const newQuiz = structuredClone(prev);
            newQuiz.questions = [...newQuiz.questions, quizHelper.getEmptyQuestion()];

            return newQuiz;
        });
    }

    return (
        <Container>
            <Card elevation={3}>
                <CardContent>
                    <TextField
                        value={quiz.title}
                        onChange={(e) => setQuiz(prev => ({ ...prev, title: e.target.value }))}
                        error={errorTitle}
                        onFocus={() => setErrorTitle(false)}
                        variant="outlined"
                        label="Название"
                        sx={{mt: 2}}
                        fullWidth={true}/>

                    <TextField
                        variant="outlined"
                        label="Тема" sx={{mt: 1}}
                        fullWidth={true}/>

                    <Box sx={{mt: 1, mb: 1, display:"flex", justifyContent: "space-between"}}>
                        <Box sx={{ display: "flex", alignItems: "center", gap:3 }}>
                            <Button onClick={addQuestion} variant="contained">Добавить вопрос</Button>
                        </Box>

                        <Button
                            onClick={saveQuiz}
                        >
                            Сохранить
                        </Button>
                    </Box>
                </CardContent>
            </Card>
            <Stack spacing={2} direction="column-reverse" sx={{ mt: "1rem "}}>
                {quiz.questions.map((question, i) => (
                    <CreatingQuestionCard
                        key={`${JSON.stringify(question)}-${i}`}
                        question={question}
                        changeQuestion={changeQuestion(i)}
                        index={i}
                        deleteQuestion={deleteQuestion(i)}
                    />
                ))}
            </Stack>

            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={progressOpen}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Container>
    );
};

export default CreatingQuizPanel;