// ref: https://stackoverflow.com/questions/50818474/how-to-properly-test-if-the-type-of-the-result-is-a-javascript-function-in-jes

const requestPost = require('../src/client/js/updateUI')
const updateUIFunction = requestPost.updateUI

describe('Test "updateUI()" should be a function' , () => {
    test('It should be a function', () => {
        expect(typeof updateUIFunction).toBe("function");
    });
})