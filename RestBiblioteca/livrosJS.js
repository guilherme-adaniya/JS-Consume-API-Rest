const app = document.getElementById('app');
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);
const url='http://localhost:8090/livros';
const urlGenero = "http://localhost:8090/generos";


// ==================== GET Livros ===========================
function init() {
  $.ajax({
    url:urlGenero,
    type:'GET',
    success: function(result) {
      result.forEach(genero => {
        const option = document.createElement('option');
        option.textContent = genero;
        const selectGeneroAttForm = document.getElementById('generoAtt');
        selectGeneroAttForm.appendChild(option);
      })
    },
    error: function(error){
      console.log(`Error ${error}`);
    }
  });
  $.ajax({
    url:urlGenero,
    type:'GET',
    success: function(result) {
      result.forEach(genero => {
        const option = document.createElement('option');
        option.textContent = genero;
        const selectGeneroAttForm = document.getElementById('genero');
        selectGeneroAttForm.appendChild(option);
      })
    },
    error: function(error){
      console.log(`Error ${error}`);
    }
  });
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
          btnAtt.setAttribute('onclick', `attLivroForm(${livro.id}, '${livro.titulo}', '${livro.autor}', '${livro.genero}');`);
  
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
  });
}


// ==================== POST Livros ==========================
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


// ==================== DELETE Livros ========================
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


// ==================== PUT Livros ===========================
function attLivro(id, titulo, autor, genero) {
  const newTitulo = $('#tituloAtt').val();
  const newAutor = $('#autorAtt').val();
  let newGenero = $("#generoAtt option:selected").val();
  if($("#generoAtt").val() != "Selecione o Genero" && $("#generoAtt").val() != genero){
    newGenero = $("#generoAtt").val();
  } else {
    newGenero = $("#generoAtt").val(genero);
  }
  const livroAtt={
    titulo: newTitulo,
    autor: newAutor,
    genero: newGenero
  }
  
  $.ajax({
    url:url+'/'+id,
    type:'PUT',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(livroAtt),
    success: function(){
      
      const msgSucesso = document.createElement("p");
      msgSucesso.textContent = "Livro Atualizado com Sucesso!";
      document.getElementById('formAtt').appendChild(msgSucesso);
      const modal = document.getElementById("modalAttLivros");
      const span = document.getElementsByClassName("close")[1];
      span.onclick = function() {
        modal.style.display = "none";
        window.location.reload();
      }
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
          window.location.reload();
        }
      } 

    },
    error: function(error){
      console.log(`Error ${error}`);
    }
  });
}


// ============ Form modal Atualização de Livros =============
function modalAddShow() {
  const modal = document.getElementById("modalAddLivros");
  const span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";
  span.onclick = function() {
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  } 
}


// ============ Form modal Adicionar Livros =============
function attLivroForm(id, titulo, autor, genero) {
  $('#tituloAtt').val(titulo);
  $('#autorAtt').val(autor);
  const modal = document.getElementById("modalAttLivros");
  const span = document.getElementsByClassName("close")[1];
  const btn = document.createElement('input');
  btn.setAttribute('onclick', `attLivro(${id},'${titulo}','${autor}','${genero}');`)
  btn.setAttribute('type', "button");
  btn.setAttribute('id', 'myBtn');
  btn.setAttribute('value', 'Att');
  document.getElementById('formAtt').appendChild(btn);
  modal.style.display = "block";
  span.onclick = function() {
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  } 
}

