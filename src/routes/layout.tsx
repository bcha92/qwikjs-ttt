import { component$ } from '@builder.io/qwik';
import { loader$ } from '@builder.io/qwik-city';

import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Routes from '.';

export const serverTimeLoader = loader$(() => {
  return {
    date: new Date().toLocaleString(),
  };
});

export default component$(() => {
  const serverTime = serverTimeLoader.use();

  return (
    <>
      <main>
        <Header />
        <Routes />
      </main>
      <Footer date={serverTime.value.date} />
    </>
  );
});

