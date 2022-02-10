import { useCallback, useMemo, useState } from "react"

import heuristics from "./resources/heuristics.json"

import { Heuristic, HeuristicLocalized } from "./Heuristic"
import { Languages } from "./components/Toggle"
import { Card } from "./components/Card"
import { History } from "./components/History"

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

export type CardProps = {
	heuristic: HeuristicLocalized
	disabled: boolean
	handleAddButtonClick: Function
	handleRefreshButtonClick: Function
}

export type HistoryProps = {
	heuristicList: Array<Heuristic>
	handleDeleteButtonClick: Function
	setContent: Function
	lang: Languages
}

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

	let cardProps: CardProps = {
		heuristic: {
			id: heuristicContent.id,
			name: heuristicContent.nameDe,
			type: heuristicContent.typeDe,
			subtitle: heuristicContent.subtitleDe,
			body: heuristicContent.bodyDe,
		},
		disabled: isAdded,
		handleAddButtonClick: handleAddButtonClick,
		handleRefreshButtonClick: () => setContent(getHeuristic(getRandomIntInclusive())),
	}

	if (lang === "english") {
		cardProps = {
			heuristic: {
				id: heuristicContent.id,
				name: heuristicContent.nameEn,
				type: heuristicContent.typeEn,
				subtitle: heuristicContent.subtitleEn,
				body: heuristicContent.bodyEn,
			},
			disabled: isAdded,
			handleAddButtonClick: handleAddButtonClick,
			handleRefreshButtonClick: () => setContent(getHeuristic(getRandomIntInclusive())),
		}
	}

	const historyProps = {
		heuristicList: heuristicList,
		handleDeleteButtonClick: handleDeleteButtonClick,
		setContent: setContent,
		lang: lang,
	}

	return (
		<>
			<Card {...cardProps} />
			{heuristicList.length !== 0 ? <History {...historyProps} /> : <div />}
		</>
	)
}
