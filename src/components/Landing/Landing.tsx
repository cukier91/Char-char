import React from 'react';
import { Logo } from '../Logo/Logo';
import style from "./Landing.module.css";

export function Landing() {

	return (
		<>
        <Logo classes="nav small" landing={false} />
			<div className={style.container}>sdsd</div>
		</>
	);
}

//clsx