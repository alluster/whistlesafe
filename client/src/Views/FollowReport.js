import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import {
	BrowserRouter as Router,
	useParams
} from "react-router-dom";
import { device } from '../device';
import Container from '../Components/Container';
import Button from '../Components/Button';
import { AppContext } from '../context/Context';
import Spinner from '../Components/Spinner';
import Banner from '../Components/Banner';
import io from "socket.io-client";


const Input = styled.input`
	height: 40px;
	border: #DADADA solid 1px;
	border-radius: 2px;
	padding-left: 20px;
	line-height: 40px;
	background-color: #F7F7F7; 
	margin-top: 10px;

`;

const Label = styled.label`
  color: #6F6F6F;
  font-size: 12px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

`;

const Card = styled.div`
	min-height: 100%;
	background-color: white;
	margin-right: auto;
	margin-left: auto;
	max-width: 900px;
	margin-top: 40px
	border-radius: 16px;
	padding: 10px;
	border: 1px solid #F4F4F4;
	-webkit-box-shadow: 0px 5px 13px 1px rgba(216,216,216,0.26); 
	box-shadow: 0px 5px 13px 1px rgba(216,216,216,0.26);
	@media ${device.mobileL} {
		padding: 10px;

	}
		
	`;
const CardContent = styled.div`
	max-width: 400px;
	margin-right: auto;
	margin-left: auto;
	@media ${device.laptop} {

	}
		
	`;

const FollowReport = () => {

	const { orgId, GetOrg, i18n, lang, t } = useContext(AppContext);
	const history = useHistory();
	const { company, id } = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const [report, setReport] = useState({})
	const [message, setMessage] = useState("");
	const [receivedMessages, setReceivedMessages] = useState([]);
	const [date, setDate] = useState("");
	const [loading, setLoading] = useState(false);
	const [occurTime, setOccurTime] = useState("");
	const [details, setDetails] = useState("");
	const [reportId, setReportId] = useState(id);

	const [authenticated, setAuthenticated] = useState(false)
	const [loginId, setLoginId] = useState("")
	const [password, setPassword] = useState("")

	const socket = io(`${process.env.REACT_APP_API_URL}`, {
		withCredentials: true,

	});

	const sendMessage = () => {
		socket.emit("message", {
			message: message,
			date: date,
			reportId: report.reportId,
			author: "Anonymous"
		});
		setMessage("");
	};
	const onUpdateMessage = event => {
		setDate(new Date());
		setMessage(event.target.value);
	};
	const GetMessages = async (id) => {
		setIsLoading(true)
		if (!isLoading) {
			await axios.get('/api/messages', {
				params: {
					reportId: loginId
				}
			})
				.then(function (response) {
					let data = response.data
					setReceivedMessages(data)
					setIsLoading(false)


				})
				.catch(function (error) {
					console.log(error);
				})
				.finally(function () {
					setIsLoading(false)
				});
		}

	}
	const Login = async () => {
		setIsLoading(true)
		if (!isLoading) {
			await axios.get('/api/login', {
				params: {
					reportId: loginId,
					password: password
				}
			})
				.then(function (response) {
					let data = response.data
					console.log(data);
					setIsLoading(false);
					response.data && setAuthenticated(true);
					response.data && setReport(data);
					GetMessages(response.data.reportId)


				})
				.catch(function (error) {
					console.log(error);
				})
				.finally(function () {
					setIsLoading(false)
					setLoginId("")
					setPassword("")
				});
		}

	}
	console.log(report.reportId)
	useEffect(() => {
		GetOrg(company);
		i18n.changeLanguage(lang);
		socket.on("message", message => {
			setReceivedMessages(prevState => [...prevState, message]);
		});
		console.log(receivedMessages)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	return (
		<div>
				{
					authenticated ?
						<Card>
							<CardContent>
								{
									!loading ?



										<div>
											<Banner
												title={t('banner.follow-report.title')}
												ingress={t('banner.follow-report.ingress')}
												body={t('banner.follow-report.body')}
											>

											</Banner>


											<form>
												<InputGroup>
													<Label>Time of reporting</Label>
													<Input disabled type="text" rows="10" placeholder="Time of reporting" value={report?.dateAdded} />
												</InputGroup>
												<InputGroup>
													<Label>Please describe your concern</Label>
													<Input disabled type="text" rows="10" placeholder="Description" value={report?.report} />
												</InputGroup>
												<InputGroup>
													<Label>When did this happen?</Label>
													<Input disabled type="text" placeholder="Time" value={report?.occurTime} />
												</InputGroup>
												<InputGroup>
													<Label>Please provide any important details</Label>
													<Input disabled type="text" placeholder="Details" value={report?.reportDetails} />
												</InputGroup>
									
												<Banner

													title={t('banner.report-chat.title')}
													ingress={t('banner.report-chat.ingress')}
													body={t('banner.report-chat.body')}
												>


												</Banner>
												<InputGroup>
													<Input style={{ marginBottom: "20px" }} type="text" value={message} onChange={onUpdateMessage} />
													<Button onClick={sendMessage}>Send Message</Button>
												</InputGroup>
												<InputGroup>
													{receivedMessages.slice(0).reverse().map((item, index) => (
														<div key={index}>
															<p>{item.author}</p>
															<p>{item.date}</p>
															<Input disabled value={item.message} type="text" />

														</div>
													))}
												</InputGroup>
											</form>
										</div>
										:
										<Spinner />
								}





							</CardContent>

						</Card>
						:

						<Card>
							<CardContent>
								<Banner

									title={t('banner.login.title')}
									ingress={t('banner.login.ingress')}
									body={t('banner.login.body')}
								></Banner>
								<InputGroup>
									<Label>{t('input.login-id.label')}</Label>
									<Input
										type="text"
										placeholder={t('input.login-id.placeholder')}
										value={loginId}
										onChange={(e) => setLoginId(e.target.value)}
									/>
								</InputGroup>
								<InputGroup>
									<Label>{t('input.login-password.label')}</Label>
									<Input
										type="password"
										placeholder={t('input.login-password.placeholder')}
										value={password}
										onChange={(e) => setPassword(e.target.value)}

									/>
								</InputGroup>
								<InputGroup>
									<Button onClick={Login}>Login</Button>
								</InputGroup>
							</CardContent>
						</Card>
				}

		</div>

	);
};



export default FollowReport;