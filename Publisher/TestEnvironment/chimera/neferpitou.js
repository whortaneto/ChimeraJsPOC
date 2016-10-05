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

    _createElement = (type, props, ...children) => {
        return { type, props, children }
    }

    _diff = (antigo, novo) => {
        console.log(antigo, novo);
        return novo;
    }

    return {
        importController: (controllerName) => {
            importScripts("../application/" + controllerName);
        },
        buildControllerObject: _buildControllerObject,
        createElement: _createElement,
        diff: _diff
    }
})();

onmessage = e => {
    if (!!Pitou.controller) {
        let functionCall = JSON.parse(e.data);
        
        let isVirtualDom = functionCall.arguments.filter(value => {
            return !!value.chimeraVirtualElement;
        }).length > 0;

        if(isVirtualDom) {
            var antigo = JSON.parse(JSON.stringify(functionCall.arguments[0]));
        }

        if (Pitou.controller.hasOwnProperty(functionCall.methodName) > -1) {
            var resultado = Pitou.controller[functionCall.methodName](...functionCall.arguments);
        }

        if (!!resultado) {
            let resultObject = {};

            if(!!resultado.chimeraVirtualElement) {
                resultObject = {
                    result: Pitou.diff(antigo, resultado)
                }
            }else {

                resultObject = {
                    result: resultado
                }
            }
            postMessage(JSON.stringify(resultObject));
        }
    } else {
        Pitou.importController(e.data);
        let controllerObject = Pitou.buildControllerObject();
        postMessage(JSON.stringify(controllerObject));
    }
}