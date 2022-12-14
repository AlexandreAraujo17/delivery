import Link from 'next/link'
import { useAppContext } from '../../contexts/app'
import { useFormatter } from '../../libs/useFormatter'
import { Product } from '../../types/Product'
import styles from './styles.module.css'

type Props = {
    data: Product
}

export const ProductItem = ({ data }: Props) => {

	const { tenent } = useAppContext()
    const formatter = useFormatter();

    return (
        <Link href={`/${tenent?.slug}/product/${data.id}`} style={{textDecoration: 'none'}}>
            <div className={styles.container}>
                <div className={styles.head} style={{ backgroundColor: tenent?.secondColor }}></div>
                <div className={styles.info}>
                    <div className={styles.img}>
                        <img src={data.image} alt="" />
                    </div>
                    <div className={styles.catName}>{data.categoryName}</div>
                    <div className={styles.name}>{data.name}</div>
                    <div className={styles.price} style={{ color: tenent?.mainColor }}>{formatter.formatPrice(data.price)}</div>
                </div>
            </div>
        </Link>
    )
}