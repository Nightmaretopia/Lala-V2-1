const { MessageEmbed, CommandInteraction, ButtonInteraction } = require("discord.js");

const embedTemplate = new MessageEmbed().setTitle('Tic Tac Toe');

module.exports = {
  event: 'interactionCreate',
  name: 'interactionEventHandler',
  enable: 1,
  async execute({int}) {
    if (int instanceof CommandInteraction && int.commandName === 'tic-tac-toe') {
      if (int.options.getUser('opponent') === int.user) return int.reply('You can\'t start a game with yourself!')
      int.reply({
        embeds: [embedTemplate.setDescription(`It's ${int.user}'s turn`)],
        components: createTicTacToeButtons(int.user, int.options.getUser('opponent'))
      });
    } else if (int instanceof ButtonInteraction) {
      if (int.customId.startsWith('ttt')) handleTicTacToeButtonInteraction(int);
    }
  }
}

function handleTicTacToeButtonInteraction(buttonInteraction) {
  const actionRows = buttonInteraction.message.components;
  const playerIds = [actionRows[0], actionRows[2]].map(row => row.components[4].custom_id.substr(-18));

  if (!playerIds.includes(buttonInteraction.user.id)) {
    return buttonInteraction.reply({
      content: 'You are not one of the players!',
      ephemeral: true
    });
  }

  if (playerIds[getRound(actionRows) % 2] === buttonInteraction.user.id) {
    return buttonInteraction.reply({
      content: 'It\'s not your turn yet!',
      ephemeral: true
    });
  }

  const coords = buttonInteraction.customId.match(/ttt_(\d{2})/)[1];
  const futureMessageActionRows = getChangedPlaceHolderComponents(buttonInteraction, coords[0], coords[1]);

  if (getRound(buttonInteraction.message.components) < 5) {
    buttonInteraction.update({
      embeds: [embedTemplate.setDescription(`It's <@!${playerIds[playerIds.indexOf(buttonInteraction.user.id) ? 0 : 1]}>'s turn`)],
      components: futureMessageActionRows
    });
  } else {
    let notAtMiddle = true;
    let winner;

    switch (coords) {
      case '11':
        notAtMiddle = false;
      case '00': case '22':
        if (all3Equal(futureMessageActionRows, [[0, 0], [1, 1], [2, 2]])) {
          winner = buttonInteraction.user;
          break;
        }
        if (notAtMiddle) break;
      case '02': case '20':
        if (all3Equal(futureMessageActionRows, [[2, 0], [1 ,1], [0, 2]])) {
          winner = buttonInteraction.user;
          break;
        }
        break;
    }

    if (!winner && (all3Equal(futureMessageActionRows, createStraightLine(+coords[0])) ||
      all3Equal(futureMessageActionRows, createStraightLine(null, +coords[1]))))
      winner = buttonInteraction.user;

    if (winner) {
      buttonInteraction.update({
        embeds: [
          new MessageEmbed()
            .setTitle('Tic Tac Toe')
            .setDescription(`Winner: ${winner}`)
        ],
        components: futureMessageActionRows
      });
    } else {
      buttonInteraction.update({
        components: futureMessageActionRows
      });
    }
  }
}

function getChangedPlaceHolderComponents(buttonInteraction, x, y) {
  const message = buttonInteraction.message;
  const actionRows = message.components;
  const button = actionRows[x].components[y]

  button.label = actionRows[0].components[4].custom_id.substr(-18) === buttonInteraction.user.id ? '⭕' : '❌';
  button.disabled = true;
  return actionRows;
}

function getRound(actionRows) {
  let blankCount = 0;

  for (let i = 0; i < actionRows.length; i++) {
    const buttons = actionRows[i].components;
    for (let j = 0; j < buttons.length; j++) {
      if (buttons[j].label === '⬜') blankCount++;
    }
  }

  return 10 - blankCount;
}

function all3Equal(actionRows, xyArr) {
  const [ax, ay] = xyArr[0];
  const [bx, by] = xyArr[1];
  const [cx, cy] = xyArr[2];

  const a = actionRows[ax].components[ay].label;
  const b = actionRows[bx].components[by].label;
  const c = actionRows[cx].components[cy].label;

  return a === b && b === c;
}

function createStraightLine(constantX, constantY) {
  const arr = [];
  for (let i = 0; i < 3; i++) {
    arr.push(constantX ? [constantX, i] : [i, constantY]);
  }
  return arr;
}

function createTicTacToeButtons(playerA, playerB) {
  const componentsArr = [];

  for (let x = 0; x < 3; x++) {
    const buttonArr = [];

    for (let y = 0; y < 3; y++) {
      buttonArr.push({ type: 'BUTTON', customId: `ttt_${x}${y}`, label: '⬜', style: 'SECONDARY' });
    }
    buttonArr.push({ type: 'BUTTON', customId: `ttt_${x}_line`, label: '🟥', style: 'PRIMARY', disabled: true });

    componentsArr.push({ type: 'ACTION_ROW', components: buttonArr });
  }

  componentsArr[0].components.push({ type: 'BUTTON', customId: `player_${playerA.id}`, label: `⭕: ${playerA.username}`, style: 'SECONDARY', disabled: true });
  componentsArr[1].components.push({ type: 'BUTTON', customId: 'player_separator', label: '🆚', style: 'SECONDARY', disabled: true })
  componentsArr[2].components.push({ type: 'BUTTON', customId: `player_${playerB.id}`, label: `❌: ${playerB.username}`, style: 'SECONDARY', disabled: true });

  return componentsArr;
}
