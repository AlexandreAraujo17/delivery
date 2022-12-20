import { GetServerSideProps } from 'next'
import { useEffect } from 'react'
import { Banner } from '../../components/Banner'
import { ProductItem } from '../../components/ProductItem'
import { SearchInput } from '../../components/SearchInput'
import { useAppContext } from '../../contexts/AppContext'
import { useApi } from '../../libs/UseApi'
import styles from '../../styles/Home.module.css'
import { Tenent } from '../../types/Tenent'

const Home = ( data: Props) => {

	const { tenent, setTenent } = useAppContext() 

	useEffect(() => {
		setTenent(data.tenent)
	}, [])

	const handleSearch = (searchValue: string) => {

	}

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<div className={styles.headerTop}>
					<div className={styles.headerTopLeft}>
						<div className={styles.headerTitle}>
							Seja Bem Vindo (a) 👋
						</div>
						<div className={styles.headerSubtitle}>
							O que deseja pra hoje?
						</div>
					</div>
					<div className={styles.headerTopRight}>
						<div className={styles.menuButton}>
							<div className={styles.menuButtonLine} style={{backgroundColor: tenent?.mainColor}}></div>
							<div className={styles.menuButtonLine} style={{backgroundColor: tenent?.mainColor}}></div>
							<div className={styles.menuButtonLine} style={{backgroundColor: tenent?.mainColor}}></div>
						</div>
					</div>
				</div>
				<div className={styles.headerBottom}>
					<SearchInput onSearch={handleSearch} />
				</div>
			</header>

			<Banner />

			<div className={styles.grid}>
				<ProductItem
					data={{
						id: 1,
						image: '/tmp/burger.png',
						categoryName: 'Tradicional',
						name: 'Texas Burger',
						price: 'R$ 25,50'
					}}
				/>
				
				<ProductItem
					data={{
						id: 1,
						image: '/tmp/burger.png',
						categoryName: 'Cheddar',
						name: 'Cheddar Burger',
						price: 'R$ 30,50'
					}}
				/>
				
				<ProductItem
					data={{
						id: 1,
						image: '/tmp/burger.png',
						categoryName: 'Smash',
						name: 'Smash Burger',
						price: 'R$ 27,50'
					}}
				/>
			</div>
		</div>
	)
}

export default Home

type Props = {
	tenent: Tenent
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const tenentSlug = context.query.tenent
	const api = useApi(tenentSlug as string);
	
	const tenent = api.getTenent()

	console.log(tenent);
	
	if(!tenent){
		return { redirect: { destination: '/', permanent: false } }
	}

	return {
		props: {
			tenent
		}
	}
}