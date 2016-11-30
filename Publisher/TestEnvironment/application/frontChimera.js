Chimera.setController('backChimera.js').then(
    controller => {
        //Adicionando fibonacci na thread principal
        const fibonacci = n => (n < 2) ? 1 : fibonacci(n-2) + fibonacci(n-1);

        //No clique
        document.getElementById('fibonacciMainThread').onclick = () => {
            const inputValue = document.getElementById('fibonacciValue').value;
            //Executando o fibonacci na thread principal. Isso pode bloquear a interface de usuário.
            let resultado = fibonacci(parseInt(inputValue));

            //Adiciona resultado na tela.
            document.getElementById("result").innerHTML = "O resultado do calculo é: " + resultado;
        }

        //No clique
        document.getElementById('fibonacciWorkerThread').onclick = () => {
            const inputValue = document.getElementById('fibonacciValue').value;
            //Executando o fibonacci em thread paralela utilizando ChimeraJS. Nunca irá bloquear a interface de usuário.
            controller.fibonacci(parseInt(inputValue)).then(resultado => {
                //Adiciona resultado na tela de forma assíncrona.
                document.getElementById("result").innerHTML = "O resultado do calculo é: " + resultado;
            });
        }

        //No clique
        document.getElementById('createGrid').onclick = () => {

            //Criado dom virtual a partir de um container e enviado para o web worker
            controller.createGrid(Chimera.element('gridContainer'));
        }

    }
);
