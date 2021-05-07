import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios'


import { device } from '../device';

import Button from '../Components/Button';
import { AppContext } from '../context/Context';
import Spinner from '../Components/Spinner';


import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams
  } from "react-router-dom";
import Container from '../Components/Container';

const Input = styled.textarea`
	height: 40px;
	border: #DADADA solid 1px;
	border-radius: 2px;
	padding-left: 20px;
	line-height: 40px;
	background-color: #F7F7F7; 
	margin-top: 10px;

`
const Label = styled.label`
  color: #6F6F6F;
  font-size: 12px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

`

const Card = styled.div `
	min-height: 100%;
	background-color: white;
	margin-right: auto;
	margin-left: auto;
	margin-top: 40px
	width: 100%;
	border-radius: 16px;
	padding: 20px;
	border: 1px solid #F4F4F4;
	-webkit-box-shadow: 0px 5px 13px 1px rgba(216,216,216,0.26); 
	box-shadow: 0px 5px 13px 1px rgba(216,216,216,0.26);
	@media ${device.laptop} {
		width: 100%;

	}
		
	`;
const CardContent = styled.div `
	max-width: 400px;
	margin-right: auto;
	margin-left: auto;
	@media ${device.laptop} {
		width: 70vw;

	}
		
	`;



const Report = (props) => {

	const [IsLoading, setIsLoading] = useState(false);
	const [report, setReport] = useState()
	let { id } = useParams();

	const GetReport = async () => {
		setIsLoading(true)
		await axios.get('/api/report', {
			params: {
				reportId: id
			}
		})
		.then(function (response) {
			console.log(response.data)
			let data = response.data
			setReport(data)
			setIsLoading(false)
	
	
		})
		.catch(function (error) {
			console.log(error);
		})
		.finally(function () {
			setIsLoading(false)
		});
	}
	
	useEffect(() => {
		GetReport()
		return () => {
		}
	}, [])


    return(
		<Container>
			<Card>
				<CardContent>
				{
					!IsLoading ?

					

					<div>
				<h4 style={{marginBottom: "30px" }} >Report ID: {report?.reportId}</h4> 
				{/* <h4 style={{marginBottom: "30px" }}>Password: {}</h4>  */}

				<form>
				<InputGroup>
						<Label>Time of reporting</Label>
						<Input disabled type="text" rows="10" placeholder="Time of reporting" value={report?.dateAdded}  />
					</InputGroup>
					<InputGroup>
						<Label>Please describe your concern</Label>
						<Input disabled type="text" rows="10" placeholder="Description" value={report?.report}  />
					</InputGroup>
					<InputGroup>
						<Label>When did this happen?</Label>
						<Input disabled type="text" placeholder="Time" value={report?.occurTime}  />
					</InputGroup>
					<InputGroup>
						<Label>Please provide any important details</Label>
						<Input disabled type="text" placeholder="Details" value={report?.reportDetails} />
					</InputGroup>
			
					

				
				</form>
					</div>
					:
					<Spinner />
				}
				
					

				

				</CardContent>

				</Card>
		</Container>
    );
};

 Report.propTypes = {
    props: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.string
    ])
 }

export default Report;