import {
  faFileExcel,
  faFileUpload,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useProps } from "../../hooks/useProps";
import { useEffect, useState } from "react";
import { useBackend } from "../../hooks/useBackend";
import RecoverPassword from "../../components/RecoverPasswordModal/recover";
import ProjectButton from "./components/ProjectButton";
import "../../styles/mainpage.css";
import { UploadProject } from "../../components/uploadProject/uploadProject";
import { Link } from "react-router-dom";

const SubjectProjects = [
  {
    key: "1",
    to: "projects/intro-fisica/1",
    label: "Ir a Introducción a la Física",
    imgClass: "intro-fisica-img",
    subject: "Introducción a la Física",
  },
  {
    key: "2",
    to: "projects/mecanica-clasica/2",
    label: "Ir a Mecánica Clásica",
    imgClass: "mecanica-clasica-img",
    subject: "Mecánica Clásica",
  },
  {
    key: "3",
    to: "projects/electromagnetismo/3",
    label: "Ir a Electromagnetismo",
    imgClass: "electro-img",
    subject: "Electromagnetismo",
  },
  {
    key: "4",
    to: "projects/fisica-contemporanea/4",
    label: "Ir a Física Contemporanea",
    imgClass: "fisica-contemporanea-img",
    subject: "Física Contemporanea",
  },
  {
    key: "5",
    to: "projects/kinesiología/5",
    label: "Ir a Kinesiología",
    imgClass: "kine-img",
    subject: "Kinesiología",
  },
];

export const Home = () => {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Descubre las maravillas de la ciencia
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Únete a nosotros en un emocionante viaje al mundo de la
                  innovación en nuestra Expo de Ciencias, organizada por los
                  estudiantes del departamento de ingeniería. Descubre proyectos
                  de vanguardia, exhibiciones interactivas y presentaciones
                  dinámicas, todos diseñados por los futuros líderes en
                  tecnología. Participa en demostraciones prácticas y explora
                  cómo la creatividad estudiantil está dando forma al futuro de
                  la ciencia y la ingeniería.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  to="proyectos"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Explora los proyectos
                </Link>
                <Link
                  to="#"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Get Tickets
                </Link>
              </div>
            </div>
            <img
              src="/expo_placeholder.jpeg"
              width="550"
              height="550"
              alt="Science Expo"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Cronograma
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Revisa el cronograma
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Descubre la emocionante programación de eventos, talleres y
                presentaciones que tendrán lugar durante la Expo de Ciencias.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <img
              src="/placeholder.svg"
              width="550"
              height="310"
              alt="Schedule"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            />
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Apertura - 09:30 AM</h3>
                    <p className="text-muted-foreground">
                      Escucha la apertura de la mano de la academica Olga Penagos, docente de los ramos de Física del departamento de ingeniería.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Presentacións interactivas - 10:00 AM</h3>
                    <p className="text-muted-foreground">
                      Participa en actividades interactivas y experimentos prácticos realizados por los estudiantes expositores.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Cierre 2:00 PM</h3>
                    <p className="text-muted-foreground">
                      Escucha el cierre de la feria junto a la academica Olga Penagos y más academicos e invitados.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
