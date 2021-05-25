import React, { Suspense, useEffect, useContext } from 'react';
import Container from '../Components/Container';
import { AppContext } from '../context/Context';
const Table = React.lazy(() => import('../Components/Table'));
const Spinner = React.lazy(() => import('../Components/Spinner'));
const TopNav = React.lazy(() => import('../Components/TopNav'));
const Sidebar = React.lazy(() => import('../Components/Sidebar'));

const Home = () => {
	const { GetOrg } = useContext(AppContext);
	useEffect(() => {
		GetOrg()
		return () => {
		}
	}, [])

	return (
		<Suspense fallback={<Spinner />}>
			<TopNav />

			<Sidebar />
			<Container>
				<Table />
			</Container>
		</Suspense>

	);
}

export default Home;
