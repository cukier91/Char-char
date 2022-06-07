import React, { useEffect, useState } from 'react';
import style from './AddBook.module.css';
import { Logo } from '../Logo/Logo';
import { db } from '../../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { FormikProvider, Form, Field,useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

interface Values {
	city: string;
	postCode: string;
	street: string;
	buildingNo: string;
	bookAuthor: string;
	bookName: string;
	contact: string;
	types: string;
	user: string;
	status: string;
}

interface AddBookData extends Values {
	location:[number,number];
}

export function AddBook() {
	const navigate = useNavigate();
	const [location, setLocation] = useState<[number,number]>([0,0]);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(function (position) {
			setLocation([position.coords.latitude, position.coords.longitude]);
		});
	}, []);

	const initialValues: Values = {
		city: '',
		postCode: '',
		street: '',
		buildingNo: '',
		user: '',
		types: '',
		bookAuthor: '',
		bookName: '',
		contact: '',
		status: 'available'
	};

	const formik=useFormik({
		initialValues: initialValues,
		//validationSchema: {},
		onSubmit: (values) => {
						addBook({...values,location});
					},
	})

	const addBook = async (values:AddBookData) => {
		try {
			const {city,postCode,street,buildingNo,bookAuthor,bookName,contact,user,types,status,location}=values;
			await addDoc(collection(db, 'book_point'), {
				city: city,
				postCode: postCode,
				street: street,
				building_no: buildingNo,
				bookAuthor: bookAuthor,
				bookName: bookName,
				contact: contact,
				user: user,
				types: types,
				location: location,
				status: status,
				id: uuidv4(),
			});
		} catch (err) {
			alert(err);
		}
	};

	const FormInput=(label:string,name:string,type="text")=>{
		//to upper case label first
		return <><label className={style.label} htmlFor={label}>
							{label}: 
						</label>
						<Field className={style.input} id={label} type={type} name={name} /></>
	}

	return (
		<>
			<div className={style.contain}>
				<h1>Add Book Form</h1>
				<FormikProvider value={formik}>
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
						<label className={style.label} htmlFor="buildingNo">
							Building no:
						</label>
						<Field
							className={style.input}
							id="buildingNo"
							type="text"
							name="buildingNo"
						/>
						<label className={style.label} htmlFor="bookAuthor">
							Book author:
						</label>
						<Field
							className={style.input}
							id="bookAuthor"
							type="text"
							name="bookAuthor"
						/>
						<label className={style.label} htmlFor="bookName">
							Book name:
						</label>
						<Field
							className={style.input}
							id="bookName"
							type="text"
							name="bookName"
						/>
						<label className={style.label} htmlFor="contact">
							Contact number:
						</label>
						<Field
							className={style.input}
							id="contact"
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
				</FormikProvider>
			</div>
		</>
	);
}
