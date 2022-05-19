/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Logo } from '../Logo/Logo';
import style from './Landing.module.css';
import { doc, getDocs, collection, query } from 'firebase/firestore';
import { db } from '../../firebase-config';

import { Map, Marker } from 'pigeon-maps';
import { useQuery } from 'react-query';

export function Landing() {
	const [location, setLocation] = useState<Array<number> | undefined>([]);

	const { data, isLoading } = useQuery(['getBooks'], getData);
	console.log(isLoading,data)


	async function getData() {
		/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

		const docRef = query(collection(db, 'book_point'));
		const queryDoc = await getDocs(docRef);
		queryDoc.forEach((doc) => {
			console.log(doc.data());
		});

		navigator.geolocation.getCurrentPosition(function (position) {
			// setLocation([position.coords.latitude, position.coords.longitude ]);
		});
		return queryDoc.docs;
	}

	// useEffect(() => {
	// 	getData();
	// });

	return (
		<>
			<Logo classes="nav small" landing={false} />
			<div className={style.container}>
				<Map
					height={300}
					width={400}
					defaultCenter={[50.879, 4.6997]}
					defaultZoom={11}
				>
					<Marker width={50} anchor={[50.879, 4.6997]} />
					<Marker width={50} anchor={[50.879, 4.5997]} />
					<Marker width={50} anchor={[50.879, 4.7997]} />
				</Map>
			</div>
		</>
	);
}
