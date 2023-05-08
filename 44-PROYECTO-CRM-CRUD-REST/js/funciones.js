
export const verifyInputs = (obj = {}) => {

    return Object.values(obj).every( input => input !== '');
}