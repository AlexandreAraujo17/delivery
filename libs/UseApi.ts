import { Tenent } from "../types/Tenent"

export const useApi = () => ({

    getTenent: (tenentSlug: string ): boolean | Tenent => {
        switch(tenentSlug){
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

    }

})