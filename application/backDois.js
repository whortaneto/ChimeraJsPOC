const _methodTestBack2 = function (string) {
    return "That string was chanded by the back-end method (_methodTestBack2) using the string: " + string;
}

const _functionTestBack2 = function (string) {
    return "That string was chanded by the back-end method (_functionTestBack2) using the string: " + string;
}

//Here you set all your public methods.
Pitou.controller = {
    methodTest: _methodTestBack2,
    functionTest: _functionTestBack2
}