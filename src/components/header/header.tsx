import { component$, useStylesScoped$ } from '@builder.io/qwik';
import type { QRL } from '@builder.io/qwik';
import styles from './header.css?inline';

interface HeaderProps {
  game: boolean;
  setGame: QRL<() => void>;
}

export default component$((props: HeaderProps) => {
  useStylesScoped$(styles);

  return (
    <header>
      <div id="title">
        <h1>Tic-Tac-Toe</h1>
      </div>
      <div id="control">
        <button onClick$={props.setGame}>{props.game ? "Reset" : "Start"}</button>
      </div>
    </header>
  );
});
