import { component$, useStylesScoped$, type QRL } from '@builder.io/qwik';
import styles from './tile.css?inline';

interface TileProps {
    tile: string | null;
    index: number;
    selectHandler: QRL<(position: number) => void>
}

export default component$((props: TileProps) => {
    useStylesScoped$(styles);

    return (
        <div class="tile" onClick$={() => props.selectHandler(props.index)}>
            {!props.tile ? "" : props.tile}
        </div>
    )
});