import connectMongo from "../../../database/conn";
import { Organization } from "../../../model/Schema";

export default async function handler(req, res) {
    await connectMongo().catch(error =>
        res.status(500).json({ error: "Database connection failed!" })
    );

    const { id } = req.query;

    if (req.method === "GET") {

        if (!id) {
            return res.status(400).json({ error: "ID is required" });
        }


        try {
            const organization = await Organization.findById(id).populate("projects");
            if (!organization) {
                return res.status(404).json({ message: "Organization not found" });
            }
            return res.status(200).json({ success: true, data: organization });
        } catch (error) {
            return res.status(500).json({ error: "Error retrieving organization" });
        }
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}
