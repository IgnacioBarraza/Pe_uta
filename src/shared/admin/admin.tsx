import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Admin() {
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    subject: "",
    team: "",
  });
  const [editProject, setEditProject] = useState({
    id: "",
    name: "",
    description: "",
    subject: "",
    team: "",
  });
  const [projects, setProjects] = useState([
    { id: 1, name: "Project A", description: "Description for Project A" },
    { id: 2, name: "Project B", description: "Description for Project B" },
    { id: 3, name: "Project C", description: "Description for Project C" },
  ]);
  const [selectedProject, setSelectedProject] = useState(null);
  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  const [newSubject, setNewSubject] = useState("");
  const handleNewProjectChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };
  const handleEditProjectChange = (e) => {
    setEditProject({ ...editProject, [e.target.name]: e.target.value });
  };
  const handleNewSubjectChange = (e) => {
    setNewSubject(e.target.value);
  };
  const handleNewProjectSubmit = (e) => {
    e.preventDefault();
    console.log("New project:", newProject);
  };
  const handleEditProjectSubmit = (e) => {
    e.preventDefault();
    console.log("Edited project:", editProject);
  };
  const handleNewSubjectSubmit = (e) => {
    e.preventDefault();
    console.log("New subject:", newSubject);
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Administrar proyectos
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Gestiona los proyectos y asignaturas desde aca.
              </p>
            </div>
            <div className="grid gap-4">
              <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                  <CardTitle>Add New Project</CardTitle>
                  <CardDescription>
                    Fill out the form below to create a new project for the
                    expo.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="grid gap-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Project Name</Label>
                        <Input id="name" placeholder="Enter project name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe the project"
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
                        <Select key="subject">
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="engineering">
                              Engineering
                            </SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="members">Project Members</Label>
                      <Textarea
                        id="members"
                        placeholder="Enter project member names separated by commas"
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="submit">Save Project</Button>
                </CardFooter>
              </Card>
              <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                  <CardTitle>Edit Project</CardTitle>
                  <CardDescription>
                    Select a project to edit or create a new one.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="project">Select Project</Label>
                      <Select
                        key="project"
                        value={selectedProject?.id}
                        onValueChange={handleProjectSelect}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                        <SelectContent>
                          {projects.map((project) => (
                            <SelectItem
                              key={project.id}
                              value={`${project.id}`}
                            >
                              {project.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {selectedProject && (
                      <form className="grid gap-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name">Project Name</Label>
                            <Input
                              id="name"
                              defaultValue={selectedProject.name}
                              placeholder="Enter project name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              defaultValue={selectedProject.description}
                              placeholder="Describe the project"
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
                            <Select key="subject">
                              <SelectTrigger>
                                <SelectValue placeholder="Select subject" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="marketing">
                                  Marketing
                                </SelectItem>
                                <SelectItem value="engineering">
                                  Engineering
                                </SelectItem>
                                <SelectItem value="design">Design</SelectItem>
                                <SelectItem value="finance">Finance</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="members">Project Members</Label>
                          <Textarea
                            id="members"
                            placeholder="Enter project member names separated by commas"
                          />
                        </div>
                      </form>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="submit">Save Project</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Add New Subject</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleNewSubjectSubmit}>
                    <div className="grid gap-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={newSubject}
                        onChange={handleNewSubjectChange}
                        placeholder="Enter new subject"
                      />
                    </div>
                    <Button type="submit" className="mt-4">
                      Save Subject
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <img src="/placeholder.jpg" />
          </div>
        </div>
      </div>
    </section>
  );
}
