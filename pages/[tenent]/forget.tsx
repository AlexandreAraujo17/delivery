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
import styles from '../../styles/Forget.module.css'
import { Tenent } from '../../types/Tenent'

const Forget = (data: Props) => {

	const { tenent, setTenent } = useAppContext()
	const [email, setEmail] = useState('')
	const router = useRouter()

	useEffect(() => {
		setTenent(data.tenent)
	}, [])

	const handleSubmit = () => {
        router.push(`${data.tenent.slug}/forget-success`)
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Esqueci a senha | {data.tenent.name}</title>
			</Head>

			<Header color={data.tenent.mainColor} backHref={`/${data.tenent.slug}/login`} />

			<div className={styles.header}>{data.tenent.name}</div>

            <div className={styles.title}>Esqueceu sua senha?</div>

			<div 
				className={styles.subtitle}
				style={{
					borderBottomColor: data.tenent.mainColor
				}}
			>Preencha o campo com seu e-mail e receba as instruções necessárias para redefinir a sua senha.</div>
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
					<Button
						color={data.tenent.mainColor}
						label={'Enviar'}
						onClick={handleSubmit}
						fill
					/>
				</div>
			</div>

		</div>
	)
}

export default Forget

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