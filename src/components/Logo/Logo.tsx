import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { navElements } from '../../ConstNav';
import { auth } from '../../firebase-config';
import {onAuthStateChanged, signOut } from 'firebase/auth';



// import { useNavigate } from "react-router-dom";

interface LogoProps {
	classes?: string;
	landing?: boolean;
}

export const Logo = ({ classes = 'nav', landing = true }: LogoProps) => {
	/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
	const [userState, setUserState] = useState<string | null>('');
	onAuthStateChanged(auth, (user) => {
		user ? setUserState(user.email) : null;
	});

	const logout = async () => {
		await signOut(auth);
	};

	return (
		<div className={`${classes}`}>
			<div className="logo">
				<Link className="non-link deep-purple" to="/">
					Char Char
				</Link>
			</div>
			<div className="links">
				{navElements.map(({ name, url }) => {
					return (
						<a className="non-link pink" key={name} href={url}>
							{name}
						</a>
					);
				})}

				{userState ? (
					<a className="non-link pink" href="/" onClick={logout}>
						Logout
					</a>
				) : (
					<a className="non-link pink" href="/login">
						Login
					</a>
				)}
			</div>
			{/* <div>{user.email}</div> */}
			{landing ? (
				<div className="intro deep-purple">
					<h1>
						Failed gift? A great book the world must read? Rate, recommend and
						give your books a new life.
						<br /> Join us today
					</h1>
					<button className="btn" ><Link className="non-link honey_dew" to="/register">Dołącz do nas</Link></button>
				</div>
			) : null}
		</div>
	);
};
