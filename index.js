const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
  // Ler a lista de números do arquivo CSV
  const data = fs.readFileSync('participants.csv', 'utf8').replace(/\r/g, '').split('\n');
  // Criar uma lista de participantes
  let participants = data.map((line) => {
    const [code, name] = line.split(',');
    return {
      code,
      name,
    };
  });

  // Exibir os vencedores
  res.render('index.ejs', {
    participants,
  });
});

app.get('/sortear', (req, res) => {
  // Ler a lista de números do arquivo CSV
  const data = fs.readFileSync('participants.csv', 'utf8').replace(/\r/g, '').split('\n');
  // Criar uma lista de participantes
  let participants = data.map((line) => {
    const [code, name] = line.split(',');
    return {
      code,
      name,
    };
  });

  // Sortear três números da lista sem repetições
  const TOTAL_WINNERS = 3;
  const winners = [];
  
  let count = 0;
  // Enquanto houver participantes e não houver vencedores o suficiente, tenta encontrar vencedores
  while (participants.length && winners.length < TOTAL_WINNERS) {
    count++
    const [winner] = participants.sort(() => Math.random() -.5);
    const winnersNames = winners.map(win => win.name);

    if (!winnersNames.includes(winner.name)) {
      // Insere participante na lista de vencedores
      winners.push(winner);

      // Remove da lista participantes com mesmo nome
      participants = participants.filter(participant => participant.name !== winner.name);
    }
  }

  // Exibir os vencedores
  res.render('sortear.ejs', {
    winners,
  });
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});