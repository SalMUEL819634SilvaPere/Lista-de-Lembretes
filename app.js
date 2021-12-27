

const getbanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];

const setBanco = (banco) => localStorage.setItem('todoList' , JSON.stringify(banco))
const criarItem = (tarefa, status, indice) =>{

    const item = document.createElement('label');
    //crei um elemento label
    item.classList.add('todo__item');
    //adicionei a classe todo_item no elemento;
    item.innerHTML = `

    <input type="checkbox" ${status} data-indice = ${indice}>
    <div>${tarefa}</div>
    
    <input type="button" value="X" data-indice = ${indice}>

    `

    document.getElementById('todoList').appendChild(item);
    // pegar o elemento pai


}

const LimparTarefas = () => {
// pegar o elemento pai
const todoList = document.getElementById('todoList');

        while (todoList.firstChild){
            todoList.removeChild(todoList.lastChild);
        }   

}

const atualizarTela = () => {

    LimparTarefas()
    const banco = getbanco();
    banco.forEach( (item, indice) => criarItem(item.tarefa, item.status, indice));
    // iterar sobre o array banco, depois acessar o item e chamar o metedo criar item, retorna a tarefa do item
}

atualizarTela();

const inserirItem = (evento) => {

    const tecla = evento.key; 
    // capturar a tecla pressionada
    const texto = evento.target.value
    // receber o valor do alvo, caixa de testo
    if (tecla === 'Enter'){
        const banco = getbanco()
        banco.push({'tarefa': texto, 'status': ''});
        setBanco(banco);
        atualizarTela();
        evento.target.value = '';
    }

}

const removerItem = (indice) =>{
    const banco = getbanco()
    banco.splice(indice, 1);
    setBanco(banco)
    atualizarTela();    
}

const atualizarItem= (indice) =>{
    const banco = getbanco();
    banco[indice].status =  banco[indice].status === '' ? 'Checked' : '';
   setBanco(banco);
    atualizarItem();
}
const clickItem = (evento) => {
    const elemento = evento.target;
    if (elemento.type === 'button'){
        const indice = elemento.dataset.indice; 
        removerItem(indice);
    }else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice; 
        atualizarItem(indice);
    }
}


document.getElementById('newItem').addEventListener('keypress' , inserirItem);
// vai pegar o evento keyPress, e disparar a função inseriritem

document.getElementById('todoList').addEventListener('click' , clickItem);

atualizarTela();