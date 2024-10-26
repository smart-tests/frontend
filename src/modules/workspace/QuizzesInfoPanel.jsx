import React from 'react';
import {Button, Container, Stack, styled, Typography} from "@mui/material";
import QuizInfoCard from "../../components/quiz/info/QuizInfoCard";
import {CloudUpload} from "@mui/icons-material";
import * as consts from "../../helpers/consts";
import QuizService from "../../api/QuizService";
import {useNavigate} from "react-router-dom";

const QuizzesInfoPanel = ({quizInfos}) => {

    const quizService = new QuizService();
    const navigate = useNavigate();

    const handleUploadDocument = (event) => {
        quizService.generateQuiz(event.target.files[0], afterResponse());
    }

    function afterResponse() {
        return (data) => {
            navigate(consts.links.QUIZ_CREATING, { state: { data: data}});
        };
    }

    return (
        <Container>
            <Typography variant="h4">
                Мои тесты
            </Typography>

            <Button
                href={consts.links.QUIZ_CREATING}
            >
                Создать
            </Button>

            <Button
                component="label"
                variant="contained"
                startIcon={<CloudUpload />}
            >
                Генерирация AI
                <VisuallyHiddenInput
                    type="file"
                    onChange={handleUploadDocument}
                    multiple
                />
            </Button>

            <Stack spacing={2} sx={{ mt:3 }}>
                {
                    quizInfos.map((quizInfo) => {
                        return <QuizInfoCard key={quizInfo.id} quizInfo={quizInfo} />
                    })
                }
            </Stack>
        </Container>
    );
};

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default QuizzesInfoPanel;