import React, {useState} from 'react';
import {AppBar, IconButton, MenuItem, Toolbar, Typography} from "@mui/material";
import {Menu as MenuIcon} from "@mui/icons-material";
import Menu from '@mui/material/Menu';
import * as consts from "../helpers/consts";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const toCreatedTests = () => {
        navigate(consts.links.USER_CREATED_QUIZZES)
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    SmartTest
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
                    }}
                >
                    <MenuItem onClick={toCreatedTests}>Мои тесты</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;