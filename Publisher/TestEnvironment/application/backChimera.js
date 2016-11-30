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

const _createGrid = container => {

    //Simulação de processamento de dados
    const requestResult = _requestAndProcessData(); 

    //Alterando propriedades e estilo do container recebido
    container.props.style = "background-color:powderblue;";

    //A grid pode ser criada dentro do worker e só vai ser enviado o objeto a ser renderizado
    var grid = Pitou.createElement('table', {id: 'personTable', style: 'width: 100%;'},
            Pitou.createElement('tr',{align: 'center'},
                Pitou.createElement('th', {}, 'Nome'),
                Pitou.createElement('th', {}, 'Idade'),
                Pitou.createElement('th', {}, 'Genero')
            )
        );   

    //Adicionando as linhas da grid de acordo com os dados processados
    for (var i = 0 ; i < requestResult.data.length; i++) {
        var row = Pitou.createElement('tr', {align: 'center'},
            Pitou.createElement('td', {}, requestResult.data[i].name),
            Pitou.createElement('td', {}, requestResult.data[i].age),
            Pitou.createElement('td', {}, requestResult.data[i].gender)
        )

        grid.children.push(row);
    }

    //Adiciona a grid ao container recebido
    container.children.push(grid);

    //Retornando um DOM virtual, quando chegar na thread principal será renderizado automáticamente.
    return container;
}

//Especificando métodos públicos.
Pitou.controller = {
    fibonacci: _fibonacci,
    createGrid: _createGrid,
}