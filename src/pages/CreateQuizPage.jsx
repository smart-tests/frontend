import React, {useEffect, useState} from 'react';
import CreatingQuizPanel from "../modules/quiz/CreatingQuizPanel";
import Header from "../modules/Header";
import {useLocation} from "react-router-dom";
import {getEmptyQuiz} from "../helpers/quizHelper";
import {Box} from "@mui/material";
import {getCurrentUserInfo} from "../api/QuizService";

const CreateQuizPage = () => {

    const {state} = useLocation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        getCurrentUserInfo(
            () => {},
            (data) => {setUser(data)},
            () => {}
        );
    }, []);

    return (
        <Box>
            <Header user={user} />
            <CreatingQuizPanel data={ state?.data ? state.data : getEmptyQuiz() } />
        </Box>
    )
}

export default CreateQuizPage;