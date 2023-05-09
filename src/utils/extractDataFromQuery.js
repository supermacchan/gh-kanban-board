export const extractDataFromQuery = (link) => {
    const baseUrl = 'https://github.com/';

    if (!link.startsWith(baseUrl)) {
        return null; // link is not a GitHub link
        // add toast notification
    }

    const path = link.slice(baseUrl.length);
    const [owner, repo] = path.split('/');
    return { owner, repo };
}