export const searchApiPromise = (searchTerm = '') => {
    return fetch(`https://volunteer-hub-server-fawn.vercel.app/posts?search=${searchTerm}`);
};
