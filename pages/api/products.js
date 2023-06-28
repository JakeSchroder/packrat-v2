import clientPromise from "../../lib/mongodb";

const typeFilter = ['Shop_All', 'T-Shirts', 'Tops', 
                    'Layers', 'Pullovers', 'Shorts', 
                    'Pants', 'Dresses_&_Skirts', 
                    'Shoes', 'Jewelry', 'Accessories', 
                    'Wildcard_Clothing', 'Goods'];

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("packrat");

        const products = await db
            .collection("products")
            .find({})
            .limit(10)
            .toArray();

        res.json(products);
    } catch (e) {
        console.error(e);
    }
}