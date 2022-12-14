function validEmail(email){
    if(!email){
        return false;
    }

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(validRegex)) {
      return true;
    } else {
      return false;
    }
}

function validPassword(password) {
    if(!password){
        return false;
    }

    var validRegex =  /^[a-zA-Z0-9]+$/

    if (password.match(validRegex)) {
        return true;
      } else {
        return false;
      }
}

module.exports = {
    validEmail,
    validPassword
}