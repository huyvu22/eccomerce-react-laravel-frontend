export const textLimit = (text, limit = 13) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + '...';
}