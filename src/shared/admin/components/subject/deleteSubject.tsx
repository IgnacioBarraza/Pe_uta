import { useBackend } from "@/hooks/useBackend";
import {
  Subject,
  SubjectProps,
} from "@/utils/interface";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export const DeleteSubject = ({ subjects }: SubjectProps) => {
  const { deleteSubject } = useBackend();
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const { toast } = useToast();

  const onSubmit = async () => {
    try {
      const response = await deleteSubject(selectedSubject.id);
      const { status } = response
      if (status === 200) {
        toast({
          title: 'Asignatura borrada con exito',
          variant: 'default'
        })
        setSelectedSubject(null);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Hubo un problema al borrar la asignatura",
        variant: "destructive",
      });
    }
  };

  const handleSubjectSelect = (subjectId) => {
    const selected = subjects.find((subject) => subject.id === subjectId);
    setSelectedSubject(selected || null);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Eliminar asignatura</CardTitle>
        <CardDescription>Selecciona la asignatura a eliminar</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="space-y-2">
            <Label htmlFor="subject">Seleccionar una asignatura</Label>
            <Select
              key="subject"
              value={selectedSubject?.id}
              onValueChange={handleSubjectSelect}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar asignatura" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject.id} value={`${subject.id}`}>
                    {subject.subject_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <CardFooter className="flex justify-end">
            <Button onClick={onSubmit}>Borrar asignatura</Button>
          </CardFooter>
        </div>
      </CardContent>
    </Card>
  );
};
