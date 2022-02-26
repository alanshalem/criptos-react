import { useState } from "react";
import styled from "@emotion/styled";

const Heading = styled.h1`
	font-family: "Lato", sans-serif;
	color: #fff;
`;

const Contenedor = styled.div`
	max-width: 600px;
`;
function App() {
	return <Heading>Desde App</Heading>;
}

export default App;
