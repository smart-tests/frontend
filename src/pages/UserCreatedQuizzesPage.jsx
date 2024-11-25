import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import Header from "../modules/Header";
import QuizzesInfoPanel from "../modules/workspace/QuizzesInfoPanel";
import {getUserCreatedQuizzes} from "../api/QuizService";
import {useNavigate} from "react-router-dom";
import {links} from "../helpers/consts";
import useAuth from "../utils/hooks/useAuth";

const UserCreatedQuizzesPage = () => {

    const [quizInfos, setQuizInfos] = useState([]);
    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        updateQuizInfos();
    }, []);

    function updateQuizInfos() {
        getUserCreatedQuizzes(
            () => {},
            (data) => {setQuizInfos(data)},
            () => {}
        );
    }

    function toQuizResults(quizId) {
        return () => {
            navigate(links.QUIZ_RESULTS + quizId);
        }
    }

    return (
        <Box>
            <Header user={user} />
            <QuizzesInfoPanel quizInfos={quizInfos} toQuizResults={toQuizResults} />
        </Box>
    );
};

export default UserCreatedQuizzesPage;