import React from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';

import bg from './resources/bg-hingo.jpg'
import logo from './resources/logo-hingo.svg'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Lexend&display=swap');

  body {
    margin: 0;
    font-family: 'Lexend', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 14px;
    overflow: hidden;
  }

  a:link{
    color: rgba(255, 255, 255, 0.5);
  }

  a:visited{
    color: rgba(255, 255, 255, 0.5);
  }

  a:hover{
    color: rgba(255, 255, 255);
  }

  a:active{
    color: rgba(255, 255, 255);
  }
`

const Header = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 24px;
  min-height: 64px;
  background-color: rgba(255, 255, 255, 0.3);

  font-size: 24px;
  color: #ffffff;  
  background-size: 100% 100%;
  text-shadow: 0px 0px 32px rgba(255, 255, 255, 1);
  border-bottom: 1px solid white;
`

const HeaderIcon= styled.img`
  width: 36px;
  pointer-events: none;
  padding-right: 8px;

  -webkit-filter: drop-shadow(0px 0px 32px rgba(255, 255, 255, 0.5));
  filter: drop-shadow( 0px 0px 32px rgba(255, 255, 255, 0.5));
`

const Background = styled.div`
  height: 100vh;
  width: 100vw;

  background-image: url(${bg});
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
`

const ContentContainer = styled.div`
  display: grid;
  place-items: center;
`

const Line = styled.hr`
  display: block;
  margin-top: 16px;
  margin-bottom: 16px;
  border-width:0;
  height: 1px;
  background-color: #ebebeb;
`

const Card = styled.div`
  margin-top: 64px;
  max-width: 486px;
  padding: 24px;

  background-color: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 4px 24px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
`
const CardHeader = styled.div`
  font-size: 24px;
`

const CardBody = styled.div`
  color: #929292;
  padding-top: 8px;
`

const History = styled.div`
  margin-top: 64px;
  max-width: 486px;
  padding: 24px;

  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 24px;
`

const Footer = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
`

function Title(){
  return (
    <Header>
      <HeaderIcon src={logo} alt={'Hingo-Logo'}/>
      Hingo
    </Header>
  )
}

function CardContent(){
  return(
    <div>
      <CardHeader>heuristic-name</CardHeader>
      <Line />
      <div>In unbekannten Situationen orientieren wir uns tendenziell am Verhalten anderer Personen, die uns ähnlich sind.</div>
      <CardBody>Finde kreative Lösungen zur Darstellung sozialen Verhaltens, um ein Gefühl von Sicherheit zu erzeugen und Menschen zu einer Entscheidung zu bewegen. Das kann zum Beispiel in Form von Zahlen (Favorisiert von, Anzahl der Views, Kommentare, …), positiven Testimonials oder durch die Darstellung der Handlungen oder Ergebnisse der anderen Nutzer passieren.</CardBody>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <React.StrictMode>
      <GlobalStyle/>
      <Background>
        <Title/>
        <ContentContainer>
          <Card>
            <CardContent/>
          </Card>
          <History>
            Aktuelle Liste
          </History>
          <Footer>
            <a href="https://www.linkedin.com/in/florian-bogner-84a907142/" target="_blank" >Florian Bogner 2021</a>
          </Footer>
        </ContentContainer>
      </Background>
    </React.StrictMode>

  
  </React.StrictMode>,
  document.getElementById('root')
);