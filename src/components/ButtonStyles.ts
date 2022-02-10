import styled from "styled-components"

export const ButtonPrimary = styled.button`
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

export const ButtonSecondary = styled.button`
	width: 48px;
	height: 48px;

	padding: 12px;

	border-radius: 24px;
	background-color: #ffffff;

	border: none;
	cursor: pointer;
`
