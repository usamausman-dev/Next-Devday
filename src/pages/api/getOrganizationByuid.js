import connectMongo from "../../../database/conn";
import { Organization } from "../../../model/Schema";

export default async function handler(req, res) {
    connectMongo().catch(error => res.json({ error: "Connection failed" }))

    if (req.method === 'GET') {
        const { createdBy } = req.query;

        if (!createdBy) {
            res.status(422).json({ message: "createdBy missing" })
        }

        const org = await Organization.find({ createdBy });
        if (org) {
            res.status(201).json({ status: true, organizations: org })
        }
        else {
            res.status(201).json({ status: true, organizations: [] })
        }
    }

    else {
        res.status(500).json({ message: "HTTP Method not valid only GET Accepted" })
    }
}