import React from 'react';
import styled from 'styled-components';
import ClipLoader from "react-spinners/ClipLoader";
import { device } from '../../device';


const Spinner = () => {
	const Wrapper = styled.div `
		display: flex;
		justify-content: center;
		align-items: center;

		margin-left: auto;
		margin-right: auto;
		flex-direction: column;
		height: 100vh;
			@media ${device.laptop} {
				width: 100%;
			}
			
	`;


    return(
			<Wrapper>
				<ClipLoader/>
			</Wrapper>

    );
};

export default Spinner;