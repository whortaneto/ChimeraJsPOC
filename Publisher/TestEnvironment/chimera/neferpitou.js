/*Module responsible for encapsulate the back-end scripts in a web worker*/
const Pitou = (() => {
    let controller = {}, hasController = false;

    _buildControllerObject = () => {
        let controllerObject = {};

        for (method in Pitou.controller) {
            controllerObject[method] = method;
        }
        
        return controllerObject;
    }

    return {
        importController: (controllerName) => {
            importScripts("../application/" + controllerName);
        },
        buildControllerObject: _buildControllerObject
    }
})();

onmessage = e => {
    if (!!Pitou.controller) {
        let functionCall = JSON.parse(e.data);

        if (Pitou.controller.hasOwnProperty(functionCall.methodName) > -1) {
            var resultado = Pitou.controller[functionCall.methodName](...functionCall.arguments);
        }

        if (!!resultado) {
            let resultObject = {
                result: resultado
            }
            postMessage(JSON.stringify(resultObject));
        }
    } else {
        Pitou.importController(e.data);
        let controllerObject = Pitou.buildControllerObject();
        postMessage(JSON.stringify(controllerObject));
    }
}