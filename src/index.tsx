import React, { Fragment, useState } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import styled, { createGlobalStyle } from "styled-components"

import logo from "./resources/logo-hingo.svg"

import { Languages, Toggle } from "./components/Toggle"
import { Splash } from "./components/Splash"
import { Game } from "./Game"
import { Footer } from "./components/Footer"

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Lexend&display=swap');

  body {
    margin: 0;
    font-family: 'Lexend', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 14px;
  }

  a:link{
    color: rgba(0, 0, 0, 0.5);
  }

  a:visited{
    color: rgba(0, 0, 0, 0.5);
  }

  a:hover{
    color: rgba(0, 0, 0);
  }

  a:active{
    color: rgba(0, 0, 0);
  }
`

const Header = styled.div`
	box-sizing: border-box;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 24px;
	min-height: 64px;
	background-color: rgba(255, 255, 255, 0.5);

	font-size: 24px;
	color: #ffffff;
	background-size: 100% 100%;
	text-shadow: 0px 0px 32px rgba(255, 255, 255, 1);
	border-bottom: 1px solid white;

	position: sticky;
	top: 0;

	z-index: 0;
`

const HeaderIcon = styled.img`
	width: 36px;
	pointer-events: none;
	padding-right: 8px;

	-webkit-filter: drop-shadow(0px 0px 32px rgba(255, 255, 255, 0.5));
	filter: drop-shadow(0px 0px 32px rgba(255, 255, 255, 0.5));
`

const ContentWrapper = styled.div`
	display: grid;
	place-items: center;
	z-index: 1000;
`

function Content() {
	const [language, setLanguage] = useState<Languages>("german")
	const langProp = {
		lang: language,
	}

	return (
		<>
			<Header>
				<div style={{ display: "flex", alignItems: "center" }}>
					<HeaderIcon src={logo} alt={"Hingo-Logo"} />
					Hingo
				</div>
				<div style={{ paddingRight: "24px" }}>
					<Toggle language={language} onToggle={setLanguage} />
				</div>
			</Header>
			<ContentWrapper>
				<Router>
					<Routes>
						<Route path="/h" element={<Game {...langProp} />}></Route>
						<Route path="/" element={<Splash {...langProp} />} />
					</Routes>
				</Router>
				<Footer />
			</ContentWrapper>
		</>
	)
}

ReactDOM.render(
	<React.StrictMode>
		<GlobalStyle />
		<Content />
	</React.StrictMode>,
	document.getElementById("root"),
)
