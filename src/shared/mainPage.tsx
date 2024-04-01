import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

export const MainPage = () => {
  return (
    <>
      <Box
        bgImage={"url(/fondo_login.jpg)"}
        width={"100vw"}
        height={"100vh"}
        bgSize={'cover'}
        bgRepeat={'no-repeat'}
        color={'white'}
        fontFamily={'monospace'}
        fontWeight={'bold'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Outlet />
      </Box>
    </>
  );
};
