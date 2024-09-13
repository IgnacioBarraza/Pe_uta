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

export const NewProjectForm = () => {
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    subject: "",
    members: "",
  });

  const handleNewProjectChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleSubjectChange = (value) => {
    setNewProject({ ...newProject, subject: value });
  };

  const handleNewProjectSubmit = (e) => {
    e.preventDefault();
    console.log("New project:", newProject);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Agregar Nuevo Proyecto</CardTitle>
        <CardDescription>
          Rellene el siguiente formulario para crear un nuevo proyecto para la
          exposición.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-6" onSubmit={handleNewProjectSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Proyecto</Label>
              <Input
                id="name"
                name="name"
                placeholder="Ingresa el nombre del proyecto"
                value={newProject.name}
                onChange={handleNewProjectChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe el proyecto"
                value={newProject.description}
                onChange={handleNewProjectChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="image">Imagen del Proyecto</Label>
              <Input id="image" type="file" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Asignatura del proyecto</Label>
              <Select
                key="subject"
                value={newProject.subject}
                onValueChange={handleSubjectChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una asignatura" />
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
            <Label htmlFor="members">Miembros del Proyecto</Label>
            <Textarea
              id="members"
              name="members"
              placeholder="Ingresa los nombres de los miembros del proyecto separados por comas"
              value={newProject.members}
              onChange={handleNewProjectChange}
            />
          </div>
          <CardFooter className="flex justify-end">
            <Button type="submit">Guardar proyecto</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};
