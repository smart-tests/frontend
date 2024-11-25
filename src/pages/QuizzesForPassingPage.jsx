import React, {useEffect, useState} from 'react';
import {Box, Button, Card, CardContent, Container, Divider, Stack, Typography} from "@mui/material";
import Header from "../modules/Header";
import useAuth from "../utils/hooks/useAuth";
import {getAvailableQuizzes, getCurrentUserResults} from "../api/QuizService";
import {useNavigate} from "react-router-dom";
import {links as consts} from "../helpers/consts";
import {Check, DoneOutline} from "@mui/icons-material";
import toDDMMYYYY from "../utils/dateFormatter";
import IndentDivider from "../components/ui/IndentDivider";
import Inner from "../components/ui/Inner";

const QuizzesForPassingPage = () => {
    const { user } = useAuth();
    const [availableQuizzes, setAvailableQuizzes] = useState(null);
    const [resultsMap, setResultsMap] = useState(null);
    const navigate = useNavigate();

    console.log(availableQuizzes)

    useEffect(() => {
        setAvailableQuizzes(updateAvailableQuizzes());
        setResultsMap(new Map(updateQuizzesResults()?.map(r => [r.quiz.id, r])));
    }, []);

    function updateAvailableQuizzes() {
        return getAvailableQuizzes(
            () => {},
            data => setAvailableQuizzes(data),
            () => {}
        )
    }

    function updateQuizzesResults() {
        return getCurrentUserResults(
            () => {},
            data => setResultsMap(new Map(data?.map(r => [r.quiz.id, r]))),
            () => {}
        )
    }

    function toPassingQuiz(quizId) {
        return () => {
            navigate(consts.PASSING_QUIZ + quizId);
        }
    }

    return (
        <Box>
            <Header user={user}/>
            <Container>
                <Inner title='Пройти тест'/>
                <Stack direction="column" spacing={2}>
                    {
                        availableQuizzes?.map(quiz => resultsMap?.has(quiz.id)
                            ? <PassedQuiz key={quiz.id} quiz={quiz} result={resultsMap.get(quiz.id)} />
                            : <UnpassedQuiz key={quiz.id} quiz={quiz} onPassingButtonClick={toPassingQuiz(quiz.id)} />
                        )
                    }
                </Stack>
            </Container>
        </Box>
    );
};

export default QuizzesForPassingPage;

const PassedQuiz = ({quiz, result}) => {

    return (
        <Card sx={{backgroundColor: '#f0fdd2'}}>
            <CardContent>
                <Box sx={{ display:"flex", justifyContent:"space-between"}}>
                    <Typography variant="h6">{quiz.title}</Typography>
                    <Check />
                </Box>

                <Typography>{quiz.theme}</Typography>
                <Typography>{quiz.groupName}</Typography>

                <IndentDivider />

                <Box sx={{ display:"flex", gap:3}}>
                    <Typography>Результат: {result.rightAnswersNumber}/{result.quiz.questionsNumber}</Typography>
                    <Typography>Пройден: {toDDMMYYYY(result.createDate)}</Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

const UnpassedQuiz = ({quiz, onPassingButtonClick}) => {

    return (
        <Card>
            <CardContent>

                <Box sx={{ display:"flex", justifyContent:"space-between"}}>
                    <Typography variant="h6">{quiz.title}</Typography>
                    <Button onClick={onPassingButtonClick}>Пройти</Button>
                </Box>

                <Typography>{quiz.theme}</Typography>
                <Typography>{quiz.groupName}</Typography>

                <IndentDivider />

                <Box sx={{ display:"flex", gap:3}}>
                    <Typography>Вопросов: {quiz.questionsNumber}</Typography>
                    <Typography>Открыт до: {toDDMMYYYY(quiz.endDate)}</Typography>
                </Box>
            </CardContent>
        </Card>
    )
}
