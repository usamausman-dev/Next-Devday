import { hash } from "bcryptjs";
import connectMongo from "../../../../database/conn";
import Users from "../../../../model/Schema";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "HTTP Method not valid, only POST Accepted" });
    }

    await connectMongo().catch(error => {
        return res.status(500).json({ error: "Database connection failed" });
    });

    const { firstname, lastname, organization, email, password } = req.body;

    if (!firstname || !lastname || !organization || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const checkExisting = await Users.findOne({ email });
        if (checkExisting) {
            return res.status(422).json({ message: 'User Already Exists' });
        }

        const hashedPassword = await hash(password, 12);
        const user = await Users.create({ firstname, lastname, organization, email, password: hashedPassword });
        return res.status(201).json({ status: true, user });
    } 
    
    catch (err) {
        return res.status(500).json({ error: "Failed to create user", details: err });
    }
}
