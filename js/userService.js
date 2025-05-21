function users() {
    document.getElementById('cardHeader').innerHTML = '<h5> Listado de usuarios </h5>'
    const PLATZI_ENDPOINT = 'https://api.escuelajs.co/api/v1/users/'
    fetch(PLATZI_ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        },
    })
        .then((response) => {
            return response.json().then(
                data => {
                    return {
                        status: response.status,
                        info: data
                    }
                }
            )
        })
        .then((result) => {
            console.log('resultado', result)
            if (result.status === 200) {
                let listUsers = `
            <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Rol</th>
                    <th scope="col">Acción</th>                    
                    </tr>
                </thead>
            <tbody>
            `;
                result.info.forEach(element => {
                    listUsers = listUsers + `
                <tr>
                    <td>${element.id}</td>
                    <td>${element.name}</td>
                    <td>${element.role}</td>
                    
                    <td><button type="button" class="btn btn-outline-info" onclick="getUser('${element.id}')">Ver</button></td>
                </tr>
                `
                });
                
                document.getElementById('info').innerHTML = listUsers
            }
            else {
                document.getElementById('info').innerHTML = 'No existen usuarios en la BD'
            }
        })
}

function getUser(idUser) {
    const PLATZI_ENDPOINT = 'https://api.escuelajs.co/api/v1/users/' + idUser
    fetch(PLATZI_ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        },
    })
        .then((result) => {
            return result.json().then(
                data => {
                    return {
                        status: result.status,
                        body: data

                    }
                }
            )
        })

        .then((response) => {
            if (response.status === 200) {
                const user = response.body
                const modalUser = `
                    <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Ver usuario</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="card">
                                                         <td><img src="${element.image}" class="img-thumbnail" alt="imagen de la categoria"></td>

                                        <h5 class="card-title">Informacion del usuario</h5>
                                        <p class="card-text"> Nombre: ${user.name} </p>
                                        <p class="card-text"> Rol: ${user.role} </p>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                    </div>
                `
                document.getElementById('viewModal').innerHTML = modalUser
                const modal = new bootstrap.Modal(
                    document.getElementById('modalUser')
                )
                modal.show()
            }
            else {
                document.getElementById('info').innerHTML = '<h3> No se encontro el usuario en la api</h3>'
            }
        })
}