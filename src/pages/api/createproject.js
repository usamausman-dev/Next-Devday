import connectMongo from "../../../database/conn";
import { Project } from "../../../model/Schema";
import { Organization } from "../../../model/Schema";  // Import the Organization model

export default async function handler(req, res) {
    await connectMongo().catch(error => res.json({ error: "Connection failed" }));

    if (req.method === 'POST') {
        if (!req.body) return res.status(404).json({ error: 'No form data provided' });

        const { projectAdmin, projectName, members, organizationId } = req.body;

        // Check if a project with the same name already exists
        const checkExisting = await Project.findOne({ projectName });
        if (checkExisting) return res.status(422).json({ message: 'Project Already Exists, Try a different Name' });

        try {
            // Create the new project
            const newProject = await Project.create({ projectAdmin, projectName, members, organizationId });

            // Find the organization by ID and add the new project's ID to the 'projects' array
            const updatedOrganization = await Organization.findByIdAndUpdate(
                organizationId, 
                { $push: { projects: newProject._id } }, // Use $push to add the new project ID
                { new: true } // Return the updated organization document
            );

            if (!updatedOrganization) {
                return res.status(404).json({ error: "Organization not found" });
            }

            // Return success response with the new project and updated organization
            res.status(201).json({ status: true, project: newProject, organization: updatedOrganization });

        } catch (err) {
            res.status(500).json({ error: err.message || 'Internal Server Error' });
        }

    } else {
        res.status(500).json({ message: "HTTP Method not valid, only POST accepted" });
    }
}
