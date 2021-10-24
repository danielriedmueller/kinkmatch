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

export async function getMatchPermissions(userId) {
    const response = await fetch(process.env.API_MATCH_PERMISSIONS, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id: userId})
    });

    return response.json();
}

export async function allowMatchWith(userId, allowMatchWith) {
    const response = await fetch(process.env.NEXT_PUBLIC_API_MATCH_ALLOW, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({userId, allowMatchWith})
    });

    return response.json();
}

export async function disallowMatchWith(userId, disallowMatchWith) {
    const response = await fetch(process.env.NEXT_PUBLIC_API_MATCH_DISALLOW, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({userId, disallowMatchWith})
    });

    return response.json();
}

export async function getMatches(userId) {
    const response = await fetch(process.env.API_MATCH_MATCHES, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id: userId})
    });

    return response.json();
}

export async function setChoice(questionId, userId, choice) {
    const response = await fetch(process.env.NEXT_PUBLIC_API_CHOICE_SET, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({questionId, choice, userId})
    });

    return response.json();
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
