export function generateIdentifier() {
    return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    );
}

export function truncateString(str: string, length: number, ending = "...") {
    return str.length > length ? str.substring(0, length) + ending : str;
}

export function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPassword(password: string) {
    return password.length >= 8;
}
