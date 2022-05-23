import React from 'react';
import style from './AddBook.module.css';
import { Logo } from '../Logo/Logo';
import { db } from '../../firebase-config';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { Formik, Form, Field } from 'formik';
import { string } from 'yup';

interface Values {
	user: string;
	type: string;
	book: { book_author: string; book_name: string };
	contact: string;
	location: [number, number];
	status: string;
}

export function AddBook() {
	const initialValues: Values = {
		user: '',
		type: '',
		book: { book_author: '', book_name: '' },
		contact: '',
		location: [51.107883, 17.038538],
		status: '',
	};

	const addBook = async (
		user = initialValues.user,
		type = initialValues.type,
		book = initialValues.book,
		contact = initialValues.contact,
		location = initialValues.location,
		status = initialValues.status
	) => {
		try {
			await setDoc(doc(db, 'book_point'), {
				user: user,
				type: type,
				book: book,
				contact: contact,
				location: location,
				status: status,
			});
		} catch (err) {
			alert(err);
		}
	};

	return (
		<>
			<Logo classes="nav small" landing={false} />
			<div className={style.contain}>
				<Formik
					initialValues={initialValues}
					onSubmit={(values) => {
						addBook(values.user, values.type);
					}}
				>
					<Form className={style.form_container}>
						<label className={style.label} htmlFor="email">
							E-mail
						</label>
						<Field
							className={style.input}
							id="email"
							type="email"
							name="email"
						/>
						<label className={style.label} htmlFor="password">
							Password
						</label>
						<Field
							className={style.input}
							id="password"
							type="password"
							name="password"
						/>

						<div role="group" aria-labelledby="my-radio-group">
							<label>
								<Field type="radio" name="type" value="To rent" />
								To rent
							</label>
							<label>
								<Field type="radio" name="type" value="For free" />
								For free
							</label>
							<label>
								<Field type="radio" name="type" value="Sale" />
								For sale
							</label>
							<label>
								<Field type="radio" name="type" value="Exchange" />
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
