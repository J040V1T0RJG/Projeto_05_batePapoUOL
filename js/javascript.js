


let lista;
mensagensProcessadas()


//REQUISITO: ENTRANDO NA SALA

let nome = prompt("Digite o seu nome: ")
let nomeUsuario = {
    name: `${nome}`
}

const enviarNome = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nomeUsuario);

enviarNome.then(tratarSucesso);
enviarNome.catch(tratarError);

function tratarSucesso(resposta) {
    alert(`${nome} cadastrado com sucesso`)
}
function tratarError(erro) {
    nomeErrado()
}


function nomeErrado() {
    nome = prompt(`Nome ja existente\nDigite outro nome novamente:`)
    nomeUsuario = {
        name: `${nome}`
    }

    const enviarNome = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nomeUsuario);

    enviarNome.then(tratarSucesso);
    enviarNome.catch(tratarError);
}

setInterval(permanecerOnline, 5000);
function permanecerOnline() {
    const enviarStatus = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nomeUsuario)
}



//REQUISITO: CHAT
function mensagensProcessadas() {
    const pegarMensagens = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    pegarMensagens.then(renderizarMensagens);

 
}
setInterval(mensagensProcessadas, 3000);

function renderizarMensagens(resposta) {
    lista = resposta.data

    let selecionado = document.querySelector(".conteudo")
    selecionado.innerHTML = ""
    for(let i = 0; i < 100; i++){
        if(lista[i].type == "message") {
            selecionado.innerHTML += `
            <div class="mensagensNormais">
                <div class= "time">(${lista[i].time})</div>
                <p> <strong>${lista[i].from}</strong> para <strong>${lista[i].to}</strong>: ${lista[i].text}</p>
            </div>
            `
        }
        else if(lista[i].type == "status") {
            selecionado.innerHTML += `
            <div class="mensagensStatus">
                <div class="time">(${lista[i].time})</div>
                <p><strong>${lista[i].from}</strong> ${lista[i].text}</p>
            </div>
            `

        }
        else if(lista[i].type == "private_message" ) {
            if (lista[i].to == nome) {

                selecionado.innerHTML += `
                <div class="mensagensReservadas">
                    <div class="time">(${lista[i].time})</div>
                    <div><strong>${lista[i].from}</strong> reservadamente para <strong>${lista[i].to}</strong>: ${lista[i].text}</div>
                </div>
                `
            }  
        }
    }
    document.querySelector(".conteudo ").scrollIntoView(false);
}


//REQUISITO: ENVIO DE MENSAGEM
function enviarMensagen() {
    const mensagem = {
        from: `${nome}`,
        to: "Todos",
        text: document.querySelector("input").value,
        type: "message"
    };
    const enviarMensagens = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagem)
    
    enviarMensagens.then(tratarSucessoMensagem)
    enviarMensagens.catch(tratarErrorMensagem)

    function tratarSucessoMensagem() {
        mensagensProcessadas()
    }

    function tratarErrorMensagem() {
        alert("Erro para mandar mensagem")
        window.location.reload()
    }

    document.querySelector("input").value = ""
    

    
}


//Bônus: Tela de Entrada
function BotaoEntrar() {
    
    const entrar = {
        name: document.querySelector(".telaDeEntrada").querySelector("input").value,
    }
    let nome = entrar.name


const enviarNome = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", entrar);

enviarNome.then(tratarSucesso);
enviarNome.catch(tratarError);

function tratarSucesso(resposta) {
    document.querySelector(".telaDeEntrada").querySelector("input").classList.add("displaynone");
    alert(`${nome} cadastrado com sucesso`)
    console.log(tratarSucesso)
}
function tratarError(erro) {
    const nome = prompt(`Nome ja existente\nDigite outro nome novamente:`)
    let nomeUsuario = {
        name: `${nome}`
    }
}
/*
setInterval(permanecerOnline, 5000);
function permanecerOnline() {
    const enviarStatus = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nomeUsuario)

}
*/
}