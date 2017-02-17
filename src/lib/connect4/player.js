/**
 * This is just a simple object to represent a player. Right now we only store
 * their name. If this were built out into a real game, we'd probably also want
 * to store their email address, a salted password hash, and some stats, like
 * how many games they won, lost, and tied.
 */
class Player {
    constructor(name) {
        this.name = name;
    }
};

export default Player;
