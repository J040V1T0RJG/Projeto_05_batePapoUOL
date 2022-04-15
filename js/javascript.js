
const pegarMensagens = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
pegarMensagens.then(mensagensProcessadas);

let lista;


//REQUISITO: CHAT
function mensagensProcessadas(resposta) {
    const pegarMensagens = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    pegarMensagens.then(mensagensProcessadas);

    lista = resposta.data
    console.log(resposta)

    let selecionado = document.querySelector(".conteudo")
    selecionado.innerHTML = ""
    for(let i = 80; i < 100; i++){
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
        else if(lista[i].type == "private_message") {
            selecionado.innerHTML += `
            <div class="mensagensReservadas">
                <div class="time">(${lista[i].time})</div>
                <div><strong>${lista[i].from}</strong> reservadamente para <strong>${lista[i].to}</strong>: ${lista[i].text}</div>
            </div>
            `
        }
    }
    document.querySelector(".conteudo ").scrollIntoView(false);
}
setInterval(mensagensProcessadas, 30000);


//REQUISITO: ENTRANDO NA SALA
const nome = prompt("Digite o seu nome: ")
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
    const nome = prompt(`Nome ja existente\nDigite outro nome novamente:`)
    let nomeUsuario = {
        name: `${nome}`
    }
}

setInterval(permanecerOnline, 5000);
function permanecerOnline() {
    const enviarStatus = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nomeUsuario)

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
}

