import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { faBookOpen, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Evaluate = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Evaluate Project
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Please provide your feedback on the project.
              </p>
            </div>
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="q1">
                  How would you rate the project overall?
                </Label>
                <Select key={"q1"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Poor</SelectItem>
                    <SelectItem value="2">2 - Fair</SelectItem>
                    <SelectItem value="3">3 - Average</SelectItem>
                    <SelectItem value="4">4 - Good</SelectItem>
                    <SelectItem value="5">5 - Excellent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="q2">
                  How satisfied are you with the project's progress?
                </Label>
                <Select key={"q2"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Very Dissatisfied</SelectItem>
                    <SelectItem value="2">2 - Dissatisfied</SelectItem>
                    <SelectItem value="3">3 - Neutral</SelectItem>
                    <SelectItem value="4">4 - Satisfied</SelectItem>
                    <SelectItem value="5">5 - Very Satisfied</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="q3">
                  How likely are you to recommend this project to others?
                </Label>
                <Select key={"q3"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Not at all likely</SelectItem>
                    <SelectItem value="2">2 - Slightly likely</SelectItem>
                    <SelectItem value="3">3 - Moderately likely</SelectItem>
                    <SelectItem value="4">4 - Very likely</SelectItem>
                    <SelectItem value="5">5 - Extremely likely</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="q4">
                  How would you rate the quality of the project's deliverables?
                </Label>
                <Select key={"q4"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Poor</SelectItem>
                    <SelectItem value="2">2 - Fair</SelectItem>
                    <SelectItem value="3">3 - Average</SelectItem>
                    <SelectItem value="4">4 - Good</SelectItem>
                    <SelectItem value="5">5 - Excellent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="q5">
                  How well did the project team communicate and collaborate?
                </Label>
                <Select key={"q5"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Very Poor</SelectItem>
                    <SelectItem value="2">2 - Poor</SelectItem>
                    <SelectItem value="3">3 - Average</SelectItem>
                    <SelectItem value="4">4 - Good</SelectItem>
                    <SelectItem value="5">5 - Excellent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                <FontAwesomeIcon icon={faUser} className="h-5 w-5 text-muted-foreground" />
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
