export const searchApiPromise = (searchTerm = '') => {
    return fetch(`http://localhost:3000/posts?search=${searchTerm}`);
};
