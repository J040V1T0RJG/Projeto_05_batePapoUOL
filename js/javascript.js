//const name = prompt("Digite o seu nome: ")
const nome = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants")
const mensagens = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
mensagens.then(mensagensProcessadas);

let lista;


//MENSAGENS DO SERVIDOR
function mensagensProcessadas(resposta) {

    lista = resposta.data
    console.log(resposta)

    let selecionado = document.querySelector(".conteudo")
    for(let i = 95; i < 100; i++){
        if(lista[i].type == "message") {
            selecionado.innerHTML += `
            <div class="mensagensNormais">
                <div class= "time">(${lista[i].time}) ././.</div>
                <p> <strong>${lista[i].from}</strong> para <strong>${lista[i].to}</strong>: ${lista[i].text}</p>
            </div>
            `
        }
        else if(lista[i].type == "status") {
            selecionado.innerHTML += `
            <div class="mensagensStatus">
                <div class="time">(${lista[i].time})</div>
                <p>${lista[i].from}././.${lista[i].text}</p>
            </div>
            `

        }
        else if(lista[i].type == "private_message") {
            selecionado.innerHTML += `
            <div class="mensagensReservadas">
                <div class="time">(${lista[i].time})</div>
                <div>${lista[i].from} reservadamente para ${lista[i].to}: ${lista[i].text}</div>
            </div>
            `
        }
    }

}


//ADICIONAR MENSAGENS
function enviarMensagen() {
    const mensagem = {
        text: document.querySelector("input").value
    };
}

/*function recarregar() {
    Location.reload()
}

setInterval(recarregar, 3000)*/







/* enviar dados(post)
const requisição = axios/uol.get(`https:`, dados);
chamar função/tratar dados
requisição.then(tratarSucesso);
requisicao.catch(tratarErro);
*/