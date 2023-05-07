import { products } from "@/assets/data/productData";

export default function handler(req, res) {
  res.status(200).json(products);
}
