import style from './Register.module.css';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Formik, Form, Field } from 'formik';
import { auth } from '../../firebase-config';

interface Values {
	email: string;
	password: string;
}

export function Register() {
	const initialValues: Values = { email: '', password: '' };
	const navigate = useNavigate();

	const registrator = async (
		email = initialValues.email,
		password = initialValues.password
	) => {
		try {
			const user = await createUserWithEmailAndPassword(auth, email, password);
			return navigate('/home');
			return;
		} catch (err) {
			alert(err);
		}
	};
	return (
		<>
			<div className={style.contain}>
				<Formik
					initialValues={initialValues}
					onSubmit={(values) => {
						registrator(values.email, values.password);
					}}
				>
					<Form className={style.form_container}>
						<label className={style.label} htmlFor="email">
							E-mail
						</label>
						<Field
							className={style.input}
							id="email"
							name="email"
							type="email"
						/>
						<label className={style.label} htmlFor="password">
							Password
						</label>
						<Field
							className={style.input}
							id="password"
							name="password"
							type="password"
						/>
						<button type="submit" className={style.btn_submit}>
							Submit
						</button>
						<p className={style.label}>
							Masz już konto?{' '}
							<a className={style.a_register} href="/login">
								Zaloguj się{' '}
							</a>
						</p>
					</Form>
				</Formik>
			</div>
		</>
	);
}
