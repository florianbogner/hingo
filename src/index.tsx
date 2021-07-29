import React from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';

import bg from './resources/bg-hingo.jpg'

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
`
const Header = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@500&display=swap');
  font-family: 'Lexend', sans-serif;

  font-size: 24px;
  color: #ffffff;
  text-shadow: 0px 0px 32px rgba(85, 0, 185, 1);
  background-color: rgba(255, 255, 255, 0.3);;
  border-bottom: 1px solid white;

  width: 100%;
  justify-content: left;
  align-items: center;

  padding-left: 24px;
  padding-top: 16px;
  padding-bottom: 16px;

  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 2;
`

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(${bg});
  background-position: left top;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.8;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);

  filter: blur(100px);
  -webkit-filter: blur(100px);
`

const Card = styled.div`
  z-index: 3;
  font-size: 24px;
  color: #000000;
  background-color: #ffffff;
`

const Copyright = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  z-index: 2;

  font-size: 14px;
  color: #ffffff;
`

function Title(){
  return (
    <Header>
      Hingo
    </Header>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle/>
    <Title/>

    <Background>
      <Card>asdasd</Card>
    </Background>

    <Copyright>
      © Florian Bogner 2021
    </Copyright>

  
  </React.StrictMode>,
  document.getElementById('root')
);