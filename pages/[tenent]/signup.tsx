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
import styles from '../../styles/SignUp.module.css'
import { Tenent } from '../../types/Tenent'



const SignUp = (data: Props) => {

	const { tenent, setTenent } = useAppContext()
	const [name, setName] = useState('')
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
				<title>Cadastro | {data.tenent.name}</title>
			</Head>

			<Header color={data.tenent.mainColor} backHref={`/${data.tenent.slug}/login`} />

			<div className={styles.header}>{data.tenent.name}</div>

			<div 
				className={styles.subtitle}
				style={{
					borderBottomColor: data.tenent.mainColor
				}}
			>Preencha os campos para criar o seu cadastro.</div>
			<div className={styles.line}></div>

			<div className={styles.formArea}>
				<div className={styles.inputArea}>
					<InputField
						color={data.tenent.mainColor}
						placeholder={'Digite seu nome'}
						value={name}
						onChange={setName}
					/>
				</div>
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
						label={'Cadastrar'}
						onClick={handleSubmit}
						fill
					/>
				</div>
			</div>

			<div className={styles.forgetArea}>
				Já tem cadastro? <Link href={`/${data.tenent.slug}/login`} legacyBehavior><a style={{color: data.tenent.mainColor}}>Fazer Login</a></Link>
			</div>

		</div>
	)
}

export default SignUp

type Props = {
	tenent: Tenent
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const tenentSlug = context.query.tenent

	const api = useApi();

	const tenent = api.getTenent(tenentSlug as string)

	if (!tenent) {
		return { redirect: { destination: '/', permanent: false } }
	}

	return {
		props: {
			tenent
		}
	}
}