import React from 'react';
import {Backdrop, CircularProgress} from "@mui/material";

const ProgressCircle = ({isOpen}) => {
    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={isOpen}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default ProgressCircle;