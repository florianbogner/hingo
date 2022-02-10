import { PropsWithChildren, useCallback, useMemo, useState } from "react"
import styled from "styled-components"

import heuristics from "./resources/heuristics.json"

import iconRefresh from "./resources/Refresh.svg"
import iconDown from "./resources/ArrowDown.svg"
import iconTrash from "./resources/Trash.svg"
import iconDownload from "./resources/Download.svg"

import { Heuristic, HeuristicLocalized } from "./Heuristic"
import { renderPdf } from "./pdfGenerator"
import { Languages } from "./components/Toggle"
import { ButtonPrimary, ButtonSecondary } from "./components/ButtonStyles"
import { Card } from "./components/Card"

const CardHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const H1 = styled.div`
	font-size: 24px;
`

const LineWhite = styled.div`
	display: block;
	margin-top: 16px;
	margin-bottom: 10px;
	border-width: 0;
	height: 1px;
	background-color: #ffffff;
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

const getRandomIntInclusive = () => {
	const maxId = Object.keys(heuristics).length

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

export type CardProps = PropsWithChildren<{ heuristic: HeuristicLocalized }>

export const Game = ({ lang }: props) => {
	const [heuristicContent, setContent] = useState(getHeuristic(1))
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

	let heuristicLocalized: CardProps = {
		heuristic: {
			id: heuristicContent.id,
			name: heuristicContent.nameDe,
			type: heuristicContent.typeDe,
			subtitle: heuristicContent.subtitleDe,
			body: heuristicContent.bodyDe,
		},
	}

	if (lang === "english") {
		heuristicLocalized = {
			heuristic: {
				id: heuristicContent.id,
				name: heuristicContent.nameEn,
				type: heuristicContent.typeEn,
				subtitle: heuristicContent.subtitleEn,
				body: heuristicContent.bodyEn,
			},
		}
	}

	return (
		<>
			<Card {...heuristicLocalized}>
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
