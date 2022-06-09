/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Logo } from '../Logo/Logo';
import style from './Landing.module.css';
import { doc, getDocs, collection, query, DocumentData } from 'firebase/firestore';
import { db } from '../../firebase-config';

import { Map, Marker, ZoomControl, Overlay } from 'pigeon-maps';
import { useQuery } from 'react-query';



export function Landing() {
	const [location, setLocation] = useState<Array<number>>([]);
	const { data, isLoading } = useQuery(['getBooks'], getData);
	

	async function getData() {
		/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
		
		const docRef = query(collection(db, 'book_point'));
		const queryDoc = await getDocs(docRef);
		queryDoc.forEach((doc) => {
			// console.log(doc.data());
		});

		navigator.geolocation.getCurrentPosition(function (position) {
			setLocation([position.coords.latitude, position.coords.longitude]);
		});

		return queryDoc.docs;
	}

	return (
		<>
			<Logo classes="nav small" landing={false} />
			{location.length === 0 ? (
				<div>loading...</div>
			) : (
				<div className={style.container}>
					<Map
						height={400}
						width={700}
						defaultCenter={[location[0], location[1]]}
						defaultZoom={11}
					>
						<ZoomControl />
						<Marker
							width={50}
							anchor={[location[0], location[1]]}
							color={'#E54F6D'}
						/>
						{data?.map((element) => {
							return(
								<Marker
								key={element.data().id}
							width={50}
							anchor={element.data().location}
							color={'#724E91'}
						/>
							)
						})}

					</Map>
				</div>
			)}
		</>
	);
}
