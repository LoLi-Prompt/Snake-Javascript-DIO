let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = []; // cria a snake como uma lista de coordenadas no plano cartesiano

snake [0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = 'right'

//array da função draw food
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    context.fillStyle = 'lightgreen';
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = 'blue';
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

// Esta função abaixo é responsável por criar os pixeis de 'comida' para a snake e por adicionar um certo tamanho cada vez que a snake entra em contato com esse pixel de comida

function drawFood() {
    context.fillStyle = 'red'
    context.fillRect(food.x, food.y, box, box)
}

// Este bloco abaixo é responsável pela captura das teclas correspondentes através do addEventListener e a chamada da função 'update' que atualiza passando o parâmetro da tecla pressionada a snake.

document.addEventListener('keydown', update)

function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left'
    if (event.keyCode == 38 && direction != 'down') direction = 'up'
    if (event.keyCode == 39 && direction != 'left') direction = 'right'
    if (event.keyCode == 40 && direction != 'up') direction = 'down'
}

// agora vamos criar uma função de atualizar a snake com set interval

function iniciarJogo() {
    
    // Este bloco de if abaixo é responsável por fazer a snake nunca escapar a tela quando for em direção ao limite de blocos, desta forma quando no limite da tela sua cabeça assumirá a posição 0 da direção correspondente e vice e versa.

    if (snake[0].x > 15 * box && direction == 'right') snake[0].x = 0
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box
    if (snake[0].y > 15 * box && direction == 'down') snake[0].y = 0
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box

    // Agora vamos criar abaixo o loop for que irá checar se a cabeça da snake[0] se choca com seu corpo que seria o 'i' no loop for da função criarCobrinha e retornar um alert de end game e atualizar a página quando acontecer.

    for (i = 1; i < snake.length; i ++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo)
            alert('GAME OVER!!!')
        }
    }
    
    criarBG()
    criarCobrinha()
    drawFood()

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if (direction == 'right') snakeX += box
    if (direction == 'left') snakeX -= box
    if (direction == 'up') snakeY -= box
    if (direction == 'down') snakeY += box

    
    // Este if é responsável por remover o pixel final da snake para que ela não cresça infinitamente sem que toque o bloco 'comida'

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop()
    } 
    else {
        food.x = Math.floor(Math.random() * 15 + 1) * box
        food.y = Math.floor(Math.random() * 15 + 1) * box
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead) // metodo que cria o primeiro pixel da snake
}

let jogo = setInterval(iniciarJogo, 200)