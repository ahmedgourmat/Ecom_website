import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Colors } from '../../Constant/Colors';

interface Product {
    _id: string;
    nameP: string;
    desc: string;
    quantity: number;
    price: number;
    img: string;
    categorie?: string;
    sizes: string[];
    colors: string[];
    promo: boolean;
    promoPrice?: number;
    reviews?: number;
    createdAt?: string;
    updatedAt?: string;
}

export const ProductsDiagramme: React.FC<{ products: Product[] }> = ({ products }) => {

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
          <Bar dataKey="quantity" fill={Colors.secondary2} />
        </BarChart>
      </ResponsiveContainer>
    );
};
