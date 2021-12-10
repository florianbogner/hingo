import React, { useCallback, useMemo, useState } from "react"
import ReactDOM from "react-dom"
import styled, { createGlobalStyle } from "styled-components"
import Loader from "react-loader-spinner"

import heuristics from "./resources/heuristics.json"

import logo from "./resources/logo-hingo.svg"
import iconRefresh from "./resources/Refresh.svg"
import iconDown from "./resources/ArrowDown.svg"
import iconTrash from "./resources/Trash.svg"
import iconDownload from "./resources/Download.svg"

import { Heuristic } from "./Heuristic"
import { Languages, Toggle } from "./Toggle"
import { renderPdf } from "./pdfGenerator"

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

const LineGray = styled.div`
	display: block;
	margin: 16px 0;
	border-width: 0;
	height: 1px;
	background-color: #ebebeb;
`

const LineWhite = styled.div`
	display: block;
	margin-top: 16px;
	margin-bottom: 10px;
	border-width: 0;
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
	align-items: center;
`

const H1 = styled.div`
	font-size: 24px;
`

const CategoryTag = styled.div`
	border-radius: 6px;
	border-style: solid;
	border-color: #0000ff;
	border-width: 1px;
	color: #0000ff;
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

	margin: 0 6px;
	padding: 12px;

	border-radius: 32px;
	background-color: #000000;

	border: none;
	cursor: pointer;

	&:disabled {
		background: #ebebeb;
		cursor: default;
	}
`

const ButtonSecondary = styled.button`
	width: 48px;
	height: 48px;

	padding: 12px;

	border-radius: 24px;
	background-color: #ffffff;

	border: none;
	cursor: pointer;
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

const History = styled.div`
	margin: 24px 48px;
	padding: 24px;

	background-color: rgba(255, 255, 255, 0.3);
	border-radius: 24px;
`

const HeuristicListItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-top: 6px;
`

const HeuristicItemTitle = styled.div`
	cursor: pointer;

	&:hover {
		color: #ffffff;
	}
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

const Footer = styled.div`
	position: sticky;
	bottom: 16px;
	left: 16px;
`
const defaultHeuristic: Heuristic = {
	id: 0,
	nameDe: "Hingo",
	typeDe: "default",
	subtitleDe:
		"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.",
	bodyDe: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
	nameEn: "Hingo",
	typeEn: "default",
	subtitleEn:
		"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.",
	bodyEn: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
}

const maxId: number = 52

function getRandomIntInclusive() {
	return Math.floor(Math.random() * (maxId + 1))
}

function getHeuristic(id: number): Heuristic {
	const newHeuristic = heuristics.find((h) => h.ID === id)
	return {
		id: newHeuristic!.ID,
		nameDe: newHeuristic!.Title_DE,
		typeDe: newHeuristic!.Category_DE,
		subtitleDe: newHeuristic!.Subtitle_DE,
		bodyDe: newHeuristic!.Text_DE,
		nameEn: newHeuristic!.Title,
		typeEn: newHeuristic!.Category,
		subtitleEn: newHeuristic!.Subtitle,
		bodyEn: newHeuristic!.Text,
	}
}

function Content() {
	const [started, setStarted] = useState(false)
	const [heuristicContent, setContent] = useState(defaultHeuristic)
	const [heuristicList, setItems] = useState(new Array<Heuristic>())
	const [loading, setLoading] = useState(false)
	const [language, setLanguage] = useState<Languages>("german")

	const handleAddButtonClick = useCallback(() => {
		const newHeuristicList = [heuristicContent, ...heuristicList]
		setItems(newHeuristicList)
	}, [heuristicContent, heuristicList])

	const handleDeleteButtonClick = useCallback(
		(index: number) => {
			const newHeuristicList = [...heuristicList]

			newHeuristicList.splice(index, 1)

			setItems(newHeuristicList)
		},
		[heuristicList],
	)

	const isAdded = useMemo(() => {
		return !!heuristicList.find((h) => h.id === heuristicContent.id)
	}, [heuristicList, heuristicContent])

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
				{started ? (
					<div>
						<Card>
							<CardHeader>
								<H1>{language === "german" ? heuristicContent.nameDe : heuristicContent.nameEn}</H1>
								<CategoryTag>
									{language === "german" ? heuristicContent.typeDe : heuristicContent.typeEn}
								</CategoryTag>
							</CardHeader>
							<LineGray />
							<div>
								{language === "german" ? heuristicContent.subtitleDe : heuristicContent.subtitleEn}
							</div>
							<CardBody>
								{language === "german" ? heuristicContent.bodyDe : heuristicContent.bodyEn}
							</CardBody>
							<ButtonRow>
								<ButtonPrimary
									disabled={isAdded}
									onClick={() => {
										handleAddButtonClick()
									}}
								>
									<img src={iconDown} alt={"Add to list"} />
								</ButtonPrimary>
								<ButtonPrimary
									onClick={async () => {
										setContent(getHeuristic(getRandomIntInclusive()))
									}}
								>
									<img src={iconRefresh} alt={"Refresh"} />
								</ButtonPrimary>
							</ButtonRow>
						</Card>
						{heuristicList.length !== 0 ? (
							<History>
								<CardHeader>
									<H1>{language === "german" ? "Aktuelle Auswahl" : "Current selection"}</H1>
									<ButtonSecondary
										onClick={() => {
											renderPdf(heuristicList, language)
										}}
									>
										<img src={iconDownload} alt={"Download"} />
									</ButtonSecondary>
								</CardHeader>
								<LineWhite />
								<>
									{heuristicList.map((item, index) => (
										<HeuristicListItem>
											<HeuristicItemTitle
												onClick={() => {
													setContent(heuristicList[index])
												}}
											>
												{language === "german" ? item.nameDe : item.nameEn}
											</HeuristicItemTitle>
											<ButtonSecondary
												onClick={() => {
													handleDeleteButtonClick(index)
												}}
											>
												<img src={iconTrash} alt={"Delete"} />
											</ButtonSecondary>
										</HeuristicListItem>
									))}
								</>
							</History>
						) : (
							<div />
						)}
					</div>
				) : (
					<StartContentWrapper>
						<H1>{language === "german" ? "Willkommen bei Hingo!" : "Welcome to Hingo!"}</H1>
						<div style={{ marginTop: "8px" }}>
							{language === "german" ? (
								<>
									Hingo ist ein kleines Kreativitätswerkzeug, das es Teams ermöglicht, neue Wege zur
									Verbesserung ihres Produktes zu finden. Mehr Informationen findest du
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
									Hingo is a small creativity tool that enables teams to find new directions for
									improving their product. You can find more information
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
						<ButtonText
							onClick={async () => {
								setLoading(true)
								setContent(getHeuristic(getRandomIntInclusive()))
								setStarted(true)
							}}
						>
							{loading ? (
								<Loader type="Oval" color="#ffffff" height={24} width={24} />
							) : (
								<div>{language === "german" ? "Loslegen" : "Let's go"}</div>
							)}
						</ButtonText>
					</StartContentWrapper>
				)}
				{started ? (
					<></>
				) : (
					<Footer>
						<a
							href="https://www.linkedin.com/in/florian-bogner-84a907142/"
							target="_blank"
							rel="noreferrer"
						>
							© Florian Bogner 2021
						</a>
					</Footer>
				)}
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
