import React from 'react';
import {Box, Card, CardContent, Divider, IconButton, Typography} from "@mui/material";
import {DeleteForever} from "@mui/icons-material";

const QuizInfoCard = ({quizInfo}) => {

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
                <Divider/>

                <Box sx={{ display:"flex", justifyContent:"start", gap:"1rem"}}>
                    <Typography>Время: {quizInfo.timeLimit}</Typography>
                    <Typography>Вопросов: {quizInfo.questionNumber}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default QuizInfoCard;