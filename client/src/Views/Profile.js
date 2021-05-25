import React, { useState, useContext, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Container from "../Components/Container";
import axios from 'axios'
import { AppContext } from '../context/Context';
const TopNav = React.lazy(() => import('../Components/TopNav'));
const Sidebar = React.lazy(() => import('../Components/Sidebar'));

const Profile = () => {
	const context = useContext(AppContext)

	const { user, isAuthenticated, isLoading } = useAuth0();




	return (
		<div>

			<TopNav />

			<Sidebar />
			<Container>
				<h1>Profile</h1>
				{
					isAuthenticated && (
						<div>
							<h3>{context.user.email}</h3>
						</div>
					)
				}
			</Container>
		</div>


	);
};

export default Profile;