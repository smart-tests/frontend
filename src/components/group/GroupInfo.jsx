import React from 'react';
import {Box, Card, CardContent, Divider, IconButton, Typography} from "@mui/material";
import {DeleteForever} from "@mui/icons-material";
import IndentDivider from "../ui/IndentDivider";

const GroupInfo = ({group}) => {
    return (
        <Card>
            <CardContent>
                <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"end"}}>
                    <Typography variant="h5">{group.name}</Typography>
                    <IconButton size="small">
                        <DeleteForever />
                    </IconButton>
                </Box>

                <IndentDivider/>

                <Box sx={{ display:"flex", justifyContent:"start", gap:"1rem"}}>
                    <Typography>Участников: {group.members.length}</Typography>
                    <Typography>Тестов: {group.quizzesCount}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default GroupInfo;