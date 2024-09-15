import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export const NewSubjectForm = () => {

  const [newSubject, setNewSubject] = useState("");
  const handleNewSubjectChange = (e) => {
    setNewSubject(e.target.value);
  };
  const handleNewSubjectSubmit = (e) => {
    e.preventDefault();
    console.log("New subject:", newSubject);
  };
  
  return (
    <Card>
            <CardHeader>
              <CardTitle>Agregar Nueva Asignatura</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNewSubjectSubmit}>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Asignatura</Label>
                  <Input
                    id="subject"
                    value={newSubject}
                    onChange={handleNewSubjectChange}
                    placeholder="Ingrese nueva asignatura"
                  />
                </div>
                <Button type="submit" className="mt-4">
                  Guardar Asignatura
                </Button>
              </form>
            </CardContent>
          </Card>
  )
}
