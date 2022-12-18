import {createContext} from 'react';
import AppContextProps from './AppContextProps';

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

export default AppContext;
