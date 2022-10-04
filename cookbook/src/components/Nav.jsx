/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Nav = (props) => {
	const { logOut } = UserAuth();
	const navigate = useNavigate();
	const handleClick = async () => {
		try {
			await logOut();
		} catch (error) {
			console.log(error);
		}
		navigate('/');
	};

	const handleRouteClick = () => {
		navigate('/home');
	};
	return (
		<>
			<div className='navbar sticky top-0 z-10 bg-primary text-primary-content flex h-[5%] justify-between'>
				<a
					className='btn btn-ghost normal-case text-xl rounded-md'
					onClick={handleRouteClick}
				>
					CookBook
				</a>
				<a
					onClick={handleClick}
					className='btn btn-ghost normal-case text-xl rounded-md'
				>
					Sign Out
				</a>
			</div>
		</>
	);
};

export default Nav;
