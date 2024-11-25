import React, {useEffect, useState} from 'react';
import useAuth from "../utils/hooks/useAuth";
import {Box, Card, CardContent, Container, Typography} from "@mui/material";
import Header from "../modules/Header";
import {getQuizInfo, getQuizResults} from "../api/QuizService";
import {useParams} from "react-router-dom";
import Inner from "../components/ui/Inner";
import IndentStack from "../components/ui/IndentStack";
import IndentDivider from "../components/ui/IndentDivider";
import toDDMMYYYY from "../utils/dateFormatter";

const QuizResultsPage = () => {
    const {id} = useParams();
    const {user} = useAuth();
    const [results, setResults] = useState([]);
    const [quizInfo, setQuizInfo] = useState([]);

    useEffect(() => {
        updateResults();
        updateQuizInfo();
    }, []);

    function updateResults() {
        getQuizResults(
            id,
            () => {},
            data => setResults(data),
            () => {}
        );
    }

    function updateQuizInfo() {
        getQuizInfo(
            id,
            () => {},
            data => setQuizInfo(data),
            () => {}
        )
    }

    return (
        <Box>
            <Header user={user}/>
            <Container>
                <Inner title={quizInfo?.title}/>

                <IndentStack>
                    {
                        results?.map(result =>
                            <UserResultCard key={result.id} result={result} />
                        )
                    }
                </IndentStack>
            </Container>
        </Box>
    );
};

const UserResultCard = ({result}) => {

    return (
        <Card>
            <CardContent>
                <Typography>
                    {result.user.lastName} {result.user.firstName} ({result.user.login})
                </Typography>

                <IndentDivider />

                <Box sx={{ display:"flex", gap:3}}>
                    <Typography>
                        Результат: {result.rightAnswersNumber}/{result.quiz.questionsNumber}
                    </Typography>

                    <Typography>
                        Пройден: {toDDMMYYYY(result.createDate)}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default QuizResultsPage;