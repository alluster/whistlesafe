import React, { Suspense } from 'react';
import Container from '../Components/Container';

const Table = React.lazy(() => import('../Components/Table'));
const Spinner = React.lazy(() => import('../Components/Spinner'));

const Reports = () => {

	return (
		<Suspense fallback={<Spinner />}>
			<Container>
					<Table />
			</Container>
		</Suspense>

	);
}

export default Reports;
