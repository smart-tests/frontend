import {useEffect, useState} from "react";
import {getCurrentUserInfo} from "../../api/QuizService";
import {useNavigate} from "react-router-dom";

const useAuth = (required = true) => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getUserInfo();
    }, [])

    function getUserInfo() {
        getCurrentUserInfo(
            () => {},
            (data) => {setUser(data)},
            handleRequiredAuth()
        );
    }

    function handleRequiredAuth() {
        return (error) => {
            if (required) {
                navigate("/login");
            } else {
                console.log(error);
            }
        }
    }

    function update() {
        getUserInfo();
    }

    return {
        user,
        update
    }
}

export default useAuth;