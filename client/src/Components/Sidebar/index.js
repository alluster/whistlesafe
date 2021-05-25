import React, { useContext } from 'react';
import styled from 'styled-components';
import { device } from '../../device';
import { AppContext } from '../../context/Context';
import { Link } from 'react-router-dom';

const Sidebar = () => {
	const { logoUrl } = useContext(AppContext)

	const Container = styled.div`
		height: 100%
	`;

	const Wrapper = styled.div`
		height: 100% !important;
		display: flex;
		margin-left: 0px;
		top: 0px;
		width: 275px;
		position: absolute;
		background-color: ${props => props.theme.colors.white};
		margin-right: auto;
		flex-direction: column;
			@media ${device.laptop} {
				display: none
			}
			
	`;
	const NavItem = styled(Link)`
		height: 45px;
		border-top: solid 0.5px ${props => props.theme.colors.border};
		background-color: ${props => props.theme.colors.white}
		width: 215px;
		padding-left 40px;
		padding-right: 20px;
		display: flex;
		justify-content: center;
		flex-direction: column;
		:last-child { 
			border-bottom: solid 0.5px ${props => props.theme.colors.border};
		}
		:hover {
			background-color: ${props => props.theme.colors.background};
			cursor: pointer;
		}

	`
	const LogoContainer = styled.div`
		height: 140px;
		background-color: ${props => props.theme.colors.white}
		width: 215px;
		padding-left 40px;
		padding-right: 20px;
		display: flex;
		align-items: top;
		justify-content: center;
		flex-direction: column;
		

	`
	const Logo = styled.img`
		max-width: 180px;

	`


	return (
		<Container>


			<Wrapper>
				<LogoContainer>
					<Link to="/" >

						<Logo src={logoUrl} />


					</Link>
				</LogoContainer>
				<NavItem to="/reports">
					<h6>Reports</h6>
				</NavItem>

			</Wrapper>
		</Container>

	);
};

export default Sidebar;