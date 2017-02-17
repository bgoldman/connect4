import { BotHelper, Game } from './src/lib/connect4';

const game = new Game(BotHelper.newPlayer(), BotHelper.newPlayer());

console.log(`New Connect4 Game: ${game.player1.name} vs ${game.player2.name}. Let the battle begin!`);
console.log("\n");

while (!game.isOver()) {
    const player = game.playerForTurn();
    const column = BotHelper.suggestPlay(game);
    const turn = game.turn;

    game.play(player, column);

    const row = game.columnHeight(column);

    console.log(`Turn ${turn}: ${player.name} played a piece in column ${column + 1} and it fell to row ${row}`);
    console.log(`The longest streak is currently ${game.longestStreak}, held by ${game.longestStreakPlayer.name}`);
    console.log(game.printableState());
    console.log("\n");
}

if (!game.winner) {
    console.log('The game is a tie. That\'s no fun!');
} else {
    console.log(`The winner is ${game.winner.name}! Take that, ${game.loser.name}!`);
}
