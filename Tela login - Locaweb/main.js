
const frmMostrar = window.document.querySelector('#show-pass');
const frmPass = window.document.querySelector('#password');
frmMostrar.addEventListener('click', () => {
    
    const valor = frmMostrar.textContent
    if(valor == 'exibir') {
        frmMostrar.textContent = `ocultar`;
        frmPass.setAttribute('type','text');
    }
     else if(valor == 'ocultar') {
        frmMostrar.textContent = `exibir`;
        frmPass.setAttribute('type','password');
    }
})

function acessar() {
    console.log('clicou');
}


