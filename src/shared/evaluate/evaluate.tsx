import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { faBookOpen, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProjectsInfo, Questions } from "@/utils/utils";

export const Evaluate = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  console.log("Project_ID:", id);

  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState([])
  

  useEffect(() => {
    setTimeout(() => {
      setQuestions(Questions)
      setLoading(false)
    }, 2000)
  }, [])
  
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
                    Evaluate Project
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Please provide your feedback on the project.
                  </p>
                </div>
                <form className="grid gap-4">
                  {questions.map((question) => (
                    <div key={question.id} className="grid gap-2">
                      <Label htmlFor={question.id}>{question.label}</Label>
                      <Select key={question.id}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a rating" />
                        </SelectTrigger>
                        <SelectContent>
                          {question.options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                  <div className="grid gap-2">
                    <Label htmlFor="comment">Additional Comments</Label>
                    <Textarea
                      id="comment"
                      rows={4}
                      placeholder="Enter your comments here..."
                    />
                  </div>
                  <Button type="submit" className="mt-4">
                    Submit Evaluation
                  </Button>
                </form>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <img
              src="/project-placeholder.jpg"
              width="550"
              height="550"
              alt="Project Image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            />
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Project Name</h2>
              <p className="text-muted-foreground">
                This is a description of the project. It should include details
                about the project, such as its purpose, goals, and the subject
                it covers.
              </p>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faUsers} className="h-5 w-5 text-muted-foreground" />
                <p className="text-muted-foreground">Project Team Members</p>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faBookOpen} className="h-5 w-5 text-muted-foreground" />
                <p className="text-muted-foreground">Subject: Science</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
