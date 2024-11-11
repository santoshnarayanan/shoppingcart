import { createContext, ReactElement, useEffect, useState } from "react"

// define the type of the product
export type Productype = { 
    sku: string,
    name: string,
    price: number,
}

const initState : Productype[] = []

// setting intial state for the products
// const initState : Productype[] = [
//     {
//         "sku": "item0001",
//         "name": "Widget",
//         "price": 9.99
//     },
//     {
//         "sku": "item0002",
//         "name": "Premium Widget",
//         "price": 19.99
//     },
//     {
//         "sku": "item0003",
//         "name": "Deluxe Widget",
//         "price": 29.99
//     }
// ]

//Represent the context type of type Productype
export type UseProductsContextType = {products: Productype[]}   

//define context state
const initContextState: UseProductsContextType = {products: initState}

//creating context
const ProductsContext = createContext<UseProductsContextType>(initContextState)

type ChildrenType = {children: ReactElement | ReactElement[]}

//creating provider
export const ProductsProvider = ({children}: ChildrenType): ReactElement => {
    const [products, setProducts] = useState<Productype[]>(initState);

    useEffect(() => { 
        const fetchProducts = async (): Promise<Productype[]> => {
            const data = await fetch('https://localhost:5000/products')
            .then(res =>{ return res.json()})
            .catch((err) => {
                if (err instanceof Error) 
                    console.error(err.message);
            })
            return data
        }
        fetchProducts().then((products) => setProducts(products))
    }, []);

    return (
        <ProductsContext.Provider value={{products}}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContext;