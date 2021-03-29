import Header from './components/Header/Header'
import Menu from './containers/Menu/Menu'
import Footer from './components/Footer/Footer'
import { Container } from 'react-bootstrap'

function App() {
  return (
    <div>
      <Header />
      <Container>
      {/* <Layout> */}
      <main className='py-3'>
        <Menu />
      </main>
      {/* </Layout> */}
      </Container>
      <Footer />
    </div>
  );
}

export default App;
