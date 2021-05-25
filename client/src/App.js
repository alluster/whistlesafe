import React, { Suspense } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import theme from './theme';
import { ThemeProvider } from 'styled-components';
import Spinner from './Components/Spinner';
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Provider from './context/Provider';
// Views
const Report = React.lazy(() => import('./Views/Report'));
const FollowReport = React.lazy(() => import('./Views/FollowReport'));
const Home = React.lazy(() => import('./Views/Home'));
const Reports = React.lazy(() => import('./Views/Reports'));
// Components
const Profile = React.lazy(() => import('./Views/Profile'));


const PrivateRoute = ({ component, ...args }) => (
	<Route	
		component={withAuthenticationRequired(component, {
			onRedirecting: () => <Spinner />,
		})}
		{...args}
		/>
);
const App = () => {
	return (
		<Suspense fallback={<Spinner />}>
			<ThemeProvider theme={theme}>
				<Provider>
					<Router>


						<Switch>
							<Route path="/followreport/:company" component={FollowReport} />
							<PrivateRoute exact path="/" component={Home} />
							<PrivateRoute path="/reports" component={Reports} />
							<PrivateRoute path="/report/:id" component={Report} />
							<PrivateRoute path="/profile" component={Profile} />
						</Switch>	
					</Router>
				</Provider>
			</ThemeProvider>
		</Suspense>
	);
}

export default App;
