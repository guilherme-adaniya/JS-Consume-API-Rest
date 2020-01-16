const app = document.getElementById('app');
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);
const url='http://localhost:8090/usuarios';

function init() {
  $(document).ready(function() {
    $.ajax({
      url:url,
      type:'GET',
      success: function(result){
        
        var ArrayToSring = JSON.stringify(result);
        var data = JSON.parse(ArrayToSring);
        
        data.forEach(usuario => {
          const card = document.createElement('div');
          card.setAttribute('class', 'card');
          
          const h1 = document.createElement('h1');
          h1.textContent = usuario.nome;

          const p = document.createElement('p');
          p.textContent = usuario.email;
          
          const btnAtt = document.createElement('a');
          btnAtt.textContent = 'Atualizar';
          btnAtt.setAttribute('onclick', `attUsuarioForm(${usuario.id}, '${usuario.nome}','${usuario.email}');`);
          
          const btnExcluir = document.createElement('a');
          btnExcluir.textContent = 'Remover';
          btnExcluir.setAttribute('onclick', `removerUsuario(${usuario.id});`);
          
          container.appendChild(card);
          card.appendChild(h1);
          card.appendChild(p);
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
  const modal = document.getElementById("modalAddUsuario");
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

function attUsuarioForm(id, nome, email) {
  $("#nomeAtt").val(nome);
  $("#emailAtt").val(email);
  const modal = document.getElementById("modalAttUsuario");
  const span = document.getElementsByClassName("close")[1];
  const btn = document.createElement('input');
  btn.setAttribute('onclick', `attUsuario(${id},'${nome}','${email}');`)
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

function addUsuario() {
  var nome = $('#nome').val();
  var email = $('#email').val();
  var senha = $('#senha').val();
  var matricula = $('#matricula').val();

  const newUsuario = {
    nome:nome,
    email:email,
    senha:senha,
    matricula:matricula
  };

  $.ajax({
    url:url,
    type:'POST',
    dataType: 'json',
    data:JSON.stringify(newUsuario),
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

function attUsuario(id, nome, email) {
  const newNome = $('#nomeAtt').val();
  const newEmail = $('#emailAtt').val();
  const usuarioAtt={
    nome: newNome,
    email: newEmail
  };
  
  $.ajax({
    url:url+'/'+id,
    type:'PUT',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(usuarioAtt),
    success: function(){
      
      const msgSucesso = document.createElement("p");
      msgSucesso.textContent = "Usuario Atualizado com Sucesso!";
      document.getElementById('formAtt').appendChild(msgSucesso);

      const modal = document.getElementById("modalAttUsuario");
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

function removerUsuario(id) {
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