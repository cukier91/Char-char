import React, { useEffect, useState } from 'react';
import style from './AddBook.module.css';
import { Logo } from '../Logo/Logo';
import { db } from '../../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { string } from 'yup';

interface Values {
	city: string;
	postCode: string;
	street: string;
	building_no: string;
	book_author: string;
	book_name: string;
	contact: string;
	types: string;
	user: string;
	location: [number, number];
	status: string;
	id: string;
}

export function AddBook() {
	const navigate = useNavigate();
	const [location, setLocation] = useState<Array<number>>([]);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(function (position) {
			setLocation([position.coords.latitude, position.coords.longitude]);
		});
	}, []);

	const initialValues: Values = {
		city: '',
		postCode: '',
		street: '',
		building_no: '',
		user: '',
		types: '',
		book_author: '',
		book_name: '',
		contact: '',
		location: [location[0], location[1]],
		status: 'available',

		id: uuidv4(),
	};

	const addBook = async (
		city = initialValues.city,
		postCode = initialValues.postCode,
		street = initialValues.street,
		building_no = initialValues.building_no,
		bookAuthor = initialValues.book_author,
		bookName = initialValues.book_name,
		contact = initialValues.contact,
		types = initialValues.types,
		user = initialValues.user,
		status = initialValues.status,
		location = initialValues.location,
		id = initialValues.id
	) => {
		try {
			await addDoc(collection(db, 'book_point'), {
				city: city,
				postCode: postCode,
				street: street,
				building_no: building_no,
				bookAuthor: bookAuthor,
				bookName: bookName,
				contact: contact,
				user: user,
				types: types,
				location: location,
				status: status,
				id: id,
			});
		} catch (err) {
			alert(err);
		}
	};

	return (
		<>
			<div className={style.contain}>
				<h1>Add Book Form</h1>
				<Formik
					initialValues={initialValues}
					onSubmit={(values) => {
						addBook(
							values.city,
							values.postCode,
							values.street,
							values.building_no,
							values.book_author,
							values.book_name,
							values.contact,
							values.types,
							values.user,	
						);
					}}
				>
					<Form className={style.form_container}>
						<label className={style.label} htmlFor="city">
							City:
						</label>
						<Field className={style.input} id="city" type="text" name="city" />
						<label className={style.label} htmlFor="postCode">
							Post code:
						</label>
						<Field
							className={style.input}
							id="postCode"
							type="text"
							name="postCode"
						/>
						<label className={style.label} htmlFor="street">
							Street:
						</label>
						<Field
							className={style.input}
							id="street"
							type="text"
							name="street"
						/>
						<label className={style.label} htmlFor="building_no">
							Building no:
						</label>
						<Field
							className={style.input}
							id="building_no"
							type="text"
							name="building_no"
						/>
						<label className={style.label} htmlFor="book_author">
							Book author:
						</label>
						<Field
							className={style.input}
							id="book_author"
							type="text"
							name="book_author"
						/>
						<label className={style.label} htmlFor="book_name">
							Book name:
						</label>
						<Field
							className={style.input}
							id="book_name"
							type="text"
							name="book_name"
						/>
						<label className={style.label} htmlFor="contact">
							Contact number:
						</label>
						<Field
							className={style.input}
							id="contanct"
							type="text"
							name="contact"
						/>
						<label className={style.label} htmlFor="user">
							Your name:
						</label>
						<Field className={style.input} id="user" type="text" name="user" />

						<div role="group" aria-labelledby="my-radio-group">
							<label>
								<Field type="radio" name="types" value="To rent" />
								To rent
							</label>
							<label>
								<Field type="radio" name="types" value="For free" />
								For free
							</label>
							<label>
								<Field type="radio" name="types" value="Sale" />
								For sale
							</label>
							<label>
								<Field type="radio" name="types" value="Exchange" />
								Exchange
							</label>
						</div>

						<button type="submit" className={style.btn_submit}>
							Submit
						</button>
						<p className={style.label}>tu będzie obsługa walidacji</p>
					</Form>
				</Formik>
			</div>
		</>
	);
}
