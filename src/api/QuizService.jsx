
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

export default class QuizService {

    generateQuiz(file, thenDo) {
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

