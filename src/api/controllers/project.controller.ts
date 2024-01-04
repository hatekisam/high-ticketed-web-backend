import { projectService } from "../services";
import { NextFunction, Request, Response } from "express";
import status from "http-status";
import APIError from "../helpers/APIError";

const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const savedproject = await projectService.createProject(body);
    res.status(status.CREATED).json(savedproject);
  } catch (err) {
    next(err);
  }
};

const getProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    if (!project) throw new APIError(status.NOT_FOUND, "Project not found");
    res.json(project);
  } catch (err) {
    next(err);
  }
};

const getAllProjects = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projects = await projectService.getAllProjects();
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const { body } = req;
    const updatedProject = await projectService.updateProject(id, body);
    if (!updatedProject)
      throw new APIError(status.NOT_FOUND, "Project does not exist");
    res.status(status.OK).json(updatedProject);
  } catch (err) {
    next(err);
  }
};

const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await projectService.deleteProject(req.params.id);
    res.status(status.NO_CONTENT).end();
  } catch (err) {
    next(err);
  }
};

export default {
  createProject,
  getProject,
  getAllProjects,
  deleteProject,
  updateProject,
};
