import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { faCalendar, faClock, faMapLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Link } from "react-router-dom"

export const Register = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Logged')
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 my-auto h-full">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Feria de ciencias 
              </h1>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                "Amplia tus conocimientos"
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Ingresa tu nombre, rut y contraseña para registrarte.
              </p>
            </div>
            <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ingresa tu nombre"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rut">Rut</Label>
                <Input
                  id="rut"
                  type="text"
                  placeholder="Ingresa tu rut"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                />
              </div>
              <Button type="submit" className="mt-4">
                Registrarse
              </Button>
              <div className="text-center">
                <Link
                  to="/login"
                  className="text-sm font-medium hover:underline underline-offset-4"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
          <div className="flex flex-col justify-center items-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Calendario Feria de Ciencias</h2>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCalendar} className="h-5 w-5 text-muted-foreground" />
                <p className="text-muted-foreground">
                  October 1st - October 5th, 2024
                </p>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faMapLocationDot} className="h-5 w-5 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Universidad de Tarapacá, Iquique - Chile
                </p>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faClock} className="h-5 w-5 text-muted-foreground" />
                <p className="text-muted-foreground">9:00 AM - 3:00 PM</p>
              </div>
              <div className="flex flex-col items-center">
                <Calendar selected={date} onSelect={setDate}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
