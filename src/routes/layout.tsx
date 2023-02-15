import { component$, useStore, $ } from '@builder.io/qwik';
import { loader$ } from '@builder.io/qwik-city';

import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Routes from '.';

export interface GameMode {
  gameStarted: boolean;
  board: (string | null)[];
  p2: boolean;
  result: {
    gameEnd: boolean,
    winner: number | null,
  }
}

export const serverTimeLoader = loader$(() => {
  return {
    date: new Date().toLocaleString(),
  };
});

export default component$(() => {
  const serverTime = serverTimeLoader.use();
  const game: GameMode = useStore({
    gameStarted: false,
    board: Array(9).fill(null),
    p2: false,
    result: { gameEnd: false, winner: null },
  });

  const setGame = $(() => {
    const { gameStarted } = game;
    if (gameStarted) {
      game.board = Array(9).fill(null);
      game.result = { gameEnd: false, winner: null }
    }

    game.gameStarted = gameStarted ? false : true
  });

  const checkConditions = $((isP2: boolean) => {
    const { board } = game;
    const p = isP2 ? "O" : "X"

    if (
      // Row Matches
      (board[0] === p && board[1] === p && board[2] === p) ||
      (board[3] === p && board[4] === p && board[5] === p) ||
      (board[6] === p && board[7] === p && board[8] === p) ||

      // Column Matches
      (board[0] === p && board[3] === p && board[6] === p) ||
      (board[1] === p && board[4] === p && board[7] === p) ||
      (board[2] === p && board[5] === p && board[8] === p) ||

      // Cross Matches
      (board[0] === p && board[4] === p && board[8] === p) ||
      (board[2] === p && board[4] === p && board[6] === p)
    ) {
      game.result = {gameEnd: true, winner: isP2 ? 2 : 1};
    }

    // Cast Game
    else if (!board.includes(null)) {
      game.result = {gameEnd: true, winner: null};
    }
  });

  const selectHandler = $((position: number) => {
    if (!game.result.gameEnd && game.gameStarted && !(game.board[position])) {
      const board = game.board.slice();
      board[position] = game.p2 ? "O" : "X"
      game.board = board;

      checkConditions(game.p2); // Checks for Game Ending Conditions
      game.p2 = !game.p2
    }
  })

  return (
    <>
      <main>
        <Header game={game.gameStarted} setGame={setGame} />
        <Routes
          board={game.board}
          gameStarted={game.gameStarted}
          p2={game.p2}
          gameEnd={game.result.gameEnd}
          winner={game.result.winner}
          selectHandler={selectHandler}
        />
      </main>
      <Footer date={serverTime.value.date} />
    </>
  );
});

