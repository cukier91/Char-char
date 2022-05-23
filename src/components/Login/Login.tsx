import style from './Login.module.css';
import { auth } from '../../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useMutation } from 'react-query';

interface Values {
	email: string;
	password: string;
}

export function Login() {
	const initialValues: Values = { email: '', password: '' };
	const navigate = useNavigate();

	
	const loginator = async (
		email = initialValues.email,
		password = initialValues.password
		) => {
			try {
				await signInWithEmailAndPassword(auth, email, password);
				return navigate('/home');
			} catch (err) {
				alert(err);
			}
		};
		const mutation = useMutation(loginator,{
			onSuccess: ()=>{
				navigate('/home')
			},
			onError: ()=>{
				alert("error")
			}
		})

	return (
		<>
			<div className={style.contain}>
				<Formik
					initialValues={initialValues}
					onSubmit={(values) => {
						loginator(values.email, values.password);
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
