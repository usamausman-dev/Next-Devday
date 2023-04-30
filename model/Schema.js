import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    organization: String,
    email: String,
    password: String
})

const Users = models.user || model('user', userSchema);
export default Users

const projectSchema = new Schema({
    projectAdmin: String,
    projectName: String
})

export const Project = models.project || model('project', projectSchema)