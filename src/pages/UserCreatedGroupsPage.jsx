import React, {useEffect, useState} from 'react';
import {getCurrentUserInfo, getCurrentUserOwnerGroups, createGroup as backendCreateGroup} from "../api/QuizService";
import Header from "../modules/Header";
import {Button, Container, Stack, Typography} from "@mui/material";
import GroupInfo from "../components/group/GroupInfo";
import GroupCreating from "../modules/group/GroupCreating";
import {Link} from "react-router-dom";
import Inner from "../components/ui/Inner";

const UserCreatedGroupsPage = () => {

    const [user, setUser] = useState(null);
    const [groups, setGroups] = useState([]);
    const [openCreatingGroup, setOpenCreatingGroup] = useState(false);

    useEffect(() => {
        getCurrentUserInfo(
            () => {},
            (data) => {setUser(data)},
            (error) => {console.log(error)}
        );
        getCurrentUserOwnerGroups(
            () => {},
            (data) => {setGroups(data)},
            () => {}
        )
    }, []);

    function handleOpenCreatingGroup() {
        setOpenCreatingGroup(true);
    }

    function handleCloseCreatingGroup() {
        setOpenCreatingGroup(false);
    }

    function createGroup(data) {
        backendCreateGroup(
            data,
            () => {},
            (data) => {
                if (data) {
                    getCurrentUserOwnerGroups(
                        () => {},
                        (data) => {setGroups(data)},
                        () => {}
                    )
                }
                handleCloseCreatingGroup();
            },
            () => {}
        );
    }

    return (
        <div>
            <Header user={user} />

            <Container>
                <Inner title='Группы'>
                    <Button variant='outlined' onClick={handleOpenCreatingGroup}>
                        Создать
                    </Button>
                </Inner>

                <Stack spacing={2}>
                    {
                        groups.map((group) => {
                            return (
                                <Link
                                    to={`../${group.id}/edit`}
                                    style={{ textDecoration: 'none' }}
                                    key={group.id}>

                                    <GroupInfo group={group} />
                                </Link>
                                );
                        })
                    }
                </Stack>

                <GroupCreating
                    isOpen={openCreatingGroup}
                    onClose={handleCloseCreatingGroup}
                    onCreate={createGroup}/>
            </Container>
        </div>
    );
};

export default UserCreatedGroupsPage;