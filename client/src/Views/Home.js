import React, { Suspense, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import Container from '../Components/Container';
import axios from 'axios';

import Profile from './Profile';
const Table = React.lazy(() => import('../Components/Table'));
const Spinner = React.lazy(() => import('../Components/Spinner'));


const Home = () => {
	
	useEffect(() => {
		return () => {
		}
	}, [])

	return (
		<Suspense fallback={<Spinner />}>
			<Container>
					<Table />
			</Container>
		</Suspense>

	);
}

export default Home;
