/*
    Module responsible for managing the controllers running in a web worker.
*/
const Meruem = () => {
    const _setController = (controllers, controllerName) => {
        if(controllers.indexOf(controllerName) > -1) {
            return _createControllerObject(controllerName);
        } else {
            throw('Invalid controller');
        }
    }

    const _methodBuilder = (controller, worker) => {
        let controllerWithMethods = {};

        for (method in controller) {
            let methodRefence = method;

            controllerWithMethods[methodRefence] = function () {
                return new Promise(
                    (resolve, reject) => {
                        let functionCall = {
                            methodName: methodRefence,
                            arguments: [].slice.call(arguments)
                        }
                        worker.postMessage(JSON.stringify(functionCall));
                        worker.onmessage = e => {
                            let functionReturn = JSON.parse(e.data);
                            if(functionReturn.hasOwnProperty('result')) {
                                resolve(functionReturn.result);
                            }
                        }
                    }
                )
            }
        }

        return controllerWithMethods;
    }

    const _createControllerObject = controllerName => {
        return new Promise(
            (resolve, reject) => {
                let worker = new Worker('./chimera/neferpitou.js');
                worker.postMessage(controllerName);

                 worker.onmessage = e => {
                    let controller = JSON.parse(e.data);
                    resolve(_methodBuilder(controller, worker));
                }
            }
        );
    }


    return {
        setController: _setController
    }
}

/*
    Encapsulate all modules and expose properties and methods to app.
*/
let Chimera;
window.onload = () => {
    Chimera = (() => {
        const ctrlManager = Meruem();
        let manifest = {};

        (function loadManifest(callback) {
            let xmlHttpRequest = new XMLHttpRequest();
                xmlHttpRequest.overrideMimeType("application/json");
            xmlHttpRequest.open('GET', '/manifest.json', false);
            xmlHttpRequest.onreadystatechange = function () {
                  if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == "200") {
                    callback(xmlHttpRequest.responseText);
                  }
            };
            xmlHttpRequest.send(null);  
        })(function (response) {
            manifest = JSON.parse(response);
        });

        const _loadFiles = (function() {
                // Function which returns a function: https://davidwalsh.name/javascript-functions
            function _load(tag) {
                return function(url) {
                    // This promise will be used by Promise.all to determine success or failure
                    return new Promise(function(resolve, reject) {
                        let element = document.createElement(tag);
                        let parent = 'body';
                        let attr = 'src';

                        // Important success and error for the promise
                        element.onload = function() {
                            resolve(url);
                        };
                        element.onerror = function() {
                            reject(url);
                        };

                        // Need to set different attributes depending on tag type
                        switch(tag) {
                        case 'script':
                            element.async = true;
                            parent = 'head';
                            break;
                        case 'link':
                            element.type = 'text/css';
                            element.rel = 'stylesheet';
                            attr = 'href';
                            parent = 'head';
                        }

                        // Inject into document to kick off loading
                        element[attr] = url;
                        document[parent].appendChild(element);
                    });
                };
            }

            return {
                css: _load('link'),
                js: _load('script'),
                img: _load('img')
            }
        })();

        (function loadViewFiles() {
            let files = manifest.views;
            for (let i = 0; i < files.length; i++) {
                _loadFiles.js(files[i]);
            }
        })();

        const _setController = (controllerName, async) => {
            return ctrlManager.setController(manifest.controllers, controllerName, async);
        }

        return {
            setController: _setController
        }
    })();
}