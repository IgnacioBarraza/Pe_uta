import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { RegisterUserDto } from "@/utils/utils";
import { useAuth } from "@/hooks/useAuth";
import { useProps } from "@/hooks/useProps";
import { decodeToken, formatRut, saveUserData } from "@/utils/authHelpers";
import { useToast } from "@/hooks/use-toast";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterUserDto>();

  const { registerUser } = useAuth();
  const { setUserName, setUserId, setTokenData, setUserType } = useProps()
  const { toast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || "/inicio"

  const onSubmit = async (registerUserData) => {
    try {
      console.log("Logged");
      const response = await registerUser(registerUserData)
      const { data, status } = response;
      if (status === 201) {
        const token = data.accessToken;
        const decodedToken = decodeToken(token);
        if (decodeToken) {
          const savedData = saveUserData(decodedToken, token);
          setUserName(savedData.name)
          setUserId(savedData.id)
          setUserType(savedData.user_type)
          setTokenData(token)
          toast({
            title: 'Registro de sesión correcto',
            description: 'Disfruta de la feria de ciencias!!!',
            variant: 'default'
          })
          navigate(from);
        }
      }
    } catch (error) {
      console.error(error)
      toast({
        title: 'Hubo un error al registrar la sesión',
        variant: 'destructive'
      })
    }
  };
  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          type="text"
          placeholder="Ingresa tu nombre"
          {...register("name", { required: "Ingresa un nombre" })}
        />
        {errors.name && (
          <span className="text-red-600 font-roboto">{errors.name.message}</span>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="rut">Rut</Label>
        <Controller
          name="rut"
          control={control}
          rules={{
            required: "Ingrese un rut válido",
            pattern: {
              value: /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/,
              message: "Formato de RUT no válido",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              id="rut"
              placeholder="Ingresa tu rut"
              value={formatRut(field.value)}
              onChange={(e) => field.onChange(formatRut(e.target.value))}
            />
          )}
        />
        {errors.rut && (
          <span className="text-red-600 font-roboto">{errors.rut.message}</span>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          placeholder="Ingresa tu contraseña"
          {...register("password", {
            required: "Debe ingresar una contraseña",
            minLength: 8,
          })}
        />
        {errors.password && (
          <span className="text-red-600 font-roboto">
            {errors.password.message}
          </span>
        )}
      </div>
      <Button type="submit" className="mt-4">
        Registrarse
      </Button>
      <div className="text-center">
        <Link
          to="/login"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Iniciar sesión
        </Link>
      </div>
    </form>
  );
};
