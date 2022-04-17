let nome;
let nomeUsuario;
let lista;

mensagensProcessadas()

//Bônus: Tela de Entrada
function botaoEntrar() {

    document.querySelector(".telaDeEntrada").querySelector("input").classList.add("displaynone");
    document.querySelector(".telaDeEntrada").querySelector("button").classList.add("displaynone");
    document.querySelector(".telaDeEntrada").querySelector(".loading").classList.remove("displaynone");
    document.querySelector(".telaDeEntrada").querySelector("p").classList.remove("displaynone");

    setTimeout(entrandoCarregando, 2000);
    function entrandoCarregando() {
        nome = document.querySelector(".telaDeEntrada").querySelector("input").value
        nomeUsuario = {
            name: `${nome}`
        }
    
        const enviarNome = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nomeUsuario);
    
        enviarNome.then(tratarSucesso);
        enviarNome.catch(tratarError);
    
        function tratarSucesso(resposta) {
            document.querySelector(".topo").classList.remove("displaynone");
            document.querySelector(".conteudo").classList.remove("displaynone");
            document.querySelector(".base").classList.remove("displaynone");
            document.querySelector(".telaDeEntrada").classList.add("displaynone");
            alert(`${nome} cadastrado com sucesso`);
        }
        function tratarError(erro) {
            nomeErrado()
        }
        function nomeErrado() {
            document.querySelector(".telaDeEntrada").querySelector("input").classList.remove("displaynone");
            document.querySelector(".telaDeEntrada").querySelector("button").classList.remove("displaynone");
            document.querySelector(".telaDeEntrada").querySelector(".loading").classList.add("displaynone");
            document.querySelector(".telaDeEntrada").querySelector("p").classList.add("displaynone");

            alert("Nome ja existente\nDigite outro nome novamente:")
            document.querySelector(".telaDeEntrada").querySelector("input").value = ""
        }
    }
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
    document.querySelector(".conteudo").scrollIntoView(false); 
}


//REQUISITO: ENVIO DE MENSAGEM
function enviarMensagen() {
    const mensagem = {
        from: `${nome}`,
        to: "Todos",
        text: document.querySelector(".base").querySelector("input").value,
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
    document.querySelector(".base").querySelector("input").value = "" 
}