Chimera.setController('back.js').then(
    function (controller) {

        //Running a loop which will bock the main thread.
        document.getElementById('loopMainThread').onclick = function () {
            console.log('All your UI will be blocked');
            console.log('Loop Main Thread Started');

            for (let i = 0; i < 399999999; i++) {
                Math.random();
            }

            console.log('Loop Main Thread Ended');
        }

        //Running a loop which will run in a web worker.
        document.getElementById('loopMainBackEnd').onclick = function () {
            console.log('All your UI will be ok')
            controller.loopWebWorker('Back-end started').then(
                function (resultado) {
                    console.log(resultado);
                }
            );
        }

        //Sending arguments to controller and consuming the return.
        document.getElementById('methodBack1').onclick = function () {
            controller.methodTest(document.getElementById('text').value).then(
                function (resultado) {
                    document.getElementById("result").innerHTML = resultado;
                }
            );
        }

        //Sending arguments to controller and consuming the return.
        document.getElementById('functionBack1').onclick = function () {
            controller.functionTest(document.getElementById('text').value).then(
                function (resultado) {
                    document.getElementById("result").innerHTML = resultado;
                }
            );
        }
    }
);
