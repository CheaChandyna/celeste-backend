export async function signInUser(inputUsername, inputPassword) {
    const errors = []

    const userError = usernameValidation(inputUsername)
    const passError = passwordValidation(inputPassword)

    if (userError) errors.push(userError)
    if (passError) errors.push(passError)

    return errors
}

function usernameValidation(username) {
    if (!username) return "Username is requird."
    if (username && username.length < 4) return "Username must be at least 4 letters."
    if (username && !username.match(/^[a-zA-Z0-9]+$/)) return "Username conatain illegal character."

    return null
}

function passwordValidation(password) {
    if (!password) return "Password is requird."
    if (password && password.length < 8) return "Passowrd must be at least 8 Charater."
    if (password && !password.length > 25) return "password must not exceed 25 character."

    return null
}
