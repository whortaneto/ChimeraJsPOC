Chimera.setController('backDois.js').then(
    function (controller) {

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