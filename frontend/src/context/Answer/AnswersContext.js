import React, { createContext } from "react";

// import useWhatsApps from "../../hooks/useWhatsApps";

const AnswersContext = createContext();

const AnswersProvider = ({ children }) => {
	const { loading, answers } = useWhatsApps();

	return (
		<AnswersContext.Provider value={{ answers, loading }}>
			{children}
		</AnswersContext.Provider>
	);
};

export { AnswersContext, AnswersProvider };
