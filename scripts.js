document.addEventListener('DOMContentLoaded', () => {
    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const mensajeInput = document.querySelector('#mensaje');
    const divError = document.querySelector('#div-error');
    const btnSubmit = document.querySelector('#submit')
    const spinner = document.querySelector('#spinner')
    const formulario = document.querySelector('#formulario');
    
    nombreInput.addEventListener('blur', validar);
    emailInput.addEventListener('blur', validar);
    mensajeInput.addEventListener('blur', validar);
    formulario.addEventListener('submit', enviarForm);
    
    const formInfo = {
        nombre: '',
        email: '',
        mensaje: ''
    }

    window.addEventListener('load', () => {
        formulario.reset();
        comprobarFormInfo();
    });

    function validar(event) {
        if(event.target.value.trim() === '') {
            mostrarAlerta(`El campo ${event.target.id} no puede ir vacío`);
            return;   
        }

        if(event.target.id === 'nombre' && event.target.value.length > 30) {
            mostrarAlerta('El nombre es demasiado largo');
            formInfo[event.target.name] = '';
            return;
        }

        if(event.target.id === 'email' && !validarEmail(event.target.value)) {
            mostrarAlerta('E-mail no válido');
            formInfo[event.target.name] = '';
            return;
        }

        if(event.target.id === 'mensaje' && event.target.value.length > 500) {
            mostrarAlerta('El mensaje debe de ser de máximo 500 caracteres')
            formInfo[event.target.name] = '';
            return;
        }
        
        formInfo[event.target.name] = event.target.value.trim().toLowerCase();
        comprobarFormInfo()
    };
    
    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const result = regex.test(email);
        return result;
    };
    
    function comprobarFormInfo() {
        if(Object.values(formInfo).includes('')) {
            btnSubmit.classList.add('disabled');
            btnSubmit.disabled = true;
        } else {
            btnSubmit.classList.remove('disabled')
            btnSubmit.disabled = false
        }
    };

    function enviarForm(event) {
        event.preventDefault()
        
        spinner.classList.remove('hide-spinner');
        
        setTimeout(() => {
            spinner.classList.add('hide-spinner');
            
            Swal.fire({
                title: "Éxito!",
                text: "Tu información se envió correctamente",
                icon: "success",
                confirmButtonText: "Genial!"
            });
        }, 3000);
        
        Object.keys(formInfo).forEach(key => formInfo[key] = '');
        formulario.reset();
        comprobarFormInfo();
    };

    function mostrarAlerta(mensaje) {
        limpiarAlerta() 

        const msjError = document.createElement('p');
        msjError.classList.add('error');
        msjError.textContent = mensaje
        divError.appendChild(msjError)

        setTimeout(() => { msjError.remove() }, 4000);
    };

    function limpiarAlerta() {
        const alerta = document.querySelector('.error')
        alerta ? alerta.remove() : null;
    };
});