import { toast } from "react-toastify";

export const extractDataFromQuery = (link) => {
    const baseUrl = 'https://github.com/';

    if (!link.startsWith(baseUrl)) {
        toast.error('Please enter a valid GitHub link');
        return null; // link is not a GitHub link
    }

    const path = link.slice(baseUrl.length);
    const [owner, repo] = path.split('/');

    if (!owner || !repo) {
        toast.warn('Please enter a valid link to a specific GitHub repository');
        return null; // link does not lead to a repository
    }

    return { owner, repo };
}