import connectMongo from "../../../database/conn";
import { Project } from "../../../model/Schema";

export default async function handler(req, res) {
    connectMongo().catch(error => res.json({ error: "Connection failed" }))
    if (req.method === 'POST') {
        if (!req.body) return res.status(404).json({ error: 'Dont Have form Data' })
        const { projectAdmin, projectName } = req.body;

        const checkExisting = await Project.findOne({ projectName })
        if (checkExisting) return res.status(422).json({ message: 'Project Already Exists, Try different Name' })


        Project.create({ projectAdmin, projectName })
            .then((data) => {
                res.status(201).json({ status: true, project: data })
            })
            .catch((err) => {
                res.status(404).json({ err })
            })

    }

    else {
        res.status(500).json({ message: "HTTP Method not valid only POST Accepted" })
    }

}