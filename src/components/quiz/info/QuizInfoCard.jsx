import React from 'react';
import {Box, Button, Card, CardContent, IconButton, Typography} from "@mui/material";
import {DeleteForever} from "@mui/icons-material";
import IndentDivider from "../../ui/IndentDivider";
import {downloadQuiz} from "../../../api/QuizService";

const QuizInfoCard = ({quizInfo, toQuizResults}) => {

    function toDownloadQuiz() {
        return () => {
            downloadQuiz(
                () => {},
                () => {},
                () => {}
            )
        }
    }

    return (
        <Card>
            <CardContent>
                <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"end"}}>
                    <Typography variant="h5">{quizInfo.title}</Typography>
                    <IconButton size="small">
                        <DeleteForever />
                    </IconButton>
                </Box>
                <Typography>{quizInfo.theme}</Typography>

                <IndentDivider/>

                <Box sx={{ display:"flex", justifyContent:"start", alignItems:"center", gap:2}}>
                    <Button onClick={toQuizResults} variant="outlined">
                        Результаты
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={toDownloadQuiz()}
                    >
                        Экспорт
                    </Button>

                    <Typography>Вопросов: {quizInfo.questionsNumber}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default QuizInfoCard;