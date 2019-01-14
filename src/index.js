import "babel-polyfill";
import { Server } from "./libs/boardgame.io/server";
import { Game } from "tic-tac-toe-core";

const port = process.env.PORT || 8000;
const server = Server({ games: [Game], singlePort: true });

server.run(port, () => {
  console.log("App is running on port " + port);
});
