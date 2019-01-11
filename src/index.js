import Server from "./libs/boardgameio/server";
import { Game } from "tic-tac-toe-core";

const port = process.env.PORT || 8000;
const server = Server({ games: [Game] });

server.run(port, () => {
  console.log("App is running on port " + port);
});
