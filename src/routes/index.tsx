import { component$, useSignal, useStore, $ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import Board from '~/components/board/board';
import StartButton from '~/components/button/startButton';

interface GameMode {
  gameStarted: boolean;
  board: (string | null)[];
  p2: boolean;
  result: {
    gameEnd: boolean,
    winner: number | null,
  }
}

export default component$(() => {
  const p1Score = useSignal(0);
  const p2Score = useSignal(0);

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
    } else {
      game.gameStarted = true;
    }

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
      game.result = { gameEnd: true, winner: isP2 ? 2 : 1 };
      isP2 ? p2Score.value++ : p1Score.value++;
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
  });

  const { gameEnd, winner } = game.result;

  return (
    <section>
      <Board board={game.board} selectHandler={selectHandler} />
      <div class="player-board">
        <h2>Player 1 (X): {p1Score.value}</h2>
        {gameEnd && winner ? // Winner Declared
        <h2>Game Over. Player {winner} Wins this round! <StartButton
          text="Next Round"
          handler={setGame}
        /></h2> :
        gameEnd && !winner ? // Game Tied
        <h2>Game Over. Draw! <StartButton
          text="Next Round"
          handler={setGame}
        /></h2> :
        game.gameStarted ? // Game Started Default
        <h2>Player {game.p2 ? 2 : 1}'s Turn</h2> :
        <h2>Press <StartButton
          text="Start"
          handler={setGame}
        /> to Begin</h2>}
        <h2>Player 2 (O): {p2Score.value}</h2>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: 'Qwik Tic-Tac-Toe',
  meta: [
    {
      name: 'A Fun Tic-Tac-Toe Game built with Qwik.js',
      content: 'Personal project built with Qwik.js by https://github.com/bcha92',
    },
  ],
};