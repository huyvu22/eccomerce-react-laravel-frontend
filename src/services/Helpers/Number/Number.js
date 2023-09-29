export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export function roundedNumber(number = 0) {
    return Number(number.toFixed(1))
}

export function generateRandomToken(length) {
    // Define characters that can be used in the token
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let token = '';
    for (let i = 0; i < length; i++) {
        // Generate a random index to pick a character from the characters string
        const randomIndex = Math.floor(Math.random() * characters.length);
        // Append the randomly selected character to the token
        token += characters.charAt(randomIndex);
    }

    return token;
}




