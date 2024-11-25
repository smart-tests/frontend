
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const saveQuiz = (quizData, onProcess, onFinish, onError) => {
    onProcess(quizData);

    return fetch(`${backendUrl}/api/v1/quiz/create`,
        {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(quizData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => onFinish(data))
        .catch(err => onError(err));
}

export const login = (login, password, onProcess, onFinish, onError) => {
    onProcess(login, password);

    const formData = new FormData();
    formData.append('username', login);
    formData.append('password', password);

    return fetch(`${backendUrl}/api/v1/user/login`,
        {
            credentials: "include",
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(json => onFinish(json))
        .catch(err => onError(err));
}

export const logout = (onProcess, onFinish, onError) => {
    onProcess();

    return fetch(`${backendUrl}/api/v1/user/logout`,
        {
            credentials: "include",
            method: "POST"
        })
        .then(res => res.ok ? onFinish() : onError(null))
        .catch(err => onError(err));
}

export const getCurrentUserInfo = (onProcess, onFinish, onError) => {
    onProcess();

    return fetch(`${backendUrl}/api/v1/user/info`,
        {
            credentials: "include"
        })
        .then(res => res.json())
        .then(json => onFinish(json))
        .catch(err => onError(err));
}

export const getCurrentUserOwnerGroups = (onProcess, onFinish, onError) => {
    onProcess();

    return fetch(`${backendUrl}/api/v1/group`,
        {
            credentials: "include"
        })
        .then(res => res.json())
        .then(json => onFinish(json))
        .catch(err => onError(err));
}

export const createGroup = (data, onProcess, onFinish, onError) => {
    onProcess(data);

    return fetch(`${backendUrl}/api/v1/group`,
        {
            credentials: "include",
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(json => onFinish(json))
        .catch(err => onError(err));
}

export const getGroupInfo = (id, onProcess, onFinish, onError) => {
    onProcess(id);

    return fetch(`${backendUrl}/api/v1/group/${id}`,
        {
            credentials: "include"
        })
        .then(res => res.json())
        .then(json => onFinish(json))
        .catch(err => onError(err));
}

export const addGroupMember = (data, onProcess, onFinish, onError) => {
    onProcess(data);

    fetch(`${backendUrl}/api/v1/group/add-member`,
        {
            credentials: "include",
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(json => onFinish(json))
        .catch(err => onError(err));
}

export const getGroupQuizzes = (groupId, onProcess, onFinish, onError) => {
    onProcess(groupId);

    fetch(`${backendUrl}/api/v1/group/${groupId}/quizzes`,
        {
            credentials: "include"
        }
        )
        .then(res => res.json())
        .then(json => onFinish(json))
        .catch(err => onError(err));
}

export const getUserCreatedQuizzes = (onProcess, onFinish, onError) => {
    onProcess();

    fetch(`${backendUrl}/api/v1/quiz/all-created`,
        {
            credentials: "include"
        }
    )
        .then(res => res.json())
        .then(json => onFinish(json))
        .catch(err => onError(err));
}

export const addQuizToGroup = (groupId, data, onProcess, onFinish, onError) => {
    onProcess(data);

    fetch(`${backendUrl}/api/v1/group/${groupId}/add-quiz`,
        {
            credentials: "include",
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(json => onFinish(json))
        .catch(err => onError(err));
}

export const getQuizForPassing = (quizId, onProcess, onFinish, onError) => {
    onProcess(quizId);

    return fetch(`${backendUrl}/api/v1/quiz/passing/${quizId}`,
        {
            credentials: "include"
        })
        .then(res => res.json())
        .then(json => onFinish(json))
        .catch(err => onError(err));
}

export const checkPassedQuiz = (quizId, data, onProcess, onFinish, onError) => {
    onProcess(data);

    fetch(`${backendUrl}/api/v1/quiz/passing/${quizId}`,
        {
            credentials: "include",
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(json => onFinish(json))
        .catch(err => onError(err));
}

export const getAvailableQuizzes = (onProcess, onFinish, onError) => {
    onProcess();
    let data;

    fetch(`${backendUrl}/api/v1/quiz/education`,
        {
            credentials: "include"
        })
        .then(res => res.json())
        .then(json => {
            onFinish(json);
            data = json;
        })
        .catch(err => onError(err));

    return data;
}

export const getCurrentUserResults = (onProcess, onFinish, onError) => {
    onProcess();
    let data;

    fetch(`${backendUrl}/api/v1/quiz/education/results`,
        {
            credentials: "include"
        })
        .then(res => res.json())
        .then(json => {
            onFinish(json);
            data = json;
        })
        .catch(err => onError(err));

    return data;
}

export const getQuizResults = (id, onProcess, onFinish, onError) => {
    onProcess(id);

    return fetch(`${backendUrl}/api/v1/quiz/teaching/results/${id}`,
        {
            credentials: "include"
        })
        .then(res => res.json())
        .then(json => onFinish(json))
        .catch(err => onError(err));
}

export const getQuizInfo = (quizId, onProcess, onFinish, onError) => {
    onProcess(quizId);

    return fetch(`${backendUrl}/api/v1/quiz/${quizId}`,
        {
            credentials: "include"
        })
        .then(res => res.json())
        .then(json => onFinish(json))
        .catch(err => onError(err));
}

export const downloadQuiz = (onProcess, onFinish, onError) => {
    onProcess();

    return fetch(`${backendUrl}/api/v1/quiz/export`,
        {
            credentials: "include"
        })
        .then(res => res.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute('download', 'Test.docx');
            document.body.appendChild(link);
            link.click();
            link.remove();
        })
        .catch(err => onError(err));
}

export default class QuizService {

    generateQuiz(file, thenDo, onProcess) {
        onProcess();

        const formData = new FormData();
        formData.append('document', file);
        formData.append('questionsNumber', 5);

        return fetch(`${backendUrl}/api/v1/quiz/generate`,
            {
                credentials: "include",
                method: "POST",
                body: formData
            })
        .then(res => res.json())
        .then(json => thenDo(json))
        .catch(err => console.log(err));
    }
}

