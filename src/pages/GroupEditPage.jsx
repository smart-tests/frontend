import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {
    addGroupMember,
    addQuizToGroup as addQuizToGroupRequest,
    getCurrentUserInfo,
    getGroupInfo,
    getGroupQuizzes,
    getUserCreatedQuizzes
} from "../api/QuizService";
import Header from "../modules/Header";
import {Box, Button, Card, CardContent, Container, Divider, IconButton, Stack, Typography} from "@mui/material";
import AddGroupMember from "../modules/group/AddGroupMember";
import AddGroupQuiz from "../modules/group/AddGroupQuiz";
import Inner from "../components/ui/Inner";
import IndentDivider from "../components/ui/IndentDivider";
import useAuth from "../utils/hooks/useAuth";
import {Clear} from "@mui/icons-material";
import toDDMMYYYY from "../utils/dateFormatter";
import IndentStack from "../components/ui/IndentStack";

const GroupEditPage = () => {
    const {id} = useParams();
    const {user} = useAuth();
    const [group, setGroup] = useState(null);
    const [groupQuizzes, setGroupQuizzes] = useState(null);
    const [userQuizzes, setUserQuizzes] = useState(null);
    const [addMemberIsOpen, setAddMemberIsOpen] = useState(false);
    const [addQuizIsOpen, setAddQuizIsOpen] = useState(false);
    const [quizForAdding, setQuizForAdding] = useState([]);

    useEffect(() => {
        getGroupInfo(
            id,
            () => {},
            (data) => {setGroup(data)},
            (error) => {console.log(error)}
        );
        updateGroupQuizzes();
        updateUserCreatedQuizzes();
    }, []);

    useEffect(() => {
        setQuizForAdding(getQuizzesForAdding());
    }, [groupQuizzes, userQuizzes]);

    function addMemberToGroup() {
        return (userLogin) => {
            const data = {
                memberLogin: userLogin,
                groupId: id};

            addGroupMember(
                data,
                () => {},
                (response) => {setGroup(response)},
                () => {}
            );

            setAddMemberIsOpen(false);
        }
    }

    function addQuizToGroup() {
        return (quizId, startDate, endDate) => {
            const data = {
                quizId: quizId,
                startDate: startDate,
                endDate: endDate
            };
            addQuizToGroupRequest(
                id,
                data,
                () => {},
                () => {
                    setAddQuizIsOpen(false);
                    updateGroupQuizzes();
                },
                () => {},
            );
        }
    }

    function updateGroupQuizzes() {
        getGroupQuizzes(
            id,
            () => {},
            (response) => {setGroupQuizzes(response)},
            () => {}
        );
    }
    function updateUserCreatedQuizzes() {
        getUserCreatedQuizzes(
            () => {},
            (response) => {setUserQuizzes(response)},
            () => {}
        )
    }

    function getQuizzesForAdding() {
        const groupQuizIds = new Set(groupQuizzes?.map(gq => gq.quiz?.id));
        return userQuizzes?.filter(q => !groupQuizIds.has(q.id));
    }

    return (
        <div>
            <Header user={user} />

            <Container>
                <Inner title={group?.name}/>

                <Box sx={{display: 'flex', gap: 2, mb:3}}>
                    <Typography variant='h6'>Участники</Typography>

                    <Button
                        variant='outlined'
                        onClick={() => {setAddMemberIsOpen(true)}}
                    >
                        Добавить
                    </Button>
                </Box>

                <IndentStack>
                    {
                        group?.members?.map(member =>
                            <GroupMember member={member} key={member.id} />)
                    }
                </IndentStack>

                <IndentDivider />

                <Box sx={{display: 'flex', gap: 2, mb:3}}>
                    <Typography variant='h6'>Тесты</Typography>

                    <Button
                        variant='outlined'
                        onClick={() => setAddQuizIsOpen(true)}
                    >
                        Добавить
                    </Button>
                </Box>

                <IndentStack>
                    {
                        groupQuizzes?.map(quiz =>
                            <GroupQuizInfo groupQuiz={quiz} key={quiz.id} />)
                    }
                </IndentStack>
            </Container>

            <AddGroupMember
                isOpen={addMemberIsOpen}
                onClose={() => {setAddMemberIsOpen(false)}}
                onSubmit={addMemberToGroup()}/>
            <AddGroupQuiz
                quizzes={quizForAdding}
                isOpen={addQuizIsOpen}
                onClose={() => {setAddQuizIsOpen(false)}}
                onSubmit={addQuizToGroup()}/>
        </div>
    );
};

const GroupMember = ({member}) => {

    return(
        <Card>
            <CardContent sx={{display:'flex', justifyContent:'space-between'}}>

                <Typography>
                    {member?.lastName} {member?.firstName} ({member?.login})
                </Typography>

                <IconButton>
                    <Clear color='warning'/>
                </IconButton>
            </CardContent>
        </Card>
    )
}

const GroupQuizInfo = ({groupQuiz}) => {

    return (
        <Card>
            <CardContent>
                <Typography variant='h6'>
                    {groupQuiz.quiz.title}
                </Typography>

                {groupQuiz.quiz.theme}

                <IndentDivider/>

                <Box display='flex' gap={2}>
                    <Typography>Дата начала: {toDDMMYYYY(groupQuiz.startDate)}</Typography>
                    <Typography>Дата закрытия: {toDDMMYYYY(groupQuiz.endDate)}</Typography>
                    <Typography>Вопросов: {groupQuiz.quiz.questionsNumber}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default GroupEditPage;