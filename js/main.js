const form=document.getElementById("novoItem");
const lista= document.getElementById('lista');

const itens = JSON.parse(localStorage.getItem("itens"))  || [];

//Recuperando os dados do  localstorage e adicionando a lista
itens.forEach((elemento) => {
     adicionaLista(elemento);
     
});


//eventlistenner do botao submit do formulario
form.addEventListener("submit" ,(evento) => {
     evento.preventDefault();

     const nome= evento.target.elements['nome'];
     const quantidade= evento.target.elements['quantidade'];
             
     const itemAtual={
          "nome":nome.value,
          "quantidade":quantidade.value,
          "id": itens.length,
     }
     console.log(itemAtual);
     //retorna o primeiro valor que acha 
     const existe= itens.find(elemento => elemento.nome === nome.value);
    
     
     if (existe){
          itemAtual.id=existe.id;
          
          atualizaQtd(existe.id, itemAtual.quantidade);

          itens[itemAtual.id].quantidade=itemAtual.quantidade;

     } else {
          adicionaLista(itemAtual);
          itens.push(itemAtual);
     }

     
    
     localStorage.setItem("itens",JSON.stringify(itens));
     
     nome.value="";
     quantidade.value="";
});

//função para incluir dados na lista
function adicionaLista(item){
     const novoItem= document.createElement('li');
     novoItem.classList.add("item");

     const numeroItem= document.createElement('strong')
     numeroItem.innerHTML= item.quantidade;
     
     numeroItem.id=item.id;

     novoItem.appendChild(numeroItem);
     novoItem.innerHTML+=item.nome;
     novoItem.appendChild(botaoDeleta(item.id));
      
      
     lista.appendChild(novoItem);
     
    
     
     

     
}

// funcao para alterar a qtd dentro da tag strong
function atualizaQtd(item, qtd){
     document.getElementById(item).innerHTML=qtd;
}

//função que cria o botao para deletar
function botaoDeleta(id){
     const botao=document.createElement('button');
     botao.innerHTML= "X";

     botao.addEventListener('click', function (){
          console.log(this);
     })
     
     

}

function deletaElemento(id){
     console.log(id);
     itens.splice((itens.findIndex(elemento => elemento.id === id)),1);
     localStorage.setItem("itens", JSON.stringify(itens));
     
}