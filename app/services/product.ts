export interface Product {
    find: any;
    Id: string;
    name: string;
    specifications: Specification[];
    price: number;
    quantity: number;
    imageSet: string[];
    brandname: string;
    categoryname: string;
}

export interface Specification {
    option: string;
    value: string;
  }