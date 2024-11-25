import React from 'react';
import {Box, Typography} from "@mui/material";

const Inner = ({children, title}) => {
    return (
        <Box sx={{mb:3}}>
            <Typography
                variant='h4'
                sx={{
                    mb:3,
                    textAlign:'center'
                }}
            >
                {title}
            </Typography>
            {children}
        </Box>
    );
};

export default Inner;