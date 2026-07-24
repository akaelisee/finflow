import { jsx as _jsx } from "react/jsx-runtime";
import { RouterProvider } from 'react-router-dom';
import { Providers } from './providers';
import { router } from './router';
export function App() {
    return (_jsx(Providers, { children: _jsx(RouterProvider, { router: router }) }));
}
