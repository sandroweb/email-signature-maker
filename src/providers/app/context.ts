import { createContext } from "react";
import IAppContext from "../../types/IAppContext";

const AppContext = createContext<IAppContext>({
    data: {
        html: '',
        fields: [],
        viewerMode: false
    },
    setData: () => {},
    generateLink: () => '',
});

export default AppContext;