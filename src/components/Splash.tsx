import styled from "styled-components"
import { Link } from "react-router-dom"
import { Languages } from "./Toggle"

const H1 = styled.div`
	font-size: 24px;
`

const ButtonText = styled.button`
	height: 48px;
	padding: 12px 24px;
	margin-top: 24px;

	font-size: 14px;
	font-family: "Lexend", sans-serif;

	color: #ffffff;
	background-color: #000000;
	border-radius: 12px;
	border: none;
	cursor: pointer;
`

const StartContentWrapper = styled.div`
	margin: 24px;
	max-width: 300px;
	display: grid;
	justify-content: center;
	text-align: center;
	background-color: rgba(255, 255, 255, 0.5);
	padding: 24px;
	border-radius: 24px;
	border: 1px solid white;
`

interface props {
	lang: Languages
}

export const Splash = ({ lang }: props) => {
	return (
		<StartContentWrapper>
			<H1>{lang === "german" ? "Willkommen bei Hingo!" : "Welcome to Hingo!"}</H1>
			<div style={{ marginTop: "8px" }}>
				{lang === "german" ? (
					<>
						Hingo ist ein kleines Kreativitätswerkzeug, das es Teams ermöglicht, neue Wege zur Verbesserung
						ihres Produktes zu finden. Mehr Informationen findest du
						<a
							href="https://github.com/florianbogner/hingo/"
							target="_blank"
							rel="noreferrer"
							style={{ marginLeft: "3px" }}
						>
							auf GitHub
						</a>
						.
					</>
				) : (
					<>
						Hingo is a small creativity tool that enables teams to find new directions for improving their
						product. You can find more information
						<a
							href="https://github.com/florianbogner/hingo/"
							target="_blank"
							rel="noreferrer"
							style={{ marginLeft: "3px" }}
						>
							on GitHub
						</a>
						.
					</>
				)}
			</div>
			<Link to="/h">
				<ButtonText>
					<div>{lang === "german" ? "Loslegen" : "Let's go"}</div>
				</ButtonText>
			</Link>
		</StartContentWrapper>
	)
}
