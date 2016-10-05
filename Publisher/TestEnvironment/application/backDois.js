const _methodTestBack2 = function (string) {
    return "That string was chanded by the back-end method (_methodTestBack2) using the string: " + string;
}

const _functionTestBack2 = function (string) {
    return "That string was chanded by the back-end method (_functionTestBack2) using the string: " + string;
}

const _addCatTable = container => {
    container.props.style = "background-color:powderblue;";

    let teste = Pitou.createElement('table', {id: 'catTable', style: 'width: 100%;'},
        Pitou.createElement('tr',{align: 'center'},
            Pitou.createElement('th', {}, 'Name'),
            Pitou.createElement('th', {}, 'Breed'),
            Pitou.createElement('th', {}, 'Fur Color')
        ),
        Pitou.createElement('tr', {align: 'center'},
            Pitou.createElement('td', {}, 'Futterkiste'),
            Pitou.createElement('td', {}, 'Sphynx'),
            Pitou.createElement('td', {}, 'Grey')
        ),
        Pitou.createElement('tr', {align: 'center'},
            Pitou.createElement('td', {}, 'Moctezuma'),
            Pitou.createElement('td', {}, 'Ocicat'),
            Pitou.createElement('td', {}, 'Orange')
        ),
        Pitou.createElement('tr', {align: 'center'},
            Pitou.createElement('td', {}, 'Handel'),
            Pitou.createElement('td', {}, 'Bombaim'),
            Pitou.createElement('td', {}, 'Black')
        ),
        Pitou.createElement('button', {
            id: 'addNewCat',
            onclick: function () {
                console.log('addNewCat');
            }
        }, 'Add a new cat')
    )

    container.children.push(teste);

    return container;
}

//Here you set all your public methods.
Pitou.controller = {
    methodTest: _methodTestBack2,
    functionTest: _functionTestBack2,
    addCatTable: _addCatTable
}