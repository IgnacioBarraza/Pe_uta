import React from 'react'

export default function AuthHeader({ isLoginOrRegister }) {
  if (isLoginOrRegister === 'login') {
    return (
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
          Feria de Divulgación Universitaria
        </h1>
        <p className="max-w-[600px] text-muted-foreground md:text-xl">
          Ingresa tu rut y contraseña para ingresar.
        </p>
      </div>
    )
  }

  if (isLoginOrRegister === 'register') {
    return (
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
    )
  }
}
