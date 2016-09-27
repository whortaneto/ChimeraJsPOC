const _loopWebWorker = function (startMessage) {
    console.log(startMessage);

    for(let i = 0; i < 999999999; i++) {
        Math.random();
    }

    return "Back-end ended";
}

const _methodTestBack1 = function (string) {
    return "That string was chanded by the back-end method (_methodTestBack1) using the string: " + string;
}

const _functionTestBack1 = function (string) {
    return "That string was chanded by the back-end method (_functionTestBack1) using the string: " + string;
}

//Here you set all your public methods.
Pitou.controller = {
    loopWebWorker: _loopWebWorker,
    methodTest: _methodTestBack1,
    functionTest: _functionTestBack1
}
