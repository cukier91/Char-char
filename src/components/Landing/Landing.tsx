/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Logo } from '../Logo/Logo';
import style from './Landing.module.css';
import { doc, getDocs, collection, query } from 'firebase/firestore';
import { db } from '../../firebase-config';

import { Map, Marker } from 'pigeon-maps';
import { useQuery } from 'react-query';

export function Landing() {
	const [location, setLocation] = useState<Array<number>>([]);
	console.log(location);
	const { data, isLoading } = useQuery(['getBooks'], getData);
	console.log(isLoading, data);

	async function getData() {
		/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

		const docRef = query(collection(db, 'book_point'));
		const queryDoc = await getDocs(docRef);
		queryDoc.forEach((doc) => {
			console.log(doc.data().location);
		});

		navigator.geolocation.getCurrentPosition(function (position) {
			setLocation([position.coords.latitude, position.coords.longitude]);
		});

		return queryDoc.docs;
	}

	// useEffect(() => {
	// 	getData();
	// });

	return (
		<>
			<Logo classes="nav small" landing={false} />
			{location.length===0 ? (
				<div>loading...</div>
			) : (
				<div className={style.container}>
					<Map
						height={400}
						width={700}
						defaultCenter={[location[0], location[1]]}
						defaultZoom={11}
						
					>
						<Marker width={50} anchor={[location[0], location[1]]} color={"#E54F6D"} />
					</Map>
				</div>
			)}
		</>
	);
}
