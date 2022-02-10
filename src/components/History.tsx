import styled from "styled-components"
import { ButtonSecondary } from "./ButtonStyles"

import iconTrash from "./../resources/Trash.svg"
import iconDownload from "./../resources/Download.svg"
import { renderPdf } from "../pdfGenerator"
import { HistoryProps } from "../Game"

const Wrapper = styled.div`
	margin: 24px 48px;
	margin-top: 0px;
	padding: 24px;

	background-color: rgba(255, 255, 255, 0.3);
	border-radius: 24px;
`

const Header = styled.div`
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
export const History = ({ heuristicList, handleDeleteButtonClick, setContent, lang }: HistoryProps) => {
	return (
		<Wrapper>
			<Header>
				<H1>{lang === "german" ? "Aktuelle Auswahl" : "Current selection"}</H1>
				<ButtonSecondary
					onClick={() => {
						renderPdf(heuristicList, lang)
					}}
				>
					<img src={iconDownload} alt={"Download"} />
				</ButtonSecondary>
			</Header>
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
		</Wrapper>
	)
}
