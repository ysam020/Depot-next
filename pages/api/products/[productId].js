import { products } from "@/assets/data/productData";

export default function handle(req, res) {
  const { productId } = req.query;
  const product = products.filter((item) => item.id === +productId);
  res.status(200).json(product);
}
