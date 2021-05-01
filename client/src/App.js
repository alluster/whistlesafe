import React, { Suspense } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import GlobalStyle from './globalStyle';
import theme from './theme';
import { ThemeProvider } from 'styled-components';
import Spinner from './Components/Spinner';
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Provider from './context/Provider';
// Views
const Report = React.lazy(() => import('./Views/Report'));
const Home = React.lazy(() => import('./Views/Home'));
const Reports = React.lazy(() => import('./Views/Reports'));
// Components
const Profile = React.lazy(() => import('./Views/Profile'));
const TopNav = React.lazy(() => import('./Components/TopNav'));
const Sidebar = React.lazy(() => import('./Components/Sidebar'));

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

						<TopNav/>

						<Sidebar />
						<Switch>
							<PrivateRoute exact path="/" component={Home} />
							<PrivateRoute path="/reports" component={Reports} />
							<PrivateRoute path="/report/:id" component={Report} />
							<PrivateRoute path="/profile" component={Profile} />
						</Switch>	
					</Router>
					<GlobalStyle />
				</Provider>
			</ThemeProvider>
		</Suspense>
	);
}

export default App;
