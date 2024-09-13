import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormProps } from "@/utils/utils";

export const Form = ({ questions }: FormProps) => {
  return (
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
  );
};
