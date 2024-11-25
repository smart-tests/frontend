import React, {useEffect, useState} from 'react';
import {getCurrentUserInfo} from "../api/QuizService";
import {Box, Typography} from "@mui/material";
import Header from "../modules/Header";

const StartPage = () => {
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
            <Typography>Welcome to SmartTest!!!</Typography>
        </Box>
    );
};

export default StartPage;