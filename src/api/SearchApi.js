export const searchApiPromise = (searchTerm = '') => {
    return fetch(`https://volunteer-hub-server-dun.vercel.app/posts?search=${searchTerm}`);
};
