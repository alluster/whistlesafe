import React, { useContext } from 'react';
import styled, { css }from 'styled-components';
// import LoginForm from '../LoginForm';
import { device } from '../../device';



const Banner = ({ dark, title, ingress, body, children }) => {
	const Container = styled.div `
	width: 100%;
	${props => {
        if(dark) return css`
			background-color: ${props => props.theme.colors.backgroundDark};

        `;
        
		return css`
			background-color:  transparent
        `;
    }}
	@media ${device.laptop} {
		height: 100%;
 	}

`;

const Wrapper = styled.div`
    max-width: 900px;
	margin-left: auto;
    margin-right: auto;
	display: flex;
	align-items: center
	flex-direction: row;
	padding-top: 50px;
	padding-bottom: 50px;
	@media ${device.laptop} {
		flex-direction: column;
	
 	}



`;
const ContentBlock = styled.div `
	flex: 1;
	flex-direction: column;
	align-items: center;
	@media ${device.laptop} {
		align-items: center;
		padding-left: 20px;
		padding-right: 20px;
 	}	

`;
const Title = styled.h1`
    color: ${props => props.theme.colors.black};
	// font-weight: 600;
	letter-spacing: -.5px;
	// font-size: 45px !important;
	margin: 0px !important;
    // font-size:  ${props => props.theme.fontSize.h3}
    @media ${device.laptop} {
        // font-size: 24px;


     }
`;
const Ingress = styled.h3 `
	// font-size: 24px;
    // font-weight: 600;
	margin-top: 30px !important;
    @media ${device.laptop} {
        // font-size: 18px;
		margin-top: 20px;



     }
`;
const Body = styled.p `
	// font-size: 18px;
    // font-weight: 400;
	margin-top: 30px !important;
    @media ${device.laptop} {
        // font-size: 18px;
		margin-top: 20px;



     }
`;

    return(
		<Container dark={dark}  children={children}>
			<Wrapper>
				<ContentBlock>
					<Title>{title}</Title>
					<Ingress>{ingress}</Ingress>
					<Body>{body}</Body>
					{children}
				</ContentBlock>
				{/* <ContentBlock>
					<LoginForm />
				</ContentBlock>	 */}
        	</Wrapper>
		</Container>
       
    );
};

 

export default Banner;