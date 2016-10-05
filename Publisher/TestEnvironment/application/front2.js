Chimera.setController('backDois.js').then(
    function (controller) {

        document.getElementById('addCatTable').onclick = () => {
            controller.addCatTable(Chimera.element('catTableContainer')).then(
                function (virtualDom) {
                    //document.getElementById('catTableContainer').appendChild(virtualDom);
                    console.log(virtualDom);
                }
            );
        }

        document.getElementById('methodBack2').onclick = function () {
            controller.methodTest(document.getElementById('text').value).then(
                function (resultado) {
                    document.getElementById("result").innerHTML = resultado;
                }
            );
        }

        document.getElementById('functionBack2').onclick = function () {
            controller.functionTest(document.getElementById('text').value).then(
                function (resultado) {
                    document.getElementById("result").innerHTML = resultado;
                }
            );
        }
    }
);