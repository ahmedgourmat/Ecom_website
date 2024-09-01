import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Colors } from '../../Constant/Colors';

interface Product {
    _id: string; // _id is optional, as it may not exist before a product is saved
    nameP: string;
    desc: string;
    quantity: number;
    price: number;
    img: string; // Optional as per the schema
    categorie?: string; // Assuming categorie is the ObjectId's string representation
    sizes: string[];
    colors: string[];
    promo: boolean;
    promoPrice?: number;
    reviews?: number;
    createdAt?: string; // Assuming you might want to use timestamps
    updatedAt?: string; // Assuming you might want to use timestamps
}


export const ProductsDiagramme: React.FC<{ products: Product[] }> = ({ products }) => {

    console.log('here is the product from diagramme', products)

    const data = [
        {
            _id: "1",
            nameP: "Product 1",
            desc: "Description of product 1",
            quantity: 10,
            price: 100,
            img: "image1.jpg",
            sizes: ["S", "M", "L"],
            colors: ["red", "blue"],
            promo: true,
            promoPrice: 80,
            reviews: 5,
        },
        {
            _id: "2",
            nameP: "Product 2",
            desc: "Description of product 2",
            quantity: 20,
            price: 150,
            img: "image2.jpg",
            sizes: ["S", "M"],
            colors: ["green", "yellow"],
            promo: false,
            promoPrice: 0,
            reviews: 8,
        },
    ];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={products}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nameP" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantity" fill={Colors.secondary2}/>
            </BarChart>
        </ResponsiveContainer>
    )
}
