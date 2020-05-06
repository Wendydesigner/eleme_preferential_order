export interface Product {
    price: number,
    packageFee: number,
    num: number,
    [key:string]:string|number
}
export interface Products {
    name: string,
    price: number,
    packageFee: number,
    num: number,
    [key:string]:string|number
}

export interface endProducts {
    [key:string]:Product
}

export interface deliveryOrder {
    products: endProducts,
    discount: Array<number> | Array<Array<number>>,
    deliveryFee: number
}

export interface resultList {
    list: Array<Array<string>>,
    minprice: number
}

export interface cols {
    name: string,
    type: string,
    alias:string,
    [key:string]:string
}