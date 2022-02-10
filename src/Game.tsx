import { useCallback, useMemo, useState } from "react"
import styled from "styled-components"

import heuristics from "./resources/heuristics.json"

import iconRefresh from "./resources/Refresh.svg"
import iconDown from "./resources/ArrowDown.svg"
import iconTrash from "./resources/Trash.svg"
import iconDownload from "./resources/Download.svg"

import { Heuristic } from "./Heuristic"
import { renderPdf } from "./pdfGenerator"
import { Languages } from "./components/Toggle"
import { ButtonPrimary, ButtonSecondary } from "./components/ButtonStyles"

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

const getRandomIntInclusive = () => {
	return Math.floor(Math.random() * (maxId + 1))
}

const getHeuristic = (id: number): Heuristic => {
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

interface props {
	lang: Languages
}

export const Game = ({ lang }: props) => {
	const [heuristicContent, setContent] = useState(defaultHeuristic)
	const [heuristicList, setItems] = useState(new Array<Heuristic>())

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
			<Card>
				<CardHeader>
					<H1>{lang === "german" ? heuristicContent.nameDe : heuristicContent.nameEn}</H1>
					<CategoryTag>{lang === "german" ? heuristicContent.typeDe : heuristicContent.typeEn}</CategoryTag>
				</CardHeader>
				<LineGray />
				<div>{lang === "german" ? heuristicContent.subtitleDe : heuristicContent.subtitleEn}</div>
				<CardBody>{lang === "german" ? heuristicContent.bodyDe : heuristicContent.bodyEn}</CardBody>
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
						<H1>{lang === "german" ? "Aktuelle Auswahl" : "Current selection"}</H1>
						<ButtonSecondary
							onClick={() => {
								renderPdf(heuristicList, lang)
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
									{lang === "german" ? item.nameDe : item.nameEn}
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
		</>
	)
}
