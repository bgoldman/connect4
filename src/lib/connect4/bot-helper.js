import Player from './player';

const playerNames = [
    'Andrew',
    'Brandon',
    'Charlie',
    'Donald',
    'Evan',
    'Francine',
    'Gerald',
    'Hope',
    'Irene',
    'Jake',
];

const BotHelper = {
    newPlayer() {
        const randomPlayer = Math.floor(Math.random() * playerNames.length);

        return new Player(playerNames[randomPlayer]);
    },

    /**
     * Suggests the next piece to play. If this were a real app, this method
     * would be intelligent. it would use a good algorithm to determine the next
     * piece to play. However, for the purpose of this app, we're just going to
     * suggest a random piece to play.
     */
    suggestPlay(game) {
        let column = null;

        do {
            column = Math.floor(Math.random() * game.columns);
        } while(!game.isValidPlay(column));

        return column;
    },
};

export default BotHelper;
