import React from 'react';
import CreatingQuizPanel from "../modules/quiz/CreatingQuizPanel";
import Header from "../modules/Header";
import {useLocation} from "react-router-dom";
import {getEmptyQuiz} from "../helpers/quizHelper";
import {Box} from "@mui/material";

const CreateQuizPage = () => {

    const {state} = useLocation();

    return (
        <Box>
            <Header />
            <CreatingQuizPanel data={ state?.data ? state.data : getEmptyQuiz() } />
        </Box>
    )
}

export default CreateQuizPage;