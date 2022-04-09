// pegando o container onde estão todas as notas
const notesContainer = document.querySelector(".container");

// botao de adicionar nova nota
const addBtn = document.querySelector(".add-note");

// evento para adicionar nova nota
addBtn.addEventListener('click', addNote);

// chamada da função para que quando recarregue a página as informações permaneçam
getNotes().forEach(note => {

    // variavel para pegar o conteuro do objeto(nota) 
    const noteElement = createNotesElement(note.id, note.content);

    // inserindo na pagina os elementos padrão
    notesContainer.insertBefore(noteElement, addBtn);
});

// pegar todas as notas do Local Storage
function getNotes(){
    // retorna o que tem existente no LocalStorage, se não tiver nada retorna um array vazio
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

// salvar notas
function saveNotes(notes){
    localStorage.setItem('stickynotes-notes', JSON.stringify(notes));
}

// cria um novo elemento HTML de notas
function createNotesElement(id, content){
    const element = document.createElement('textarea');

    // adicionando a classe css no elemento
    element.classList.add("note");

    // atribuindo o valor do conteudo para o elemento
    element.value = content;

    // placeholder para o elemento
    element.placeholder = "Escreva aqui";

    // evento para quando salvar as alterações
    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });

    // evento para excluir a nota
    element.addEventListener("dblclick", () => {
        const deletarMesmo = confirm("Tem certeza que deseja excluir essa anotação?");

        if(deletarMesmo){
            deleteNote(id, element);
        }
    });

    return element;
}

// adicionar uma nota nota e salvar ela
function addNote(){
    
    // pega todas as notas existentes no localStorage
    const notasExistentes = getNotes();

    // criando um objeto novo com as propriedades da nota
    const noteObject = {
        id: Math.floor(Math.random() * 10000),
        content: ""
    };

    // vinculando os dados do objeto a uma variavel
    const noteElement = createNotesElement(noteObject.id, noteObject.content);

    // inserindo no container da pagina ao recarregar as propriedades do objeto
    notesContainer.insertBefore(noteElement, addBtn);

    // adicionando a variavel com os dados da nova nota para a variavel do localStorage
    notasExistentes.push(noteObject);

    // savando a nova nota
    saveNotes(notasExistentes);
}

// atualizando a informação da nota
function updateNote(id, newContent){

    // pega todas as notas existentes no localStorage
    const notes = getNotes();

    // pegando apenas a que corresponde o id 
    const targetNote = notes.filter(note => note.id == id)[0];

    // update no conteudo da nota
    targetNote.content = newContent;

    // salvando as alterações
    saveNotes(notes);
}

// apagar notas
function deleteNote(id, element){

    // pegando somente o id correspondente
    const notes = getNotes().filter(note => note.id != id);
    
    // salvando 
    saveNotes(notes);

    // removendo o elemento da pagina
    notesContainer.removeChild(element);
}