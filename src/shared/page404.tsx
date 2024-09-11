import { Link } from "react-router-dom"

export const Page404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-6xl font-bold text-navy-800 mb-4">404 Not Found</h1>
      <span className="text-lg mb-4 text-dark-gray">Ups! La página que estás buscando no existe...</span>
      <Link to="/inicio" className="bg-deep-sky-blue text-white py-2 px-4 rounded hover:bg-dark-blue transition duration-300">
        <span>Volver al Inicio</span>
      </Link>
    </div>
  )
}