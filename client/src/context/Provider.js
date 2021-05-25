import React, { useState, useEffect } from 'react';
import { AppContext } from './Context';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import { useAuth0 } from "@auth0/auth0-react";

const Provider = ({ children }) => {
	const { user, isAuthenticated, isLoading } = useAuth0();
	const [orgColor, setOrgColor] = useState("#000");
	const [logoUrl, setLogoUrl] = useState("./logo-dark.svg");
	const [orgId, setOrgId] = useState();
	const { t, i18n } = useTranslation();
	const [lang, setLang] = useState(localStorage.getItem('lang') || 'en-US')

	const GetOrg = async () => {
		if (user) {


			await axios.get('/api/organisation', {
				params: {
					orgId: user.org_id
				}
			})
				.then(function (response) {
					let data = response.data[0]
					try { setOrgColor(data.org_color) }
					catch (error) {
						setOrgColor("#000")
					}
					try { setLogoUrl(data.logo_url) }
					catch (error) {
						setLogoUrl("./logo-dark.svg")
					}
					try { setOrgId(data.org_id) }
					catch (error) {
						setOrgId("")
					}

				})
				.catch(function (error) {
					console.log(error);
				})
				.finally(function () {
				});
		}
	}
	useEffect(() => {
		return () => {

		}
	}, [])
	return (
		<AppContext.Provider
			value={{
				orgColor,
				logoUrl,
				orgId,
				user,
				isAuthenticated,
				GetOrg,
				lang,
				setLang,
				i18n,
				t

			}}
		>
			{children}
		</AppContext.Provider>
	);
}
Provider.propTypes = {
	children: PropTypes.any
};

export default Provider;