import React, {useState} from 'react';
import {AppBar, Box, Button, ButtonGroup, Divider, IconButton, MenuItem, Toolbar, Typography} from "@mui/material";
import {Menu as MenuIcon} from "@mui/icons-material";
import Menu from '@mui/material/Menu';
import * as consts from "../helpers/consts";
import {useNavigate} from "react-router-dom";
import {logout} from "../api/QuizService";
import logo from "../components/ui/logo.png"

const Header = ({user}) => {
    const navigate = useNavigate();

    const toCreatedTests = () => {
        navigate(consts.links.USER_CREATED_QUIZZES);
    }

    const toCreatedGroups = () => {
        navigate(consts.links.CREATED_GROUPS);
    }

    const toLogin = () => {
        navigate(consts.links.LOGIN);
    }

    const toQuizzesForPassing = () => {
        navigate(consts.links.QUIZZES_FOR_PASSING)
    }

    return (
        <AppBar position="static" sx={{mb: 5}}>
            <Toolbar sx={{display:"flex", justifyContent:"space-between"}}>
                <Box
                    component='img'
                    alt='SmartTest'
                    src={logo}
                    sx={{
                        maxHeight: 25
                    }}
                />
                {/*<Typography*/}
                {/*    variant="h6"*/}
                {/*    noWrap*/}
                {/*    component="div"*/}
                {/*    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}*/}
                {/*>*/}
                {/*    SmartTest*/}
                {/*</Typography>*/}

                {
                    user
                    ? <AuthorizedMenu
                            user={user}
                            toCreatedTests={toCreatedTests}
                            toCreatedGroups={toCreatedGroups}
                            toQuizzesForPassing={toQuizzesForPassing}/>
                    : <UnauthorizedMenu
                            toLogin={toLogin}/>
                }
            </Toolbar>
        </AppBar>
    );
};

export default Header;

const UnauthorizedMenu = ({toLogin}) => {

    return (
        <Box>
            <ButtonGroup variant="text" color="inherit">
                <Button>Регистрация</Button>
                <Button onClick={toLogin}>Вход</Button>
            </ButtonGroup>
        </Box>
    );
}

const AuthorizedMenu = ({user, toCreatedTests, toCreatedGroups, toQuizzesForPassing}) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        logout(
            () => {},
            () => {
                console.log("logout");
                navigate("/", {replace: true});
            },
            () => {}
        )
    }

    return (
        <Box sx={{ display:"flex", alignItems: "center", gap: 3}}>
            <Typography color="inherit" >
                {user.login}
            </Typography>

            <IconButton
                id="menu-button"
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleClick}
                sx={{ mr: 2 }}
            >
                <MenuIcon />
            </IconButton>

            <Menu
                id="menu-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    'dense': true,
                }}
                slotProps={{
                    paper: {
                        sx: {
                            pl: 3,
                            width: 200
                        }
                    }
                }}
            >
                <Typography color={"text.secondary"}>Преподавание</Typography>

                <MenuItem onClick={toCreatedTests}>
                    Мои тесты
                </MenuItem>

                <MenuItem onClick={toCreatedGroups}>
                    Мои группы
                </MenuItem>

                <Divider/>

                <Typography color={"text.secondary"}>Обучение</Typography>

                <MenuItem onClick={toQuizzesForPassing}>
                    Пройти тест
                </MenuItem>

                <Divider/>

                <MenuItem onClick={handleLogout}>Выход</MenuItem>
            </Menu>
        </Box>
    );
}