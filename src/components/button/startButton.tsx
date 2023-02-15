import { type QRL, component$, useStylesScoped$ } from "@builder.io/qwik";
import styled from "./startButton.css?inline";

interface ButtonProps {
    text: string;
    handler: QRL<() => void>;
}

export default component$((props: ButtonProps) => {
    useStylesScoped$(styled)

    return (
        <button class="start" onClick$={props.handler}>{props.text}</button>
    )
});