const form = document.querySelector('form');
const codigoInput = document.querySelector('#codigo');
const eventosUl = document.querySelector('#eventos');
const statusP = document.querySelector('#status');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const codigo = codigoInput.value;
  const url = `https://api.postmon.com.br/v1/rastreio/ect/${codigo}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      eventosUl.innerHTML = '';

      data.historico.forEach(evento => {
        const li = document.createElement('li');
        const dataSpan = document.createElement('span');
        const localSpan = document.createElement('span');
        const situacaoSpan = document.createElement('span');

        dataSpan.textContent = evento.data;
        localSpan.textContent = evento.local;
        situacaoSpan.textContent = evento.situacao;

        li.appendChild(dataSpan);
        li.appendChild(localSpan);
        li.appendChild(situacaoSpan);
        eventosUl.appendChild(li);
      });

      const ultimoEvento = data.historico[data.historico.length - 1];
      statusP.textContent = `Status: ${ultimoEvento.situacao}`;
    })
    .catch(error => {
      console.error('Erro:', error);
      statusP.textContent = 'Ocorreu um erro ao obter o status da encomenda.';
    });
});
