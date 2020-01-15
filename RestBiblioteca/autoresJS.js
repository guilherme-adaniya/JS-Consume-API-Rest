const app = document.getElementById('app');
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);
const url='http://localhost:8090/autores';

function init() {
  $(document).ready(function() {
  $.ajax({
    url:url,
    type:'GET',
    success: function(result){
      
      var ArrayToSring = JSON.stringify(result);
      var data = JSON.parse(ArrayToSring);
      
      data.forEach(autor => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        
        const h1 = document.createElement('h1');
        h1.textContent = autor.nome;
        
        const btnAtt = document.createElement('a');
        btnAtt.textContent = 'Atualizar';
        btnAtt.setAttribute('onclick', `attAutorForm(${autor.id}, '${autor.nome}');`);
        
        const btnExcluir = document.createElement('a');
        btnExcluir.textContent = 'Remover';
        btnExcluir.setAttribute('onclick', `removerAutor(${autor.id});`);
        
        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(btnAtt);
        card.appendChild(btnExcluir);
      })},
      error: function(error){
        console.log(`Error ${error}`);
      }
    })
  });
}

function modalAddShow() {
  const modal = document.getElementById("modalAddAutores");
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

function attAutorForm(id, nome) {
  $("#nomeAtt").val(nome);
  const modal = document.getElementById("modalAttAutores");
  const span = document.getElementsByClassName("close")[1];
  const btn = document.createElement('input');
  btn.setAttribute('onclick', `attAutor(${id},'${nome}');`)
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

function addAutor() {
  var nome = $('#nome').val();

  const newAutor = {nome:nome};

  $.ajax({
    url:url,
    type:'POST',
    dataType: 'json',
    data:JSON.stringify(newAutor),
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

function attAutor(id, nome) {
  const newNome = $('#nomeAtt').val();
  const autorAtt={nome: newNome};
  
  $.ajax({
    url:url+'/'+id,
    type:'PUT',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(autorAtt),
    success: function(){
      
      const msgSucesso = document.createElement("p");
      msgSucesso.textContent = "Autor Atualizado com Sucesso!";
      document.getElementById('formAtt').appendChild(msgSucesso);

      const modal = document.getElementById("modalAttAutores");
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

function removerAutor(id) {
  $.ajax({
    url: url+ '/'+id,
    type:"DELETE",
    success: function(result) {
      location.reload(true);
    },
    error: function(error){
      console.log(`Error ${error}`);
    }
  })
}