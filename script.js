// varre o codigo indicando erros de forma mais rigorosa
"use strict"
// este é um objeto JSON...
const sons = {
    "A": "boom.wav",
    "S": "clap.wav",
    "D": "hihat.wav",
    "F": "kick.wav",
    "G": "openhat.wav",
    "H": "ride.wav",
    "J": "snare.wav",
    "K": "tink.wav",
    "L": "tom.wav",
}
// o texto pode ser o texto que esta dentro da div, 
//nome do indentificador (class,id,etc...)
const criarDiv = (texto) => {
    // cria uma div porem apenas na memoria, ainda nao esta no DOM
    const div = document.createElement("div");
    //cria o nome da classe da div
    div.classList.add("key");
    //conteudo da div vem do (texto) da funçao
    div.textContent = texto;
    //cria um id com o conteudo do texto, 
    //neste caso como sera apenas uma letra, tudo bem,
    //porem se tiver um conteudo maior precisa criar de outra forma 
    div.id = texto;
    //insere a div criada no DOM(document/HTML)
    // appendchild adiciona um filho ao o container, neste caso uma DIV
    // que foi o elemento criado acima
    document.getElementById("container").appendChild(div);
}
/*cria as DIVs usando a função acima porem dessa forma é errado,
pois se fosse pra ser assim seria mais facil criar pelo html mesmo
      criarDiv("A"); criarDiv("S");criarDiv("D");
                 FORMA CORRETA ABIXO */
//
//essa funçao pega os identificadores dos sons da linha 3
const exibir = (sons) => {
//retorna do objeto sons, todas as chaves (A,S,D,F...) em um array
//o foreach varre todos os elementos desse array e usa a funcao
//criarDIV...
    Object.keys(sons).forEach(criarDiv);
//como nao tem um return pode ser tudo na mesma linha sem usar as {}
}
//recebe a const letra
const tocarSom = (letra) => {
//novo som recebe da pasta sounds a const sons a 
//letra referente a cada som
    const audio = new Audio (`./sounds/${sons[letra]}`);
    //coleta o audio de cima  da play
    audio.play();
}
//pega o id da letra e adiciona uma classe
const adicionarEfeito = (letra) => document.getElementById(letra)
                                        .classList.add("active");
const removerEfeito = (letra) => {
    //pega o id da letra
    const div = document.getElementById(letra);
    //remove o efeito active da div
    const removeActive = () => div.classList.remove("active");
    //remove o efeito active quando a transition acabar
    div.addEventListener("transitionend", removeActive);

}
//recebe o evento abaixo, no caso o click
const ativarDiv = (evento) => {
    let letra = "";
    // se o evento for click executa a liha abaixo do if
    if (evento.type == "click") {
        //recebe o evento, o alvo do evento e o id de onde clicou
        letra = evento.target.id;
    } else {
        //pega o key do evento que no 
        //caso é a letra do teclado digitada
        //touppercase é pra deixar ser maiuscula ou min.
        letra = evento.key.toUpperCase();
    }
    //como a ativaçao do som foi apartir do container e não da DIV
    // as duas linhas abaixo sao para validar se ha a letra clicada 
    //dentro do objeto Json, se nao quando clicar fora dos 
    //botoes da erro no console
    //verifica se tem a letra debtro so objeto
    const letraListada = sons.hasOwnProperty(letra);
    // se ha a letra toca o som.
    if (letraListada){
        adicionarEfeito(letra);
        //executa a funçao tocarSom referente a letra
        tocarSom(letra);
        removerEfeito(letra);
    }
    
}
exibir(sons);
//como as divis nao estao criadas no html i click sera no container
document.getElementById("container")
//ativa a funcao ativarSom
.addEventListener("click", ativarDiv);
//pega na janela quando aprtar tecla ativa a funcao ativarDiv;
window.addEventListener ("keydown", ativarDiv);