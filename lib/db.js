
export async function getQuestions() {
    const response = await fetch(process.env.API_QUESTIONS);

    return response.json();
}

export async function getChoices(userId) {
    const response = await fetch(process.env.API_CHOICES_GET, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id: userId})
    });

    return response.json();
}

export async function setChoice(questionId, userId, choice) {
    return fetch(process.env.NEXT_PUBLIC_API_CHOICE_SET, {
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({questionId, choice, userId})
    });
}

export async function login(username, password) {
    return fetch(process.env.NEXT_PUBLIC_API_LOGIN, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
    });
}

export async function logout() {
    return fetch(process.env.NEXT_PUBLIC_API_LOGOUT);
}
