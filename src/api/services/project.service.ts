import { Project } from "../models";

const createProject = async (body: {
  firstName: string;
  lastName: string;
  occupation: string;
  content: string;
}) => {
  const project = new Project(body);
  return await project.save();
};

const getProjectById = async (id: string) => {
  return Project.findById(id).exec();
};

const getAllProjects = async () => {
  return Project.find({}).exec();
};

const updateProject = (
  id: string,
  body: Partial<{
    firstName: string;
    lastName: string;
    occupation: string;
    content: string;
  }>
) => {
  return Project.findByIdAndUpdate(id, { ...body }, { new: true });
};

const deleteProject = async (id: string) => {
  await Project.findByIdAndDelete(id);
};

export default {
  getProjectById,
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
};
