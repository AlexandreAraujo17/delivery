export const useFormatter = () =>({
    formatPrice: (price: number) => {
        return price.toLocaleString('pt-br', {
            minimumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
        })
    },

    formatQuantity: (qt: number, digits: number) => {
        return qt.toString().length < digits ?  `${'0'.repeat(digits - qt.toString().length)}${qt}` : `${qt}`
    }
})