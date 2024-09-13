import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export const EditProjectForm = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: "Project A", description: "Description for Project A" },
    { id: 2, name: "Project B", description: "Description for Project B" },
    { id: 3, name: "Project C", description: "Description for Project C" },
  ]);
  const [editProject, setEditProject] = useState({
    id: "",
    name: "",
    description: "",
    subject: "",
    members: "",
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  const handleSubjectChange = (value) => {
    setEditProject({ ...editProject, subject: value });
  };

  const handleEditProjectSubmit = (e) => {
    e.preventDefault();
    console.log("Edited project:", editProject);
  };

  const handleEditProjectChange = (e) => {
    setEditProject({ ...editProject, [e.target.name]: e.target.value });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Editar proyecto</CardTitle>
        <CardDescription>Selecciona el proyecto a editar.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="space-y-2">
            <Label htmlFor="project">Seleccionar un proyecto</Label>
            <Select
              key="project"
              value={selectedProject?.id}
              onValueChange={handleProjectSelect}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar proyecto" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={`${project.id}`}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedProject && (
            <form className="grid gap-6" onSubmit={handleEditProjectSubmit}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre del Proyecto</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={selectedProject.name}
                    onChange={handleEditProjectChange}
                    placeholder="Ingresa el nombre del proyecto"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={selectedProject.description}
                    onChange={handleEditProjectChange}
                    placeholder="Describe el proyecto"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="image">Project Image</Label>
                  <Input id="image" type="file" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Project Subject</Label>
                  <Select key="subject" value={editProject.subject} onValueChange={handleSubjectChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="members">Miembros del proyecto</Label>
                <Textarea
                  id="members"
                  name="members"
                  value={editProject.members}
                  onChange={handleEditProjectChange}
                  placeholder="Ingresa los nombres de los miembros del proyecto separados por comas."
                />
              </div>
              <CardFooter className="flex justify-end">
                <Button type="submit">Actualizar proyecto</Button>
              </CardFooter>
            </form>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
