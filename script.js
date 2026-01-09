let btnEnviar = document.getElementById('enviar')
let tbody = document.getElementById('listbody')
let persons = [];
let index = 0;


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

    tbody.innerHTML += `
        <tr>
            <td>${person.id}</td>
            <td>${person.name}</td>
            <td>${person.lastName}</td>
            <td><button class="btn btn-danger p-1" id="${person.id}" value="${person.id}">Eliminar</button></td>
        </tr>`;
        name.value = '';
        lastName.value = '';

        Swal.fire({
            title: "Usuario Agregado!",
            text: `El usuario:( #${person.id} )${person.name} ${person.lastName}. Ha sido Agregado correctamente`,
            icon: "success"
        });
})

tbody.addEventListener('click', (e) => {

    if(e.target.tagName === 'BUTTON'){
        let id = Number(e.target.value);

        // 1. Encontrar el índice
        let indice = persons.findIndex(person => person.id === id);
        // Muestra notificación
        Swal.fire({
            title: "Usuario Eliminado!",
            text: `El usuario: ${persons[indice].name} ${persons[indice].lastName}. Ha sido eliminado correctamente`,
            icon: "error"
        });

        // 2. Si se encuentra el índice (no es -1), eliminarlo
        if (indice !== -1) {
            persons.splice(indice, 1);
        }
        // eliminar la fila del DOM
        e.target.closest('tr').remove();

        console.log(persons)
    }
})







