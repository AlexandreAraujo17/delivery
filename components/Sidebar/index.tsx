import { useAuthContext } from '../../contexts/auth'
import { Tenent } from '../../types/Tenent'
import { Button } from '../Button'
import styles from './styles.module.css'

type Props = {
    tenent: Tenent,
    open: boolean,
    onClose: () => void
}

export const Sidebar = ({ tenent, open, onClose }: Props) => {
    const { user } = useAuthContext()

    return (
        <div className={styles.container} style={{ width: open ? '100vw' : '0' }}>
            <div className={styles.area}>
                <div className={styles.header}>
                    <div className={styles.loginArea} style={{ borderBottomColor: tenent.mainColor }}>
                        {user &&
                            <div className={styles.userInfo}>
                                <strong>{user.name}</strong>
                                Ultimo pedido há 2 semanas
                            </div>
                        }
                        {!user &&
                            <Button
                                color={tenent.mainColor}
                                label={'Fazer Login'}
                                onClick={() => { }}
                                fill
                            />
                        }
                    </div>
                    <div
                        className={styles.closeBtn}
                        style={{ color: tenent.mainColor }}
                        onClick={onClose}
                    >
                        x
                    </div>
                </div>
                <div className={styles.line}></div>
                <div className={styles.menu}>
                    ...
                </div>
            </div>
        </div>
    )
}