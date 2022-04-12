import { lazy, Suspense, useState } from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import Modal from './components/Modal';

// const Header = lazy(() => import(/* webpackChunkName: "settings" */ './components/Settings'));
// const Main = lazy(() => import(/* webpackChunkName: "settings" */ './components/Settings'));
// const Footer = lazy(() => import(/* webpackChunkName: "settings" */ './components/Settings'));

const App = () => {
  const [modal, setModal] = useState<{ content: JSX.Element, title: string } | null>(null);

  return (
    <>
      <Modal modal={modal} closeModal={() => setModal(null)} />
      <Header />
      <Main setModal={(title: string, content: JSX.Element) => setModal({ content, title })} />
      <Footer />
      {/* <Suspense fallback={<>...</>}>
        <Settings />
      </Suspense> */}
    </>
  );
};

export default App;
