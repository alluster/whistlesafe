
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body, html {
        margin: 0px;
        padding: 0px;
		max-width: 100% ;
		min-height: 100vh;
		font-family: 'Open Sans', sans-serif !important;
		font-display: swap;
		color: ${props => props.theme.colors.black};
		hyphens: manual;
		text-rendering: optimizeLegibility;
		background-color: ${props => props.theme.colors.background}
		
	}

    
    h1 {

        margin: 0px;
		font-weight: 600;
    }
    h2 {
		font-weight: 600;

		margin: 0px;

    }
    h3 {
		font-weight: 600;

		margin: 0px;

    }
    h4 {
		margin: 0px;
		font-weight: 600;

    }
    h5 {
		font-weight: 600;

		margin: 0px;

    }
    h6 {
		font-weight: 600;

		margin: 0px;

	}
	p {
		margin: 8px 0px 8px 0px;

	}
    img {
        max-width: 100%;
    }
    a {
		text-decoration: none;
		color: black;

    }
    a:link {
		color: black;
		text-decoration: none;
		::-webkit-any-link {
			text-decoration: none;
		}
    }
    a:focus {
		text-decoration: none;
    }
    a:active {
		text-decoration: none;
    }
    a:visited {
		text-decoration: none;
		color: black;
    }
    a:hover {
		cursor: pointer !important;
		text-decoration: none;
    }
    button {
		all: unset;
		font-family: 'Open Sans', sans-serif;
		

	}
	button:hover {
		cursor: pointer !important;
	}





    input {
		all: unset;
		font-family: 'Open Sans', sans-serif;

        ::-webkit-input-placeholder {
    }
    :-moz-placeholder {
        /* FF 4-18 */
        opacity: 1;
    }
    ::-moz-placeholder {
        /* FF 19+ */
        opacity: 1;
    }
    :-ms-input-placeholder {
        /* IE 10+ */
    }
    ::-ms-input-placeholder {
        /* Microsoft Edge */
    }
    ::placeholder {
        /* modern browser */
    }
    
    
`;

export default GlobalStyle;