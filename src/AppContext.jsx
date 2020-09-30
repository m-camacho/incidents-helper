import PropTypes from 'prop-types';
import React, {createContext, useState} from 'react';

export const AppContext = createContext();

const AppContextProvider = ({children}) => {
    const [incidents, setIncidents] = useState([]);
    const addIncident = (newIncident) => {setIncidents([...incidents, newIncident])};

    return (
    <AppContext.Provider value={{
        incidents,
        addIncident
    }}>
        {children}
    </AppContext.Provider>
    );
};

AppContextProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
}

AppContextProvider.defaultProps = {
    children: null,
}

export default AppContextProvider;
