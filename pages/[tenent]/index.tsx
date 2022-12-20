import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import { Banner } from '../../components/Banner'
import { ProductItem } from '../../components/ProductItem'
import { SearchInput } from '../../components/SearchInput'
import { useAppContext } from '../../contexts/AppContext'
import { useApi } from '../../libs/UseApi'
import styles from '../../styles/Home.module.css'
import { Product } from '../../types/Product'
import { Tenent } from '../../types/Tenent'

const Home = (data: Props) => {

	const { tenent, setTenent } = useAppContext()
	const [products, setProducts] = useState<Product[]>(data.products)

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
							<div className={styles.menuButtonLine} style={{ backgroundColor: tenent?.mainColor }}></div>
							<div className={styles.menuButtonLine} style={{ backgroundColor: tenent?.mainColor }}></div>
							<div className={styles.menuButtonLine} style={{ backgroundColor: tenent?.mainColor }}></div>
						</div>
					</div>
				</div>
				<div className={styles.headerBottom}>
					<SearchInput onSearch={handleSearch} />
				</div>
			</header>

			<Banner />

			<div className={styles.grid}>
				{products.map((item, index) => (
					<ProductItem
						key={index}
						data={item}
					/>
				))}
			</div>
		</div>
	)
}

export default Home

type Props = {
	tenent: Tenent,
	products: Product[]
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const tenentSlug = context.query.tenent
	const api = useApi(tenentSlug as string);

	const tenent = await await api.getTenent()
	const products = await api.getAllProducts();

	console.log(tenent);

	if (!tenent) {
		return { redirect: { destination: '/', permanent: false } }
	}

	return {
		props: {
			tenent,
			products
		}
	}
}