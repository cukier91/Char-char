/* eslint-disable */
import React, { useState } from 'react';
import { Logo } from '../Logo/Logo';
import { ShowMap } from '../ShowMap/ShowMap';
import style from './Landing.module.css';
import {
	doc,
	getDocs,
	collection,
	query,
	DocumentData,
	where,
} from 'firebase/firestore';
import { db } from '../../firebase-config';


import { useQuery } from 'react-query';

export function Landing() {
	const [location, setLocation] = useState<Array<number>>([]);
	const [counters, setCounters] = useState<number>();
	const { data, isLoading } = useQuery(['getBooks'], getData);
	const [currentBookId, setCurrentBookId] = useState("");
	// const { data: boxData, isLoading: boxIsLoading } = useQuery(
	// 	['getCurrentBook',currentBookId],
	// 	getBookData
	// );

	console.log(counters)

	async function getData() {
		/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

		const docRef = query(collection(db, 'book_point'));
		const queryDoc = await getDocs(docRef);
		navigator.geolocation.getCurrentPosition(function (position) {
			setLocation([position.coords.latitude, position.coords.longitude]);
		});

		return queryDoc.docs;
	}

	// async function getBookData() {
	// 	console.log("currentBookId", currentBookId)
	// 	const resp = query(collection(db, "book_point"), where("id", "==", `${currentBookId}`));
	// 	/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
	// 	const querySnapshot = await getDocs(resp);
	// 	querySnapshot.forEach((doc) => {
	// 		// doc.data() is never undefined for query doc snapshots
	// 		console.log(doc.id, " => ", doc.data());
	// 	});
	// 	return querySnapshot;
	// }

	return (
		<>
			<Logo classes="nav small" landing={false} />
			{location.length === 0 ? (
				<div>loading...</div>
			) : (
				
				<div className={style.user_table}>

				<table>
					<thead>
						<tr>
							<th>No.</th>
							<th>Author</th>
							<th>Tittle</th>
							<th>Type</th>
							<th>City</th>
							<th>Street</th>
						</tr>
					</thead>
					<tbody>
						{data?.map(
							(
								element,
								counter
							) => (
									<tr key={counter} onClick={() => setCounters(counter)}
									>
										<td>{counter+1}</td>
										<td>{element.data().bookAuthor}</td>
										<td>{element.data().bookName}</td>
										<td>{element.data().types}</td>
										<td>{element.data().city}</td>
										<td>{element.data().street}</td>
									
									</tr>
								)
						)}
					</tbody>
				</table>
			</div>
			)}
		</>
	);
}
