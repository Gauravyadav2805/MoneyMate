import './App.css'
import bg from './img/bg.png'
import styled from 'styled-components'
import { MainLayout } from './styles/Layouts'
import Orb from './components/Orb/Orb'
import Navigation from './components/Navigation/Navigation'
function App() {

  return (
    <AppStyled bg = { bg } >
      <Orb/>
      <MainLayout>
        <Navigation/>
      <h1>Hello</h1>
      </MainLayout>
    </AppStyled>
  )
}

const AppStyled = styled.div`
  height : 100vh;
  background-image:url(${props => props.bg});
  position:relative;
`;
export default App
