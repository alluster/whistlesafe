import React, { useContext, Suspense, useEffect } from 'react';
import styled from 'styled-components';
import { device } from '../../device';
import LoginButton from '../LoginButton';
import LogoutButton from '../LogoutButton';
import { Link } from "react-router-dom";
import { AppContext } from '../../context/Context';
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from '../Spinner';
import Flag from 'react-world-flags'


const ColorBar = React.lazy(() => import('../ColorBar'));
const LanguageSelector = styled.div`
		display: flex;
		justify-content:center;
		align-items: center;

`;
	const StyledFlag = styled(Flag)`
	max-height: 15px !important;
	padding: 30px;
	:hover{
		cursor: pointer;
	}
`;
const TopNav = () => {
	const { isAuthenticated, user, isLoading } = useAuth0();
	// const [orgColor, setOrgColor] = useState("#000")
	const { orgColor, GetOrg, setLang } = useContext(AppContext);

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
	const LocaleSelector = (locale) => {
		localStorage.setItem('lang', locale);
		setLang(locale)
		window.location.reload();
	}
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
							<LanguageSelector>
								<StyledFlag code="fi" onClick={() => LocaleSelector("fi")} />
								<StyledFlag code="gb" onClick={() => LocaleSelector("en-US")} />
							</LanguageSelector>
						</NavItem>
						<NavItem>
							<LogoutButton />
						</NavItem>

					</Wrapper>

					:
					<Wrapper>
						<NavItem>
							<LanguageSelector>
								<StyledFlag code="fi" onClick={() => LocaleSelector("fi")} />
								<StyledFlag code="gb" onClick={() => LocaleSelector("en-US")} />
							</LanguageSelector>
						</NavItem>
						<NavItem>
							<LoginButton />
						</NavItem>
					</Wrapper>
			}
		</Suspense>
	);
};

export default TopNav;