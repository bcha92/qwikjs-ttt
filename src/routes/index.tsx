import { type QRL, component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import Board from '~/components/board/board';

interface RouteProps {
  board: (string | null)[];
  gameStarted: boolean;
  p2: boolean;
  gameEnd: boolean;
  winner: number | null;
  selectHandler: QRL<(position: number) => void>;
}

export default component$((props: RouteProps) => {
  const { gameStarted, p2, gameEnd, winner } = props;
  return (
    <section>
      <Board board={props.board} selectHandler={props.selectHandler} />
      <div class="player-board">
        <h2>Player 1: X</h2>
        {gameEnd && winner ? // Winner Declared
        <h2>Game Over. Player {winner} Wins!</h2> :
        gameEnd && !winner ? // Game Tied
        <h2>Game Over. Draw!</h2> :
        gameStarted ? // Game Started Default
        <h2>Player {p2 ? 2 : 1}'s Turn</h2> :
        <h2>Press Start to Begin Game</h2>}
        <h2>Player 2: O</h2>
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