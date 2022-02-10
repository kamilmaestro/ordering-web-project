import React from 'react';
import './homePage.css';
import circle from '../../images/circle.png';
import { PagePreview } from '../../components/PagePreview/PagePreview';
import { HomeHeader } from '../../components/HomeHeader/HomeHeader';
import { useHistory } from "react-router-dom";
import { SIGN_IN_PAGE_URL } from '../../utils/urlProvider';

export const HomePage = () => {

	const history = useHistory();

	const goToLoginPage = () => {
		history.push(SIGN_IN_PAGE_URL);
	}

	return (
		<div>
			<HomeHeader color='transparent' onAccountIconClick={goToLoginPage} />
			<div className='container'>
				<div className='left'>
					<PagePreview onButtonClick={goToLoginPage} />
				</div>
				<div className='right'>
					<img src={circle} alt='dish' className='image' />
				</div>
			</div>
		</div>
	);
};