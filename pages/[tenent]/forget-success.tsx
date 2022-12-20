import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Icon } from '../../components/Icon'
import { InputField } from '../../components/InputField'
import { useAppContext } from '../../contexts/app'
import { useApi } from '../../libs/UseApi'
import styles from '../../styles/ForgetSuccess.module.css'
import { Tenent } from '../../types/Tenent'

const ForgetSuccess = (data: Props) => {

	const { tenent, setTenent } = useAppContext()
	const [email, setEmail] = useState('')
	const router = useRouter()

	useEffect(() => {
		setTenent(data.tenent)
	}, [])

	const handleSubmit = () => {
        router.push(`/${data.tenent.slug}/login`)
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Esqueci a senha | {data.tenent.name}</title>
			</Head>

			<Header color={data.tenent.mainColor} backHref={`/${data.tenent.slug}/forget`} />

			<div className={styles.iconArea}>
				<Icon color={data.tenent.mainColor} icon={'mailsent'} width={99} height={81} />
			</div>

            <div className={styles.title}>Verifique seu e-mail</div>

			<div className={styles.subtitle}>Enviamos as instruções para recuperação de senha para o seu e-mail.</div>

			<div className={styles.formArea}>
				<div className={styles.inputArea}>
					<Button
						color={data.tenent.mainColor}
						label={'Fazer Login'}
						onClick={handleSubmit}
						fill
					/>
				</div>
			</div>

		</div>
	)
}

export default ForgetSuccess

type Props = {
	tenent: Tenent
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const {tenent: tenentSlug} = context.query

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