import { useState } from 'react';

import Footer from './components/Footer';
import Main from './components/Main';
import Modal from './components/Modal';

interface ModalInterface {
  title: string;
  Content: ({ closeModal }: { closeModal: () => void }) => JSX.Element;
}

const App = () => {
  const [modal, setModal] = useState<ModalInterface | null>(null);

  return (
    <>
      <Modal modal={modal} closeModal={() => setModal(null)} />
      <Main setModal={(title, Content) => setModal({ Content, title })} />
      <Footer />
    </>
  );
};

export default App;
