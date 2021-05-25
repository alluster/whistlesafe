import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
import './i18n';
import GlobalStyle from './globalStyle';

ReactDOM.render(
	<React.StrictMode>
		<Auth0Provider
			domain={process.env.REACT_APP_DOMAIN}
			clientId={process.env.REACT_APP_CLIENT_ID}
			redirectUri={process.env.REACT_APP_REDIRECT_URI}
			useRefreshTokens={true}
			cacheLocation="localstorage"
		>
			<GlobalStyle />

			<App />
		</Auth0Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
