 const regValidation = (params) => {
    const decodedLogin = decodeURI(`${params.login}`);
    if(params.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/) &&  (decodedLogin.match(/^[a-zA-Z0-9а-яА-Я]+([._]?[a-zA-Z0-9а-яА-Я]+)*$/))) {
       console.log('Validation ok')
        return 'ok';
    } else {
        console.log('Error while pushing submit button')
        return 'error';
    }
}
module.exports = {
    regValidation
}