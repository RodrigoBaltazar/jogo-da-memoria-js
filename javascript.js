    const cartoes = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

    
    
    
    function resetGame() {
        alert("O jogo será reiniciado!"); // Substitua com a lógica de reset do jogo
    }

    function goBack() {
        window.location.href = "www.rodrigobaltazar.com.br"; // Substitua com a lógica de navegação
    }

    function embaralhar(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

    const cartoesEmbaralhados = embaralhar(cartoes);
    console.log(cartoesEmbaralhados);

    document.addEventListener('DOMContentLoaded', () => {
        const board = document.getElementById('grid-8x8');
      
        cartoesEmbaralhados.forEach((cardValue) => {
          const card = document.createElement('div');
          card.className = 'card';
          card.dataset.value = cardValue;
          card.innerText = '?';
          board.appendChild(card);
        
          board.addEventListener('click', (e) => {
            const cliqueinoCartao = e.target;
          
            if (cliqueinoCartao.classList.contains('card')) {
                cliqueinoCartao.innerText = cliqueinoCartao.dataset.value; // Mostra o valor
              // Lógica para verificar pares vai aqui
            }
          });

        });

        let firstCard = null; // Para armazenar a primeira carta clicada
let lockBoard = false; // Para evitar cliques enquanto as cartas estão "virando"

board.addEventListener('click', (e) => {
  const clickedCard = e.target;

  // Verifica se clicou em uma carta válida
  if (!clickedCard.classList.contains('card') || clickedCard.classList.contains('revealed') || lockBoard) {
    return;
  }

  // Mostra o valor da carta
  clickedCard.innerText = clickedCard.dataset.value;
  clickedCard.classList.add('revealed');

  // Se não há uma carta selecionada, armazena esta como a primeira
  if (!firstCard) {
    firstCard = clickedCard;
    return;
  }

  // Compara as duas cartas
  if (firstCard.dataset.value === clickedCard.dataset.value) {
    console.log('Par encontrado!');
    firstCard = null; // Reseta para a próxima rodada
  } else {
    // Bloqueia o tabuleiro para evitar novos cliques durante a animação
    lockBoard = true;

    // Volta as cartas após 1 segundo
    setTimeout(() => {
      firstCard.innerText = '?';
      clickedCard.innerText = '?';
      firstCard.classList.remove('revealed');
      clickedCard.classList.remove('revealed');
      firstCard = null;
      lockBoard = false; // Desbloqueia o tabuleiro
    }, 1000);
  }
});

      });

      

      