import connectMongo from "../../../database/conn";
import { WorkItem } from "../../../model/Schema";

export default async function handler(req, res) {
    connectMongo().catch(error => res.json({ error: "Connection failed" }))

    if (req.method === 'GET') {
        const { projectID } = req.query;

        if(!projectID){
            res.status(422).json({message : "Project ID missing"})
        }

        const workItems = await WorkItem.find({ projectID });
        if (workItems) {
            res.status(201).json({ status: true, workItems })
        }
        else {
            res.status(201).json({ status: true, workItems: [] })
        }
    }

    else {
        res.status(500).json({ message: "HTTP Method not valid only GET Accepted" })
    }
}