import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { LoginUserDto } from "@/utils/utils";
import { useAuth } from "@/hooks/useAuth";

export const LogIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginUserDto>()
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation();

  // Get the previous page or default to home (if not coming from another page)
  const from = location.state?.from?.pathname || '/inicio';
  console.log(from)
  const onSubmit = async (loginUserData) => {
    try {
      const response = await login(loginUserData)
      console.log(response)
      const { data, status } = response
      if (status === 201) {
        navigate(from)
      }
    } catch (error) {
      console.error(error)
    }
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
                Ingresa tu rut y contraseña para ingresar.
              </p>
            </div>
            <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <Label htmlFor="rut">Rut</Label>
                <Input
                  id="rut"
                  type="text"
                  placeholder="Ingresa tu rut en formato 11.111.111-1"
                  {...register('rut', { 
                    required: 'Ingrese el rut', 
                    pattern: {
                    value: /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/,
                    message: "Formato de RUT no válido"
                  }})}
                />
                { errors.rut && (<span className="text-red-600 font-roboto">{errors.rut.message}</span>)}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  {...register('password', { required: 'Debe ingresar una contraseña', minLength: 8 })}
                />
                { errors.password && (<span className="text-red-600 font-roboto">{errors.password.message}</span>)}
              </div>
              <Button type="submit" className="mt-4">
                Ingresar
              </Button>
              <div className="text-center">
                <Link
                  to="/register"
                  className="text-sm font-medium hover:underline underline-offset-4"
                >
                  Registrarse
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
                  29 Noviembre, 2024
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
                <Calendar selected={new Date('2024-10-26')}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
