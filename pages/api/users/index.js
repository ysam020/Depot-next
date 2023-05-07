import { users } from "@/assets/data/users";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(users);
  } else if (req.method == "POST") {
    const user = req.body.values;
    users.push(user);
    res.status(201).json(users);
  } else {
    res.status(404).json({ message: "API route not found" });
  }
}
