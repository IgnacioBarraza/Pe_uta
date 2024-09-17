import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useProps } from "@/hooks/useProps";
import { decodeToken, saveUserData } from "@/utils/authHelpers";
import { LoginUserDto } from "@/utils/utils";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserDto>();
  const { login } = useAuth();
  const { toast } = useToast()
  const { setUserName, setUserId, setTokenData, setUserType } = useProps()
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/inicio"; // Get the previous page or default to home (if not coming from another page)

  const onSubmit = async (loginUserData) => {
    try {
      console.log("Logged");
      const response = await login(loginUserData);
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
            title: 'Inicio de sesión correcto',
            description: 'Disfruta de la feria de ciencias!!!',
            variant: 'default'
          })
          navigate(from);
        }
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Hubo un error al iniciar sesión',
        variant: 'destructive'
      })
    }
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <Label htmlFor="rut">Rut</Label>
        <Input
          id="rut"
          type="text"
          placeholder="Ingresa tu rut en formato 11.111.111-1"
          {...register("rut", {
            required: "Ingrese un rut valido",
            pattern: {
              value: /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/,
              message: "Formato de RUT no válido",
            },
          })}
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
  );
};
