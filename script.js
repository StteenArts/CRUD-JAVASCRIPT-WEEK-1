let btnEnviar = document.getElementById('enviar')
let tbody = document.getElementById('listbody')


if(localStorage.getItem('persons')){
    var persons = JSON.parse(localStorage.getItem('persons'));
    var index = persons[persons.length - 1].id;
}else{
    var persons = []
    var index = 0;
}

function render(){
    tbody.innerHTML = '';
    createTableBody(persons);
}

function createTableBody(persons){
    persons.forEach(person => {
        tbody.innerHTML += `
        <tr>
            <td>${person.id}</td>
            <td>${person.name}</td>
            <td>${person.lastName}</td>
            <td>
                <button class="btn btn-info " value="${person.id}" data-action="editar">Editar</button>
                <button class="btn btn-warning " value="${person.id}" data-action="ver">Ver</button>
                <button class="btn btn-danger " value="${person.id}" data-action="eliminar">Eliminar</button>
            </td>
        </tr>`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    render();
});


btnEnviar.addEventListener('click', function(e){
    e.preventDefault();
    let name = document.getElementById('name');
    let lastName = document.getElementById('last_name');

    let person = {
        'id': ++index,
        'name': name.value,
        'lastName': lastName.value
    }
    persons.push(person);
    localStorage.setItem('persons', JSON.stringify(persons));

    // Renderizar la tabla
    render(persons);

    // Limpio los campos para resetear
    name.value = '';
    lastName.value = '';

    Swal.fire({
        title: "Usuario Agregado!",
        text: `El usuario:( #${person.id} )${person.name} ${person.lastName}. Ha sido Agregado correctamente`,
        icon: "success"
    });
})

tbody.addEventListener('click', (e) => {
    // Validamos si estamos presionando un boton
    if(e.target.tagName === 'BUTTON'){
        console.log('Se presiono un boton');
        if(e.target.dataset.action == 'eliminar'){
            Swal.fire({
                title: '¿Estás seguro?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Obtenemos el id del objeto
                    let id = Number(e.target.value);

                    // 1. Encontramos el índice que sea igual el presionado
                    let indice = persons.findIndex(person => person.id === id);

                    // Muestra notificación
                    Swal.fire({
                        title: "Usuario Eliminado!",
                        text: `El usuario: ${persons[indice].name} ${persons[indice].lastName}. Ha sido eliminado correctamente`,
                        icon: "error"
                    });

                    // 2. Si se encuentra el índice (no es -1), eliminarlo
                    if (indice !== -1) {
                        // Utilizamos splice para encontrar el indice (persons.lenght) y indicamos que solamente sera un objeto (1)
                        persons.splice(indice, 1);
                        localStorage.setItem('persons', JSON.stringify(persons));
                    }

                    // eliminar la fila del DOM
                    render();
                }
            });
        }else if(e.target.dataset.action == 'editar'){
            let indice = persons.findIndex(person => person.id == e.target.value);

            alert(persons.find(person => person.id == e.target.value));
            
        }else if(e.target.dataset.action == 'ver'){
            alert('Hora de ver');
        }
    }
})
