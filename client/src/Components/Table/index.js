import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios'
import { Link } from "react-router-dom";
import { AppContext } from '../../context/Context';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '../Button';

const Table = () => {
	const { isLoading, user } = useAuth0()
	const [IsLoading, setIsLoading] = useState(false);
	const [reports, setReports] = useState()
	const { GetOrg, orgId } = useContext(AppContext);

	const GetReports = async () => {
		setIsLoading(true)
		if (!isLoading) {
			await axios.get('/api/reports', {
				params: {
					orgId: user.org_id
				}
			})
				.then(function (response) {
					let data = response.data
					setReports(data)
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
	const Table = styled.table`
		caption-side: top;
		border: none;
		border-collapse: collapse;
		empty-cell: show;	
		vertical-align: middle;
		width: 100%;
	
		thead > tr {
			background-color: none;
			height: 50px;
			color: ${props => props.theme.colors.disabled};
			text-align: left;
		};
		tbody {
			vertical-align: middle;
		};              
		
		td, th {
			
			border: none;
		};
		td {
			height: 80px;
			padding-left: 20px;
			padding-right: 20px;
		};
		th:last-child {
			text-align: right;

		}
		tbody tr td {
			:last-child {
				text-align: right;
				padding-right: 15px;
			}
		}
			

		}
		tbody tr {
			:nth-of-type(odd) {
				background-color: ${props => props.theme.colors.white};
				
			};
		// :hover {
		// 	background-color: lightpink;
		// };
		
	`;

	const Circle = styled.div`
		width: 10px;
		height: 10px;
		background: red;
		border-radius: 50%;
		margin-left: 20px;
		margin-right: 20px;
		margin-top: 5px;

	`
	const State = styled.div`
		display: flex;
		flex-direction: row;

	`;


	useEffect(() => {
		GetOrg()
		GetReports()

		return () => {
			GetReports()
		}
	}, [])

	return (
		<div style={{ overflowX: "auto" }} >
			{
				reports ?
					<Table>



						<tbody>

							{reports.slice(0).reverse().map((item, i) => {
								return (

									<tr key={i}>
											<td>
											<State>
												<Circle />
												{item.state}
											</State>
										</td>

										<td>
											{item.date_added}
										</td>
										<td>
											{item.report_id}
										</td>

									
										<td >
											<Link to={`/report/${item.report_id}`} >
												<Button>
													<h4>Open report</h4>
												</Button>
											</Link>
										</td>
									</tr>

								)
							}
							)
							}

						</tbody>


					</Table>

					:
					<div></div>
			}
		</div>


	);
};

export default Table;