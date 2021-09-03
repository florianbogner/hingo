import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components'

import bg from './resources/bg-hingo.jpg'
import logo from './resources/logo-hingo.svg'
import iconRefresh from './resources/Refresh.svg'
import iconDown from './resources/ArrowDown.svg'

import { Heuristic } from './Heuristic'

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

const LineGray = styled.hr`
  display: block;
  margin-top: 16px;
  margin-bottom: 16px;
  border-width:0;
  height: 1px;
  background-color: #ebebeb;
`

const LineWhite = styled.hr`
  display: block;
  margin-top: 16px;
  margin-bottom: 16px;
  border-width:0;
  height: 1px;
  background-color: #ffffff;
`

const Card = styled.div`
  margin: 24px;
  margin-bottom: 0px;
  max-width: 486px;
  padding: 24px;

  background-color: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 4px 24px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const H1 = styled.div`
  font-size: 24px;
`

const CategoryTag = styled.div`
  border-radius: 6px;
  border-style: solid;
  border-color: #0000FF;
  border-width: 1px;
  color: #0000FF;
  background-color: rgba(0, 0, 255, 0.1);
  padding: 6px;
`

const CardBody = styled.div`
  color: #929292;
  padding-top: 8px;
`

const ButtonRow = styled.div`
  background-color: #f7f7f7;
  margin-top: 24px;
  margin-left: -24px;
  margin-right: -24px;
  margin-bottom: -24px;
  padding: 16px;
  border-radius: 0px 0px 24px 24px;

  display: flex;
  justify-content: center;
`

const ButtonPrimary = styled.button`
  width: 64px;
  height: 64px;

  margin-left: 6px;
  margin-right: 6px;
  padding: 12px;

  border-radius: 32px;
  background-color: #000000;

  border: none; 
  cursor: pointer;
`

const History = styled.div`
  margin: 48px;
  margin-top: 24px;
  max-width: 419px;
  padding: 24px;

  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 24px;
`

const Footer = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
`

let curHeuristic: Heuristic
let language: number = 0
let maxId: number = 52
let defaultHeuristic: Heuristic = {
  id: 0,
  name: "Klicke zu Starten auf den rechten Button!",
  type: "default",
  subtitle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.",
  body: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
}

function getRandomIntInclusive(){
  return Math.floor(Math.random() * (maxId +1))
}

function getHeuristic(id: number): Promise<Heuristic>{
  return fetch(`https://fbackend.azurewebsites.net/hingo/` + id)
    .then(res => res.json())
    .then(res => {
      console.log(`Fetching heuristic `+ id + ` ...`)
      
      switch(language){
        case 0: {
          curHeuristic = {
            id: res.data[0].ID,
            name: res.data[0].Title_DE,
            type: res.data[0].Category_DE,
            subtitle: res.data[0].Subtitle_DE,
            body: res.data[0].Body_DE
          }
          break
        }
        default:{
            curHeuristic = {
            id: res.data[0].ID,
            name: res.data[0].Title_EN,
            type: res.data[0].Category_EN,
            subtitle: res.data[0].Subtitle_EN,
            body: res.data[0].Body_EN
          }
          break
        }
      }

      console.log("Done!")
      return curHeuristic
    })
    .catch(err => {
      console.log(err.message)
      return defaultHeuristic
    })
  }

function Title(){
  return (
    <Header>
      <HeaderIcon src={logo} alt={'Hingo-Logo'}/>
      Hingo
    </Header>
  )
}

function CardContent(){
  curHeuristic = defaultHeuristic

  const [heuristicContent, setContent] = useState(curHeuristic);

  return(
    <div>
      <CardHeader>
        <H1>{heuristicContent.name}</H1>
        <CategoryTag>{heuristicContent.type}</CategoryTag>
      </CardHeader>
      <LineGray/>
      <div>{heuristicContent.subtitle}</div>
      <CardBody>{heuristicContent.body}</CardBody>
      <ButtonRow>
        <ButtonPrimary>
          <img src={iconDown} alt={'Refresh'}/>
        </ButtonPrimary>
        <ButtonPrimary
          onClick={async () => {
            setContent(await getHeuristic(getRandomIntInclusive()))
           }
          }
        >
          <img src={iconRefresh} alt={'Refresh'}/>
        </ButtonPrimary>
      </ButtonRow>
    </div>
  )
}

function HistoryContent(){
  return(
    <div>
      <H1>
        Aktuelle Auswahl
      </H1>
      <LineWhite/>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle/>
    <Background>
      <Title/>
      <ContentContainer>
        <Card>
          <CardContent/>
        </Card>
        <History>
          <HistoryContent/>
        </History>
        <Footer>
          <a href="https://www.linkedin.com/in/florian-bogner-84a907142/" target="_blank" rel="noreferrer" >© Florian Bogner 2021</a>
        </Footer>
      </ContentContainer>
    </Background>
  </React.StrictMode>,
  document.getElementById('root')
);