import connectMongo from "../../../database/conn";
import Users from "../../../model/Schema";

export default async function getAllUsers(req, res) {
    connectMongo().catch(error => res.json({ error: "Connection failed" }))

    if (req.method === 'GET') {

        const users = await Users.find();
        const emails = users.map(user => user.email);

        if (users) {
            res.status(201).json({ status: true, users: emails })
        }
        else {
            res.status(201).json({ status: true, users: [] })
        }
    }

    else {
        res.status(500).json({ message: "HTTP Method not valid only GET Accepted" })
    }
}