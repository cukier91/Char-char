import React, { useEffect, useState } from 'react';
import style from './AddBook.module.css';
import { Logo } from '../Logo/Logo';
import { db } from '../../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';

interface Values {
	city: string;
	postCode: string;
	book_author: string;
	book_name: string;
	contact: string;
	types: string;
	user: string;
	location: [number, number];
	status: string;
	
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
		user: 'some',
		types: '',
		book_author: '',
		book_name: '',
		contact: '',
		location: [location[0], location[1]],
		status: 'available',
	};

	const addBook = async (
		city = initialValues.city,
		postCode = initialValues.postCode,
		bookAuthor = initialValues.book_author,
		bookName = initialValues.book_name,
		contact = initialValues.contact,
		types = initialValues.types,	
		user = initialValues.user,
		status = initialValues.status,
		location = initialValues.location,
		
	) => {
		try {
			await addDoc(collection(db, 'book_point'), {
				city: city,
				postCode: postCode,
				bookAuthor: bookAuthor,
				bookName: bookName,
				contact: contact,
				user: user,
				types: types,
				location: location,
				status: status,
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
							values.book_author,
							values.book_name,
							values.contact,
							values.types
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
						<Field className={style.input} id="street" type="text" name="street" />
						<label className={style.label} htmlFor="building_no">
							Building no:
						</label>
						<Field className={style.input} id="building_no" type="text" name="building_no" />
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
						<p className={style.label}>
							Nie masz jeszcze konta?
							<a className={style.a_register} href="/register">
								Zarejestruj się
							</a>
						</p>
					</Form>
				</Formik>
			</div>
		</>
	);
}
