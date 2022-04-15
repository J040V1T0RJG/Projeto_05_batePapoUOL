//const name = prompt("Digite o seu nome: ")
//const nome = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants")
const pegarMensagens = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
pegarMensagens.then(mensagensProcessadas);

let lista;


//MENSAGENS DO SERVIDOR
function mensagensProcessadas(resposta) {
    const pegarMensagens = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    pegarMensagens.then(mensagensProcessadas);

    lista = resposta.data
    console.log(resposta)

    let selecionado = document.querySelector(".conteudo")
    selecionado.innerHTML = ""
    for(let i = 5; i < 100; i++){
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
                <p><strong>${lista[i].from}</strong>././.${lista[i].text}</p>
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









//ADICIONAR MENSAGENS
const enviarMensagens = axios.post()


function enviarMensagen() {
    const mensagem = {
        from: "chunchumaru",
        to: "Todos",
        text: document.querySelector("input").value,
        type: "message"
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