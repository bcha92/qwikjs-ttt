import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './header.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header>
      <div id="title">
        <h1>Tic-Tac-Toe</h1>
      </div>
    </header>
  );
});
