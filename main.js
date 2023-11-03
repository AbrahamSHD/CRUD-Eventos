import "normalize.css"

let listaEventos = []

const objetoEvento = {
    titulo: '',
    fecha: '',
    hora: '',
    descripcion: ''
}

let editando = false

const formulario = document.querySelector('#form-event')
const tituloInput = document.querySelector('#name-event')
const fechaInput = document.querySelector('#date-event')
const horaInput = document.querySelector('#hour-event')
const descripcionInput = document.querySelector('#decription-event')
const btnAgregar = document.querySelector('#button-submit-of-event')

formulario.addEventListener('submit', validarFormulario)

function validarFormulario(eventoValidar){

    eventoValidar.preventDefault()

    if( tituloInput.value === '' || fechaInput.value === '' || horaInput.value === '' || descripcionInput.value === '' ){
        alert('Todos los campos son obligatorios')
    }else{
        if(editando){
        editarEvento()
        editando = false
        }else{
        objetoEvento.titulo = tituloInput.value
        objetoEvento.fecha = fechaInput.value
        objetoEvento.hora = horaInput.value
        objetoEvento.descripcion = descripcionInput.value

        agregarEvento()
        }
    }
}

function agregarEvento(){
    listaEventos.push({...objetoEvento})

    mostrarEventos()

    formulario.reset()

    limpiarEvento()

}

function limpiarEvento(){

    objetoEvento.titulo = ''
    objetoEvento.fecha = ''
    objetoEvento.hora = ''
    objetoEvento.descripcion = ''

}

function mostrarEventos(){

    limpiarHTML()

    const contenedorEventos = document.querySelector('#event-list')

    listaEventos.forEach( evento => {

        const { titulo, fecha, hora, descripcion } = evento

        const parrafo = document.createElement('li')
        parrafo.textContent = `${titulo} - Fecha: ${fecha} - Hora: ${hora} - ${descripcion}`
        parrafo.dataset.titulo = titulo

        const botonEditar = document.createElement('button')
        botonEditar.onclick = () => cargarEvento(evento)
        botonEditar.textContent = 'Editar'
        botonEditar.classList.add('btn-editar')
        parrafo.append(botonEditar)

        const botonEliminar = document.createElement('button')
        botonEliminar.onclick = () => eliminarEvento(titulo)
        botonEliminar.textContent = 'Eliminar'
        botonEliminar.classList.add('btn-eliminar')
        parrafo.append(botonEliminar)

        const hr = document.createElement('hr')

        contenedorEventos.appendChild(parrafo)
        contenedorEventos.appendChild(hr)

    })

}

function cargarEvento(evento){

    const { titulo, fecha, hora, descripcion } = evento

    tituloInput.value = titulo
    fechaInput.value = fecha
    horaInput.value = hora
    descripcionInput.value = descripcion

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar'

    editando = true

}

function editarEvento(){

    objetoEvento.titulo = tituloInput.value
    objetoEvento.fecha = fechaInput.value
    objetoEvento.hora = horaInput.value
    objetoEvento.descripcion = descripcionInput.value

    listaEventos.map( evento => {
        if(evento.titulo === objetoEvento.titulo){

            evento.titulo = objetoEvento.titulo
            evento.fecha = objetoEvento.fecha
            evento.hora = objetoEvento.hora
            evento.descripcion = objetoEvento.descripcion

        }
    })

    limpiarHTML()
    mostrarEventos()
    formulario.reset()
    formulario.querySelector('button[type="submit"]').textContent = 'Agregar'
    editando = false

}

function eliminarEvento(titulo){
    
    listaEventos = listaEventos.filter( evento => evento.titulo !== titulo )

    limpiarHTML()

    mostrarEventos()

}

function limpiarHTML(){
    const contenedorEventos = document.querySelector('#event-list')

    while( contenedorEventos.firstChild ){
        contenedorEventos.removeChild(contenedorEventos.firstChild) 
    }

}