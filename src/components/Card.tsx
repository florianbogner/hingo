import styled from "styled-components"

import { CardProps } from "../Game"
import { ButtonPrimary } from "./ButtonStyles"
import iconDown from "./../resources/ArrowDown.svg"
import iconRefresh from "./../resources/Refresh.svg"

const Wrapper = styled.div`
	margin: 24px;
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

const CategoryTag = styled.div`
	border-radius: 6px;
	border-style: solid;
	border-color: #0000ff;
	border-width: 1px;
	color: #0000ff;
	background-color: rgba(0, 0, 255, 0.1);
	padding: 6px;
`

const LineGray = styled.div`
	display: block;
	margin: 16px 0;
	border-width: 0;
	height: 1px;
	background-color: #ebebeb;
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

export const Card = ({ heuristic, disabled, handleAddButtonClick, handleRefreshButtonClick }: CardProps) => {
	return (
		<Wrapper>
			<CardHeader>
				<div style={{ fontSize: "24px" }}>{heuristic.name}</div>
				<CategoryTag>{heuristic.type}</CategoryTag>
			</CardHeader>
			<LineGray />
			<div>{heuristic.subtitle}</div>
			<div style={{ color: "#929292", paddingTop: "8px" }}>{heuristic.body}</div>
			<ButtonRow>
				<ButtonPrimary
					disabled={disabled}
					onClick={() => {
						handleAddButtonClick()
					}}
				>
					<img src={iconDown} alt={"Add to list"} />
				</ButtonPrimary>
				<ButtonPrimary
					onClick={() => {
						handleRefreshButtonClick()
					}}
				>
					<img src={iconRefresh} alt={"Refresh"} />
				</ButtonPrimary>
			</ButtonRow>
		</Wrapper>
	)
}
