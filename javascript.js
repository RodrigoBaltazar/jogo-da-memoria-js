function resetGame() {
  location.reload(true);
}
        // Valores das cartas
        const cartoes = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

        // Mapeamento de números para imagens
        const imagens = {
            1: 'img/imagem1.png',
            2: 'img/imagem2.png',
            3: 'img/imagem3.png',
            4: 'img/imagem4.png',
            5: 'img/imagem5.png',
            6: 'img/imagem6.png',
            7: 'img/imagem7.png',
            8: 'img/imagem8.png'
        };

        // Função para embaralhar o array
        function embaralhar(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        const cartoesEmbaralhados = embaralhar(cartoes);

        // Variáveis de controle do jogo
        let firstCard = null; // Primeira carta clicada
        let lockBoard = false; // Travar tabuleiro durante comparação

        // Configuração inicial
        document.addEventListener('DOMContentLoaded', () => {
            const board = document.getElementById('grid-8x8');

            cartoesEmbaralhados.forEach((cardValue) => {
                // Criar cada carta
                const card = document.createElement('div');
                card.className = 'card';
                card.dataset.value = cardValue;

                // Imagem do verso
                const backImage = document.createElement('img');
                backImage.src = 'img/imagem_verso.png'; // Verso da carta
                backImage.className = 'back-face';

                // Imagem da frente
                const frontImage = document.createElement('img');
                frontImage.src = imagens[cardValue]; // Mapeia número à imagem
                frontImage.className = 'front-face';
                frontImage.style.display = 'none'; // Oculta inicialmente

                card.appendChild(backImage);
                card.appendChild(frontImage);
                board.appendChild(card);

                // Adiciona evento de clique
                card.addEventListener('click', () => {
                    if (lockBoard || card.classList.contains('revealed')) return;

                    // Mostrar imagem frontal
                    card.querySelector('.back-face').style.display = 'none';
                    card.querySelector('.front-face').style.display = 'block';
                    card.classList.add('revealed');

                    if (!firstCard) {
                        firstCard = card; // Armazena primeira carta
                    } else {
                        // Comparação
                        if (firstCard.dataset.value === card.dataset.value) {
                            console.log('Par encontrado!');
                            firstCard = null; // Reseta seleção
                        } else {
                            lockBoard = true; // Trava tabuleiro
                            setTimeout(() => {
                                // Esconde as cartas se não forem iguais
                                firstCard.querySelector('.front-face').style.display = 'none';
                                firstCard.querySelector('.back-face').style.display = 'block';
                                card.querySelector('.front-face').style.display = 'none';
                                card.querySelector('.back-face').style.display = 'block';
                                firstCard.classList.remove('revealed');
                                card.classList.remove('revealed');
                                firstCard = null; // Reseta primeira carta
                                lockBoard = false; // Libera tabuleiro
                            }, 1000);
                        }
                    }
                });
            });
        });