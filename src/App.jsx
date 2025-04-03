import { Container, Header } from './styles/styles';
import Translator from './components/Translator/Translator';

function AppWrapper() {

  return (
  
          <Container>
            <Header>
              🌐 Tradutor de Documentos
            </Header>
            <Translator />
          </Container>
  )
}

export default AppWrapper;