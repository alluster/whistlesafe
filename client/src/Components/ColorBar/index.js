import React, { useEffect } from 'react';
import styled from 'styled-components';


const ColorBar = (props) => {
	const Bar = styled.div`
		height: 6px; 
		position: absolute; 
		z-index: 1000;
		top: 0px;
		width: 100%;

	`

	useEffect(() => {
		return () => {
		}
	}, [])

	return (
		<Bar style={{ backgroundColor: props.orgColor }} />

	);
};

export default ColorBar;