import { useMemo } from "react"
import styled from "styled-components"

import flagDe from "./resources/flag_de.png"
import flagEn from "./resources/flag_en.png"

const Button = styled.button`
	width: 36px;
	height: 36px;

	border-radius: 18px;
	background-color: #ffffff;

	display: flex;
	align-items: center;
	justify-content: center;

	border: none;
	cursor: pointer;

	padding-top: 3px;
`
export const LANGUAGES = ["german", "english"] as const
export type Languages = typeof LANGUAGES[number]
interface ToggleProps {
	language: Languages
	onToggle: (newValue: Languages) => void
}

export function Toggle({ language, onToggle }: ToggleProps) {
	const component = useMemo(() => {
		switch (language) {
			case "english": {
				return <img src={flagEn} alt={"English"} style={{ width: "28px" }} />
			}
			case "german": {
				return <img src={flagDe} alt={"Deutsch"} style={{ width: "28px" }} />
			}
		}
	}, [language])

	return (
		<>
			<Button
				onClick={() => {
					const currentIndex = LANGUAGES.findIndex((l) => l === language)
					onToggle(LANGUAGES[(currentIndex + 1) % LANGUAGES.length])
				}}
			>
				{component}
			</Button>
		</>
	)
}
