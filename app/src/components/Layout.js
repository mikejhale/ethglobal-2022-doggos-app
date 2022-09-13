import React from "react";
import Header from "./Header";
import { Box } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Box padding={14}>
      <section>
        <Header />
      </section>
      <main>{children}</main>
    </Box>
  );
};

export default Layout;
