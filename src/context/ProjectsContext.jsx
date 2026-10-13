import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { initialProjects } from "../data/projects";
import { readStorage, writeStorage } from "../utils/storage";

const ProjectsContext = createContext(null);
const STORAGE_KEY = "pd.projects";

function loadProjects() {
  const stored = readStorage(STORAGE_KEY, null);
  return Array.isArray(stored) ? stored : initialProjects;
}

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState(loadProjects);

  const commit = useCallback((updater) => {
    setProjects((current) => {
      const next = updater(current);
      writeStorage(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const addProject = useCallback(
    (data) => {
      const project = { ...data, id: `p-${Date.now()}` };
      commit((current) => [project, ...current]);
      return project;
    },
    [commit]
  );

  const updateProject = useCallback(
    (id, changes) => {
      commit((current) =>
        current.map((project) => (project.id === id ? { ...project, ...changes } : project))
      );
    },
    [commit]
  );

  const deleteProject = useCallback(
    (id) => {
      commit((current) => current.filter((project) => project.id !== id));
    },
    [commit]
  );

  const resetProjects = useCallback(() => commit(() => initialProjects), [commit]);

  const value = useMemo(
    () => ({ projects, addProject, updateProject, deleteProject, resetProjects }),
    [projects, addProject, updateProject, deleteProject, resetProjects]
  );

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (!context) throw new Error("useProjects must be used inside ProjectsProvider");
  return context;
}
