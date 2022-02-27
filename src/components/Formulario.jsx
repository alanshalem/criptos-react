import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas";
import Error from "./Error";

const InputSubmit = styled.input`
	background-color: #9497ff;
	border: none;
	width: 100%;
	padding: 10px;
	color: #fff;
	font-weight: 700;
	text-transform: uppercase;
	font-size: 20px;
	border-radius: 5px;
	transition: background-color 0.3s ease;
	margin-top: 20px;

	&:hover {
		cursor: pointer;
		background-color: #7a7dfe;
	}
`;

const Formulario = ({ setMonedas }) => {
	const [criptos, setCriptos] = useState([]);

	const [moneda, SelectMonedas] = useSelectMonedas(
		"Elige tu moneda",
		monedas
	);

	const [criptomoneda, SelectCriptomonedas] = useSelectMonedas(
		"Elige tu Criptomoneda",
		criptos
	);

	const [error, setError] = useState(false);
	useEffect(() => {
		const consultarAPI = async () => {
			const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD`;
			const respuesta = await fetch(url);
			const resultado = await respuesta.json();
			console.log(resultado.Data);

			const arrayCriptos = resultado.Data.map((cripto) => {
				const objeto = {
					codigo: cripto.CoinInfo.Name,
					nombre: cripto.CoinInfo.FullName,
				};
				return objeto;
			});

			setCriptos(arrayCriptos);

			console.log(arrayCriptos);
		};
		consultarAPI();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if ([moneda, criptomoneda].includes("")) {
			setError(true);
			return;
		}
		setError(false);
		setMonedas({ moneda, criptomoneda });
	};

	return (
		<>
			{error && <Error>Todos los campos son obligatorios</Error>}
			<form onSubmit={handleSubmit}>
				<SelectMonedas />
				<SelectCriptomonedas />
				<InputSubmit type='submit' value='Cotizar' />
			</form>
		</>
	);
};

export default Formulario;
