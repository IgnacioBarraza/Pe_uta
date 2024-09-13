import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faChevronDown, faTrash, faUsers } from "@fortawesome/free-solid-svg-icons";

export default function Admin() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    subject: "all",
    minRating: 1,
    maxRating: 5,
  });
  const [newProject, setNewProject] = useState({
    name: "",
    image: "",
    description: "",
    members: [],
    subject: "Science",
  });

  useEffect(() => {
    setTimeout(() => {
      setProjects([
        {
          id: "p1",
          name: "Project A",
          description: "This is a description of Project A.",
          image: "/placeholder.svg",
          members: ["John Doe", "Jane Smith"],
          subject: "Science",
          evaluations: [
            {
              id: "e1",
              q1: 4,
              q2: 3,
              q3: 5,
              q4: 4,
              q5: 4,
              comment: "Great project overall, with some room for improvement.",
            },
            {
              id: "e2",
              q1: 5,
              q2: 5,
              q3: 4,
              q4: 5,
              q5: 5,
              comment: "Excellent project, well-executed and informative.",
            },
          ],
        },
        {
          id: "p2",
          name: "Project B",
          description: "This is a description of Project B.",
          image: "/placeholder.svg",
          members: ["Alice Johnson", "Bob Williams"],
          subject: "Technology",
          evaluations: [
            {
              id: "e3",
              q1: 3,
              q2: 4,
              q3: 3,
              q4: 3,
              q5: 4,
              comment:
                "The project could use some refinement, but overall it's good.",
            },
            {
              id: "e4",
              q1: 4,
              q2: 4,
              q3: 4,
              q4: 4,
              q5: 4,
              comment: "A solid project with a lot of potential.",
            },
          ],
        },
        {
          id: "p3",
          name: "Project C",
          description: "This is a description of Project C.",
          image: "/placeholder.svg",
          members: ["Charlie Davis", "David Lee"],
          subject: "Engineering",
          evaluations: [
            {
              id: "e5",
              q1: 5,
              q2: 5,
              q3: 5,
              q4: 5,
              q5: 5,
              comment:
                "Exceptional project, well-executed and highly informative.",
            },
            {
              id: "e6",
              q1: 4,
              q2: 4,
              q3: 4,
              q4: 4,
              q5: 4,
              comment: "A great project, with a lot of attention to detail.",
            },
          ],
        },
      ]);
      setSubjects(["Science", "Technology", "Engineering"]);
      setLoading(false);
    }, 2000);
  }, []);

  const handleAddProject = () => {
    setProjects([...projects, newProject]);
    setNewProject({
      name: "",
      image: "",
      description: "",
      members: [],
      subject: "Science",
    });
  };

  const handleEditProject = (projectId, updatedProject) => {
    setProjects(
      projects.map((p) =>
        p.id === projectId ? { ...p, ...updatedProject } : p
      )
    );
  };

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter((p) => p.id !== projectId));
  };

  const handleAddSubject = (subject) => {
    setSubjects([...subjects, subject]);
  };

  const handleEditSubject = (index, updatedSubject) => {
    setSubjects(subjects.map((s, i) => (i === index ? updatedSubject : s)));
  };

  const handleDeleteSubject = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const filteredProjects = projects.filter((project) => {
    if (
      filterOptions.subject !== "all" &&
      project.subject !== filterOptions.subject
    ) {
      return false;
    }
    if (
      project.evaluations.some(
        (evaluation) =>
          evaluation.q1 < filterOptions.minRating ||
          evaluation.q1 > filterOptions.maxRating ||
          evaluation.q2 < filterOptions.minRating ||
          evaluation.q2 > filterOptions.maxRating ||
          evaluation.q3 < filterOptions.minRating ||
          evaluation.q3 > filterOptions.maxRating ||
          evaluation.q4 < filterOptions.minRating ||
          evaluation.q4 > filterOptions.maxRating ||
          evaluation.q5 < filterOptions.minRating ||
          evaluation.q5 > filterOptions.maxRating
      )
    ) {
      return false;
    }
    return project.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const calculateAverageRating = (evaluations) => {
    const totalRating =
      evaluations.reduce((sum, evaluation) => {
        return (
          sum +
          evaluation.q1 +
          evaluation.q2 +
          evaluation.q3 +
          evaluation.q4 +
          evaluation.q5
        );
      }, 0) /
      (evaluations.length * 5);
    return totalRating.toFixed(2);
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            {loading ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-8 w-[60%]" />
                  <Skeleton className="h-6 w-[80%]" />
                </div>
                <div className="grid gap-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Admin Panel
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Manage projects, subjects, and evaluations.
                  </p>
                </div>
                <div className="grid gap-4">
                  <div className="flex items-center gap-4">
                    <Input
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          Filter <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                          value={filterOptions.subject}
                          onValueChange={(value) =>
                            setFilterOptions({
                              ...filterOptions,
                              subject: value,
                            })
                          }
                        >
                          <DropdownMenuRadioItem value="all">
                            All Subjects
                          </DropdownMenuRadioItem>
                          {subjects.map((subject, index) => (
                            <DropdownMenuRadioItem key={index} value={subject}>
                              {subject}
                            </DropdownMenuRadioItem>
                          ))}
                        </DropdownMenuRadioGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Rating Range</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className="grid gap-2">
                          <div className="flex items-center gap-2">
                            <Label htmlFor="min-rating">Min Rating:</Label>
                            <Select
                              key="min-rating"
                              value={`${filterOptions.minRating}`}
                              onValueChange={(value) =>
                                setFilterOptions({
                                  ...filterOptions,
                                  minRating: parseInt(value),
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <SelectItem key={rating} value={`${rating}`}>
                                    {rating}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center gap-2">
                            <Label htmlFor="max-rating">Max Rating:</Label>
                            <Select
                              key="max-rating"
                              value={`${filterOptions.maxRating}`}
                              onValueChange={(value) =>
                                setFilterOptions({
                                  ...filterOptions,
                                  maxRating: parseInt(value),
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <SelectItem key={rating} value={`${rating}`}>
                                    {rating}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button onClick={handleAddProject}>Add Project</Button>
                  </div>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="subject">Manage Subjects</Label>
                      <div className="flex items-center gap-2">
                        <Input id="subject" placeholder="Add new subject" />
                        <Button
                          onClick={() =>
                            handleAddSubject(
                              document.getElementById("subject")
                            )
                          }
                        >
                          Add
                        </Button>
                      </div>
                      <div className="grid gap-2">
                        {subjects.map((subject, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <Input
                              defaultValue={subject}
                              onBlur={(e) =>
                                handleEditSubject(index, e.target.value)
                              }
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteSubject(index)}
                            >
                              <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-4">
                      <Label htmlFor="projects">Manage Projects</Label>
                      <div className="grid gap-4">
                        {filteredProjects.map((project) => (
                          <Card key={project.id}>
                            <CardHeader>
                              <div className="flex items-center gap-4">
                                <img
                                  src="/placeholder.svg"
                                  alt={project.name}
                                  width={80}
                                  height={80}
                                  className="rounded-md"
                                  style={{
                                    aspectRatio: "80/80",
                                    objectFit: "cover",
                                  }}
                                />
                                <div className="grid gap-1">
                                  <h3 className="font-semibold">
                                    {project.name}
                                  </h3>
                                  <p className="text-muted-foreground">
                                    {project.subject}
                                  </p>
                                </div>
                                <div className="ml-auto flex gap-2">
                                  <Button
                                    variant="outline"
                                    onClick={() =>
                                      handleEditProject(project.id, {
                                        name: "Updated Project",
                                        description:
                                          "This is an updated project.",
                                      })
                                    }
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    onClick={() =>
                                      handleDeleteProject(project.id)
                                    }
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p>{project.description}</p>
                              <div className="flex items-center gap-2 mt-4">
                                <FontAwesomeIcon icon={faUsers} className="h-5 w-5 text-muted-foreground" />
                                <p className="text-muted-foreground">
                                  {project.members.join(", ")}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <FontAwesomeIcon icon={faBookOpen} className="h-5 w-5 text-muted-foreground" />
                                <p className="text-muted-foreground">
                                  Subject: {project.subject}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
