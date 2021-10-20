
const checkPasswordStrong = (password) => {

    if(password.length < 6)
        return "Length too short";
    
    var _lowerCase = false, _upperCase = false, _Integer = false, _specialCharactor = false; 
    for(var i=0;i<password.length;i++){
        if(password.charAt(i) >= 'a' && password.charAt(i) <= 'z')
            _lowerCase = true;
        else if(password.charAt(i) >= 'A' && password.charAt(i) <= 'Z')
            _upperCase = true;
        else if(password.charAt(i) >= '0' && password.charAt(i) <= '9')
            _Integer = true;
        else
            _specialCharactor = true;
    }
    
    if(_lowerCase && _upperCase && _Integer && _specialCharactor)
        return "Password Saved";
    else
        return "Password should contain upperCase, LowerCase, Integer and SpecialCharactor";
    
}

module.exports = checkPasswordStrong;