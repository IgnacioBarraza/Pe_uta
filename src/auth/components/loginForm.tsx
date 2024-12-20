import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useProps } from "@/hooks/useProps";
import { decodeToken, formatRut, saveUserData } from "@/utils/authHelpers";
import { LoginUserDto } from "@/utils/interface";
import { useForm, Controller } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useDataProvider } from "@/hooks/useData";

export const LoginForm = ({setIsLogin}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginUserDto>();
  const { login } = useAuth();
  const { toast } = useToast()
  const { setUserName, setUserId, setTokenData, setUserType } = useProps()
  const { addEvaluationLocally } = useDataProvider()
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/inicio"; // Get the previous page or default to home (if not coming from another page)

  const onSubmit = async (loginUserData: LoginUserDto) => {
    try {
      
      const response = await login(loginUserData);
      const { data, status } = response;
      if (status === 201) {
        const token = data.accessToken;
        const decodedToken = decodeToken(token);
        if (decodeToken) {
          const savedData = saveUserData(decodedToken, token, data.evaluations);
          setUserName(savedData.name)
          setUserId(savedData.id)
          setUserType(savedData.user_type)
          setTokenData(token)
          addEvaluationLocally(data.evaluations)
          localStorage.removeItem('redirected');
          toast({
            title: 'Inicio de sesión correcto',
            description: 'Disfruta de la feria de ciencias!!!',
            variant: 'default'
          })
          console.log("Logged");
          navigate(from);
        }
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Hubo un error al iniciar sesión',
        description: `${error.response.data.message}`,
        variant: 'destructive'
      })
    }
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
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
        Ingresar
      </Button>
      <div className="text-center">
        <button
          onClick={() => setIsLogin(false)}
          type="button"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          ¿No tienes cuenta? Registrate aquí
        </button>
      </div>
    </form>
  );
};
