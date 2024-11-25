import React, {useState} from 'react';
import {Box, Button, Container, styled} from "@mui/material";
import QuizInfoCard from "../../components/quiz/info/QuizInfoCard";
import {CloudUpload} from "@mui/icons-material";
import * as consts from "../../helpers/consts";
import QuizService from "../../api/QuizService";
import {useNavigate} from "react-router-dom";
import Inner from "../../components/ui/Inner";
import IndentStack from "../../components/ui/IndentStack";
import ProgressCircle from "../../components/ui/ProgressCircle";

const QuizzesInfoPanel = ({quizInfos, toQuizResults}) => {

    const quizService = new QuizService();
    const navigate = useNavigate();
    const [progressIsOpen, setProgressIsOpen] = useState(false);

    const handleUploadDocument = (event) => {
        quizService.generateQuiz(event.target.files[0], afterResponse(), () => setProgressIsOpen(true));
    }

    function afterResponse() {
        return (data) => {
            setProgressIsOpen(false);
            navigate(consts.links.QUIZ_CREATING, { state: { data: data}});
        };
    }

    return (
        <Container>
            <Inner title='Мои тесты'>
                <Box sx={{display:"flex", gap:2}}>
                    <Button
                        variant='outlined'
                        href={consts.links.QUIZ_CREATING}
                    >
                        Создать
                    </Button>

                    <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUpload />}
                    >
                        Генерировать
                        <VisuallyHiddenInput
                            type="file"
                            onChange={handleUploadDocument}
                            multiple
                        />
                    </Button>
                </Box>
            </Inner>

            <IndentStack sx={{ mt:3 }}>
                {
                    quizInfos.map((quizInfo) => {
                        return <QuizInfoCard
                            key={quizInfo.id}
                            quizInfo={quizInfo}
                            toQuizResults={toQuizResults(quizInfo.id)}
                        />
                    })
                }
            </IndentStack>
            <ProgressCircle isOpen={progressIsOpen}/>
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