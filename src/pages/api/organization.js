import connectMongo from "../../../database/conn";
import { Organization } from "../../../model/Schema";

export default async function handler(req, res) {
    // Connect to the database
    await connectMongo().catch(error =>
        res.status(500).json({ error: "Database connection failed!" })
    );

    switch (req.method) {
        case "GET":
            return getOrganizations(req, res);

        case "POST":
            return createOrganization(req, res);

        default:
            return res.status(405).json({ message: "Method not allowed" });
    }
}

// Handler to get all organizations
async function getOrganizations(req, res) {
    try {
        const organizations = await Organization.find().populate("projects"); // Populates projects if referenced
        return res.status(200).json({ success: true, data: organizations });
    } catch (error) {
        return res.status(500).json({ error: "Error retrieving organizations" });
    }
}

// Handler to create a new organization
async function createOrganization(req, res) {
    try {
        const { createdBy, organizationName, projects } = req.body;

        if (!createdBy || !organizationName) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const existingOrganization = await Organization.findOne({ organizationName });
        if (existingOrganization) {
            return res.status(422).json({ message: "Organization already exists" });
        }

        const organization = await Organization.create({
            createdBy,
            organizationName,
            projects,
        });

        return res.status(201).json({ success: true, data: organization });
    } catch (error) {
        return res.status(500).json({ message: "Error creating organization" , error });
    }
}
