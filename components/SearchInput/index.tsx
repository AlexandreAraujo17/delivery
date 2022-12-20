import { useState } from 'react'
import styles from './styles.module.css'
import SearchIcon from './searchIcon.svg'
import { useAppContext } from '../../contexts/app';

type Props = {
    onSearch: (searchValue: string) => void;
}

export const SearchInput = ({ onSearch }: Props) => {
    const [focused, setFocused] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    const {tenent} = useAppContext();

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {

        if (event.key === 'Enter') {
            onSearch(searchValue)
        }
    }

    return (
        <div
            className={styles.container}
            style={{ borderColor: focused ? tenent?.mainColor : '#ffffff' }}
        >
            <div
                className={styles.button}
                onClick={() => onSearch(searchValue)}
            >
                <SearchIcon color={tenent?.mainColor}/>
            </div>
            <input
                type='text'
                className={styles.input}
                placeholder='Digite o nome do produto'
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyUp={handleKeyUp}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
        </div>
    )
}