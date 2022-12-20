import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { use, useEffect, useState } from 'react'
import { Banner } from '../../../components/Banner'
import { Button } from '../../../components/Button'
import { Header } from '../../../components/Header'
import { ProductItem } from '../../../components/ProductItem'
import { Quantity } from '../../../components/Quantity'
import { SearchInput } from '../../../components/SearchInput'
import { useAppContext } from '../../../contexts/AppContext'
import { useApi } from '../../../libs/UseApi'
import { useFormatter } from '../../../libs/useFormatter'
import styles from '../../../styles/Product-id.module.css'
import { Product } from '../../../types/Product'
import { Tenent } from '../../../types/Tenent'

const Product = (data: Props) => {

	const { tenent, setTenent } = useAppContext()
    const formatter = useFormatter()
    const [qtCount, setQtCount] = useState(0)

	useEffect(() => {
		setTenent(data.tenent)
	}, [])

    const handleAddToCart = () => {
        
    }

    const handleUpdateQt = (newCount: number) => {
        setQtCount(newCount)
    }

	return (
		<div className={styles.container}>
            <Head>
                <title>{data.product.name} | {data.tenent.name}</title>
            </Head>

            <div className={styles.headerArea}>
                <Header 
                    color={data.tenent.mainColor} 
                    backHref={`${data.tenent.slug}`} 
                    title={'Produto'}
                    invert
                />
            </div>

            <div className={styles.headerBg} style={{backgroundColor: data.tenent.mainColor}}></div>

            <div className={styles.productImage}>
                <img src={data.product.image} />
            </div>

            <div className={styles.category}>{data.product.categoryName}</div>
            <div className={styles.title} style={{borderColor: data.tenent.mainColor}}>{data.product.name}</div>
            <div className={styles.line}></div>

            <div className={styles.description}>{data.product.description}</div>

            <div className={styles.qtText}>Quantidade</div>
            <div className={styles.area}>
                <div className={styles.areaLeft}>
                    <Quantity
                        color={data.tenent.mainColor}
                        count={qtCount}
                        onUpdateCount={handleUpdateQt}
                        min={1}
                        
                    />
                </div>
                <div 
                    className={styles.areaRight}
                    style={{color: data.tenent.mainColor}}
                >{formatter.formatPrice(data.product.price)}</div>
            </div>

            <div className={styles.buttonArea}>
                <Button 
                    color={data.tenent.mainColor} 
                    label={'Adicionar à sacola'} 
                    onClick={handleAddToCart} 
                    fill />
            </div>
		</div>
	)
}

export default Product

type Props = {
	tenent: Tenent,
	product: Product
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const {tenent: tenentSlug, id} = context.query
	const api = useApi(tenentSlug as string);

	const tenent = await await api.getTenent()
	const product = await api.getProduct(id as string);

	if (!tenent) {
		return { redirect: { destination: '/', permanent: false } }
	}

	return {
		props: {
			tenent,
			product
		}
	}
}