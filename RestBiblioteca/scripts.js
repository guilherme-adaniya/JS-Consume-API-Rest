const app = document.getElementById('app');
const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

var request = new XMLHttpRequest();
request.open('get', 'http://localhost:8090/livros', true);
// request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)
request.onload = function(){
  var data = JSON.parse(this.response);
  if(request.status >= 200 && request.status<400){
    data.forEach(livro => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');
      const h1 = document.createElement('h1');
      h1.textContent = livro.titulo;
      const pAutor = document.createElement('p');
      pAutor.textContent = livro.autor;
      const pGenero = document.createElement('p');
      pGenero.textContent = livro.genero;
      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(pAutor);
      card.appendChild(pGenero);
    });
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = 'Algo de errado não esta certo, ¯\_(ツ)_/¯'
    app.appendChild(errorMessage)
  }
}
request.send();
