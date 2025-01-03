import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    organization: String,
    email: String,
    password: String
});

const Users = models.user || model('user', userSchema);
export default Users;


const organizationSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user', // References the Users model
        required: true
    },
    organizationName: {
        type: String,
        required: true,
        trim: true
    },
    projects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'project' // References the Project model
        }
    ]
}, {
    timestamps: true // Automatically add `createdAt` and `updatedAt` fields
});

export const Organization = models.organization || model('organization', organizationSchema);






const projectSchema = new Schema({
    projectAdmin: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    organizationId: {
        type: Schema.Types.ObjectId,
        ref: 'organization',
        required: true
    },
    projectName: String,
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
});

export const Project = models.project || model('project', projectSchema);

const TaskSchema = new Schema({
    projectID: {
        type: Schema.Types.ObjectId,
        ref: 'project', // This will reference the Project model
        required: true
    },
    name: String,
    nature: String,
    startdate: Date,
    enddate: Date,
    projectStatus: String,
    person: String
});

export const Task = models.task || model('task', TaskSchema);

const WorkItemSchema = new Schema({
    projectID: {
        type: Schema.Types.ObjectId,
        ref: 'project', // This will reference the Project model
        required: true
    },
    name: String,
    nature: String,
    startdate: Date,
    enddate: Date,
    projectStatus: String,
    person: String
});

export const WorkItem = models.workitem || model('workitem', WorkItemSchema);
