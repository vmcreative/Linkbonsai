export const getSessionToken = () => sessionStorage.getItem('linkbonsai') || null;
export const setSessionToken = (token) => sessionStorage.setItem('linkbonsai', token);
export const removeSessionToken = () => sessionStorage.removeItem('linkbonsai');
