import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Project, ProjectProps } from "@/utils/utils";
import { useBackend } from "@/hooks/useBackend";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const DeleteProject = ({projects}: ProjectProps) => {
  const { deleteProject } = useBackend()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const { toast } = useToast()

  const handleProjectSelect = (projectId) => {
    const selected = projects.find((project) => project.id === projectId);
    setSelectedProject(selected || null);
  }

  const onSubmit = async () => {
    try {
      const response = await deleteProject(selectedProject.id)
      const { status } = response
      if (status === 200) {
        toast({
          title: 'Proyecto borrado con exito'
        })
        setSelectedProject(null)
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "Hubo un problema al borrar el proyecto",
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Eliminar proyecto</CardTitle>
        <CardDescription>Selecciona el proyecto a eliminar</CardDescription>
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
                    {project.project_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <CardFooter className="flex justify-end">
            <Button onClick={onSubmit}>Borrar proyecto</Button>
          </CardFooter>
        </div>
      </CardContent>
    </Card>
  )
}
