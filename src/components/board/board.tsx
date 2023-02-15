import { type QRL, component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './board.css?inline';
import Tile from '../tile/tile';

interface BoardProps {
    board: (string | null)[];
    selectHandler: QRL<(position: number) => void>
}

export default component$((props: BoardProps) => {
    useStylesScoped$(styles);

    return (
        <div class="grid">
            {(props.board || []).map((tile, index) => (
                <Tile key={index} tile={tile} index={index} selectHandler={props.selectHandler} />
            ))}
        </div>
    )
});