import connectMongo from "../../../database/conn";
import { Project } from "../../../model/Schema";

export default async function handler(req, res) {
    await connectMongo().catch(error => res.status(500).json({ error: "Connection failed" }));

    if (req.method === 'GET') {
        const { projectId } = req.query; // Extract projectId from query parameters

        if (!projectId) {
            return res.status(400).json({ error: "Project ID is required" });
        }

        try {
            const checkExisting = await Project.findById(projectId);

            if (checkExisting) {
                return res.status(200).json({ status: true, data: checkExisting });
            } else {
                return res.status(404).json({ status: false, data: null, message: "Project not found" });
            }
        } catch (error) {
            return res.status(500).json({ status: false, error: "Internal Server Error", details: error.message });
        }
    } else {
        return res.status(405).json({ message: "HTTP Method not valid. Only GET is accepted." });
    }
}
