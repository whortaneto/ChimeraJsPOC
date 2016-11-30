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

const worker = new Worker('./application/workerDefault.js');

//No clique
document.getElementById('fibonacciWorkerThread').onclick = () => {
    const inputValue = document.getElementById('fibonacciValue').value;

    //Necessário criar um objeto que especifique qual função vai ser executada e qual valor vai ser enviado.
    const message = {
    	function: 'fibonacci',
    	value: parseInt(inputValue)
    }

    //Executando o fibonacci em thread paralela utilizando worker tradicional. Nunca irá bloquear a interface de usuário.
    //Precisa transformar a mensagem em string.
    worker.postMessage(JSON.stringify(message));
}

//No clique
document.getElementById('createGrid').onclick = () => {

	//Necessário criar um objeto que especifique qual função vai ser executada.
	//A função a ser executada pode somente requisitar e processar os dados.
    const message = {
    	function: 'requestData'
    }

    //Precisa transformar a mensagem em string.
    worker.postMessage(JSON.stringify(message));
}

//Receber mensagens do worker.
worker.onmessage = e => {
    let resultado = JSON.parse(e.data);
    //Precisa validar qual task foi concluida.
    if (resultado.function === 'fibonacci') {
    	//Adiciona resultado na tela quando receber a mensagem de retorno do worker.
    	document.getElementById("result").innerHTML = "O resultado do calculo é: " + resultado.retorno;
    } else if (resultado.function === 'requestData') {
    	//Precisa criar toda a grid manipulando DOM real já que o worker apenas retorna os dados.
    	const container = document.getElementById('gridContainer');

    	//Alterando estilo diretamente no container, causa repaint.
    	container.style = "background-color:powderblue;";

    	const table = document.createElement('table');
    	table.id = 'personTable';
    	table.style = 'width: 100%;';

    	const header = document.createElement('tr');
    	header.align= 'center';

    	var columnName = document.createElement('td');
   		columnName.appendChild(document.createTextNode("Nome"));

    	var columnAge = document.createElement('td');
    	columnAge.appendChild(document.createTextNode("Idade"));

    	var columnGender = document.createElement('td');
    	columnGender.appendChild(document.createTextNode("Genero"));

    	header.appendChild(columnName);
    	header.appendChild(columnAge);
    	header.appendChild(columnGender);
    	table.appendChild(header);

    	for (var i = 0; i < resultado.retorno.data.length; i++) {
    		const row = document.createElement('tr');
    		row.align= 'center';

	    	columnName = document.createElement('td');
	   		columnName.appendChild(document.createTextNode(resultado.retorno.data[i].name));

	    	columnAge = document.createElement('td');
	    	columnAge.appendChild(document.createTextNode(resultado.retorno.data[i].age));

	    	columnGender = document.createElement('td');
	    	columnGender.appendChild(document.createTextNode(resultado.retorno.data[i].gender));

	    	row.appendChild(columnName);
	    	row.appendChild(columnAge);
	    	row.appendChild(columnGender);
	    	table.appendChild(row);
    	}


    	container.appendChild(table);

    	
    }
}
