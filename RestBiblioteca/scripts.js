const app = document.getElementById('app');
const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);
const url='http://localhost:8090/livros';
const urlGenero = "http://localhost:8090/generos";

function addLivro() {

  var titulo = $('#titulo').val();
  var autor = $('#autor').val();
  var genero = $('#genero').children("option:selected").val();

  const newLivro={
    titulo: titulo,
    autor: autor,
    genero: genero
  }

  $.ajax({
    url:url,
    type:'POST',
    dataType: 'json',
    data:JSON.stringify(newLivro),
    contentType: 'application/json',
    success: function (result) {
      if(result){
        location.reload(true);
      }
    },
    error: function(error){
      console.log(`Error ${error}`);
    }
  });
}

$(document).ready(function() {
  $.ajax({
    url:url,
    type:'GET',
    success: function(result){

      var ArrayToSring = JSON.stringify(result);
      var data = JSON.parse(ArrayToSring);

      data.forEach(livro => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const h1 = document.createElement('h1');
        h1.textContent = livro.titulo;

        const pAutor = document.createElement('p');
        pAutor.textContent = livro.autor;

        const pGenero = document.createElement('p');
        pGenero.textContent = livro.genero;
        
        const btnAtt = document.createElement('a');
        btnAtt.textContent = 'Atualizar';
        btnAtt.setAttribute('onclick', `attLivro(${livro.id});`);

        const btnExcluir = document.createElement('a');
        btnExcluir.textContent = 'Remover';
        btnExcluir.setAttribute('onclick', `removerLivro(${livro.id});`);

        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(pAutor);
        card.appendChild(pGenero);
        card.appendChild(btnAtt);
        card.appendChild(btnExcluir);
    })},
    error: function(error){
      console.log(`Error ${error}`);
    }
  })
  $.ajax({
    url:urlGenero,
    type:'GET',
    success: function(result) {
      result.forEach(genero => {
        const option = document.createElement('option');
        option.textContent = genero;
        const selectGenero = document.getElementById('genero');
        selectGenero.appendChild(option);
      })
    },
    error: function(error){
      console.log(`Error ${error}`);
    }
  })
});

function removerLivro(id) {
  $.ajax({
    url:url+'/'+id,
    type:'DELETE',
    headers: {'Access-Control-Allow-Origin': '*'},
    success: function(result) {
      console.log(result);
      location.reload(true);
    },
    error: function(error){
      console.log(`Error ${error}`);
    }
  })
}