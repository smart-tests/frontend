import React from 'react';
import {Stack} from "@mui/material";

const IndentStack = ({children}) => {
    return (
        <Stack spacing={1}>
            {children}
        </Stack>
    );
};

export default IndentStack;