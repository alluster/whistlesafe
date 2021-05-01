import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { device } from '../../device';

const Wrapper = styled.div`
    max-width: ;
    margin-left: 300px;
    padding-left: 10px;
	padding-right: 10px;
	@media ${device.laptop} {
		padding-left: 20px;
		padding-right: 20px;
		margin-left: 0px;
		}

`;



const Container = ({ children, className }) => {
    return(
        <Wrapper className={className}>
            {children}
        </Wrapper>
    );
};

 Container.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.string
    ])
 }

export default Container;