import { Product } from "../types/Product"
import { Tenent } from "../types/Tenent"

const TEMPORARYonePRODUCT: Product = {
    id: 1,
    image: '/tmp/burger.png',
    categoryName: 'Smash',
    name: 'Smash Burger',
    price: 25.50,
    description: '2 Blends de carne de 150g, Queijo Cheddar, Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal'
}

export const useApi = (tenentSlug: string) => ({

    getTenent: () => {
        switch (tenentSlug) {
            case 'burguer':
                return {
                    slug: 'burguer',
                    name: 'Burguer',
                    mainColor: '#FF0000',
                    secondColor: '#00FF00'
                }
                break

            case 'pizza':
                return {
                    slug: 'pizza',
                    name: 'Pizza',
                    mainColor: '#0000FF',
                    secondColor: '#FF0000'
                }
                break

            default: return false
        }

    },

    getAllProducts: () => {
        let products = [];

        for(let i = 0; i < 10; i++){
            products.push(TEMPORARYonePRODUCT)
        }

        return products
    },

    getProduct: (id: string) => {
        return TEMPORARYonePRODUCT;
    }

})