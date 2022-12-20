import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { InputField } from '../../components/InputField'
import { useAppContext } from '../../contexts/AppContext'
import { useApi } from '../../libs/UseApi'
import styles from '../../styles/Login.module.css'
import { Tenent } from '../../types/Tenent'



const Login = (data: Props) => {

	const { tenent, setTenent } = useAppContext()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const router = useRouter()

	useEffect(() => {
		setTenent(data.tenent)
	}, [])

	const handleSubmit = () => {

	}

	const handleSignUp = () => {
		router.push(`/${data.tenent.slug}/signup`)
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Login | {data.tenent.name}</title>
			</Head>

			<Header color={data.tenent.mainColor} backHref={`/${data.tenent.slug}`} />

			<div className={styles.header}>{data.tenent.name}</div>

			<div 
				className={styles.subtitle}
				style={{
					borderBottomColor: data.tenent.mainColor
				}}
			>Use suas credenciais para realizar o login.</div>
			<div className={styles.line}></div>

			<div className={styles.formArea}>
				<div className={styles.inputArea}>
					<InputField
						color={data.tenent.mainColor}
						placeholder={'Digite seu e-mail'}
						value={email}
						onChange={setEmail}
					/>
				</div>
				<div className={styles.inputArea}>
					<InputField
						color={data.tenent.mainColor}
						placeholder={'Digite sua senha'}
						value={password}
						onChange={setPassword}
						password
					/>
				</div>
				<div className={styles.inputArea}>
					<Button
						color={data.tenent.mainColor}
						label={'Entrar'}
						onClick={handleSubmit}
						fill
					/>
				</div>
			</div>

			<div 
				className={styles.forgetArea}
				style={{
					borderBottomColor: data.tenent.mainColor
				}}
			>
				Esqueceu sua senha? <Link href={`/${data.tenent.slug}/forget`} legacyBehavior><a style={{color: data.tenent.mainColor}}>Clique aqui</a></Link>
			</div>
			<div className={styles.line}></div>

			<div className={styles.signupArea}>
				<Button
					color={data.tenent.mainColor}
					label={'Quero me cadastrar'}
					onClick={handleSignUp}
				/>
			</div>

		</div>
	)
}

export default Login

type Props = {
	tenent: Tenent
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const tenentSlug = context.query.tenent

	const api = useApi(tenentSlug as string);

	const tenent = await api.getTenent()

	if (!tenent) {
		return { redirect: { destination: '/', permanent: false } }
	}

	return {
		props: {
			tenent
		}
	}
}