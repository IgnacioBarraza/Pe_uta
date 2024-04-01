import { Box, Button, Grid, GridItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "../styles/welcome.css";
import { OrganizeModal } from "../components/organize-modal";

export const Welcome = () => {
  return (
    <>
      <Grid
        templateRows="repeat(4, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={4}
        className="main-layout"
      >
        <GridItem rowSpan={3} colSpan={1}></GridItem>
        <GridItem colSpan={4} rowSpan={2} display={'flex'} flexDirection={'column'}>
          <span className="text-2xl text-center md:text-4xl mb-1">
            Feria de Ciencias
          </span>
          <span className="text-3xl text-center md:text-5xl mb-1">
            "Triunfando en el conocimiento"
          </span>
          <span className="text-2xl text-center md:text-4xl mb-1">
            Universidad de Tarapacá
          </span>
        </GridItem>
        <GridItem colSpan={3}>
          <Link to={"/login"}>
            <Button bgColor={"blue.700"} size={"lg"} color={"white"}>
              <span className="btn-text">Iniciar Sesión</span>
            </Button>
          </Link>
        </GridItem>
        <GridItem colSpan={2}>
          <Link to={"/signup"}>
            <Button bgColor={"gray.700"} size={"lg"} color={"white"}>
              <span className="btn-text">Registrarse</span>
            </Button>
          </Link>
        </GridItem>
        <GridItem colSpan={6}>
          <OrganizeModal />
        </GridItem>
      </Grid>
    </>
  );
};
