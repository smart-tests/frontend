import React, {useState} from 'react';
import {Box} from "@mui/material";
import Header from "../modules/Header";
import * as quizMock from "../mocks/quizMock";
import QuizzesInfoPanel from "../modules/workspace/QuizzesInfoPanel";

const UserCreatedQuizzesPage = () => {

    const [quizInfos, setQuizInfos] = useState(quizMock.quizInfo.quizes);

    console.log(quizInfos);
    return (
        <Box>
            <Header />
            <QuizzesInfoPanel quizInfos={quizInfos} />
        </Box>
    );
};

export default UserCreatedQuizzesPage;