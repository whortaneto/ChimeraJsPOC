const _fibonacci = n => (n < 2) ? 1 : _fibonacci(n-2) + _fibonacci(n-1);

//Simula uma requisição de dados
const _requestAndProcessData = () => {
    for(let i = 0; i < 99999999; i++) {
        Math.random();
    }

    return {
        data: [
            {
                name: "Brandom",
                age: "21",
                gender: "Female",
            },
            {
                name: "Julius",
                age: "19",
                gender: "Female",
            },
            {
                name: "Carolyn",
                age: "30",
                gender: "Male",
            }
        ]
    }
}

//Receber mensagens da thread principal.
onmessage = e => {
	const task = JSON.parse(e.data);
	let resultado;

	if (task.function === 'fibonacci') {
		resultado = _fibonacci(task.value);
	} else if (task.function === 'requestData') {
		resultado = _requestAndProcessData();
	}

	const retorno = {
		function: task.function,
		retorno:resultado,
	}

	//Precisa transformar o resultado em string
	postMessage(JSON.stringify(retorno));
}