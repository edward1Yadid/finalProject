import { Provider } from "react-redux";
import "./App.css";


import Layout from "./build/layouts/Layout";
import Router from "./build/routers/Router";
import { BrowserRouter } from "react-router-dom";
import { appStore } from "./build/redux/Store";
import SnackbarProvider from "./build/Providers/SnackBarProvider";
import Filter from "./build/Filter";
import { ThemeProvider } from "./build/Providers/ThemeProvider";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <ThemeProvider>
            <Provider store={appStore}>
        <SnackbarProvider>
        <Layout>
            <Router />
          </Layout>
        </SnackbarProvider>
    
        </Provider>

      </ThemeProvider>

      </BrowserRouter>
  
    </div>
  );
}

export default App;
