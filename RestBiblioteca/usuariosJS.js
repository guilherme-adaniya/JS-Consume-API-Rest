const app = document.getElementById('app');
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);
const url='http://localhost:8090/livros';

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