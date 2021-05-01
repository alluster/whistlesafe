import React, { useContext, Suspense, useEffect } from 'react';
import styled from 'styled-components';
import { device } from '../../device';
import LoginButton from '../LoginButton';
import LogoutButton from '../LogoutButton';
import { Link } from "react-router-dom";
import { AppContext } from '../../context/Context';
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from '../Spinner';


const ColorBar = React.lazy(() => import('../ColorBar'));

const TopNav = () => {
	const { isAuthenticated, user } = useAuth0();
	const { GetOrg, orgColor } = useContext(AppContext);

	const Wrapper = styled.div`
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		top: 0px;
		height: 100px;
		
			@media ${device.laptop} {
				width: 100%;
			}
			
	`;

	const NavItem = styled.div`
		height: 100%;
		padding-left 40px;
		padding-right: 20px;
		display: flex;
		justify-content: center;
		flex-direction: column;
		:hover {
			background-color: ${props => props.theme.colors.background};
			cursor: pointer;
		}
		@media ${device.mobileL} {
			font-size: 12px;
		}

	`
	useEffect(() => {
		GetOrg()
		return () => {
		}
	}, [])

	return (
		<Suspense fallback={<Spinner />}>
			<ColorBar orgColor={orgColor} />

			{
				isAuthenticated ?
					<Wrapper>
						<Link to="/">
							<NavItem>
								<h3>Reports</h3>
							</NavItem>
						</Link>
						<Link to="/profile">
							<NavItem>
								<h3>{user.email}</h3>
							</NavItem>
						</Link>
						<NavItem>
							<LogoutButton />
						</NavItem>
						
					</Wrapper>

					:
					<Wrapper>

						<NavItem>
							<LoginButton />
						</NavItem>
					</Wrapper>
			}
		</Suspense>
	);
};

export default TopNav;