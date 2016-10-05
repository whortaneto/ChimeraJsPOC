/*
    Encapsulate all modules and expose properties and methods to app.
*/
let Chimera;
window.onload = () => {
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

        const _setBooleanProp = (element, name, value) => {
          if (value) {
            element.setAttribute(name, value);
            element[name] = true;
          } else {
            element[name] = false;
          }
        }

        const _isCustomProp = (name) => {
          return false;
        }

        const _setProp = (element, name, value) => {
          element.setAttribute(name, value);

            if (_isCustomProp(name)) {
                return;
            } else if (name === 'className') {
                element.setAttribute('class', value);
            } else if (typeof value === 'boolean') {
                _setBooleanProp(element, name, value);
            } else {
                element.setAttribute(name, value);
            }
        }

        const _setProps = (element, props) => {
            Object.keys(props).forEach(name => {
                _setProp(element, name, props[name]);
            });
        }

        const _createDomElement = node => {
            if (typeof node === 'string') {
                return document.createTextNode(node);
            }

            let element = document.getElementById(node.props.id);

            if(!element) {
                element = document.createElement(node.type);
            }
            
            _setProps(element, node.props);
            node.children
                .map(_createDomElement)
                .forEach(element.appendChild.bind(element));

            return element;
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
                                    if(!!functionReturn.result.chimeraVirtualElement) {
                                        resolve(_createDomElement(functionReturn.result));
                                    } else {
                                        resolve(functionReturn.result);
                                    }
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
        Module responsible for Virtual Dom
    */
    const Pouf = () => {

        const _createVirtualElement = domObject => {
            const domElement = typeof domObject == "string" ?
                document.getElementById(domObject) : 
                domObject;

            let virtualElement = {
                type: domElement.tagName,
                props: {},
                children : [],
                chimeraVirtualElement: true
            }

            let len = domElement.attributes.length;
            for (let i = 0; i < len; i++) {
                virtualElement.props[domElement.attributes[i].nodeName] =
                    domElement.attributes[i].nodeValue;
            }

            len = domElement.children.length;
            for (let i = 0; i < len; i++) {
                virtualElement.children.push(
                    _createVirtualElement(domElement.children[i])
                );
            }

            return virtualElement
        }

        return {
            createVirtualElement : _createVirtualElement
        }
    }

    Chimera = (() => {

        const ctrlManager = Meruem();
        const virtualDom = Pouf();
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
            function _load(tag) {
                return function(url) {
                    return new Promise(function(resolve, reject) {
                        let element = document.createElement(tag);
                        let parent = 'body';
                        let attr = 'src';

                        element.onload = function() {
                            resolve(url);
                        };
                        element.onerror = function() {
                            reject(url);
                        };

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
            setController: _setController,
            element: virtualDom.createVirtualElement
        }
    })();
}