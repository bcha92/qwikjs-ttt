import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { QwikLogo } from '../icons/qwik';
import styles from './footer.css?inline';

interface FooterProps {
    date: string;
}

export default component$((props: FooterProps) => {
    useStylesScoped$(styles);

    return (
        <footer>
            <a href="https://qwik.builder.io/" target="_blank" title="QWITTY">
                <QwikLogo />
            </a>
            <a href="https://www.builder.io/" target="_blank">
                Made with ♡ by Builder.io
                <div>{props.date}</div>
            </a>
        </footer>
    )
});