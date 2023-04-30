import {
  Refine,
  Authenticated,
} from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  ThemedLayout,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { dataProvider, liveProvider } from "@refinedev/supabase";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import routerBindings, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { useTranslation } from "react-i18next";
import { Home } from "pages/demo/home";
import { AuthPage } from "pages/auth";
import { RegisterPage } from "pages/auth/register";
import { GoogleOutlined } from "@ant-design/icons";
import { UserList } from "pages/users";
import { supabaseGtfc } from "utility";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { Header } from "./components/header";
import { authProvider } from "providers";
import { Title } from "./components/layout";

function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <Refine
            dataProvider={dataProvider(supabaseGtfc)}
            liveProvider={liveProvider(supabaseGtfc)}
            authProvider={authProvider}
            routerProvider={routerBindings}
            notificationProvider={notificationProvider}
            i18nProvider={i18nProvider}
            resources={[
              {
                name: "tableau_de_bord",
                list: "/demo/home"
              },
              {
                name: "users",
                list: "/utilisateurs",
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                    <ThemedLayout Title={Title} Header={Header}>
                      <Outlet />
                    </ThemedLayout>
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="tableau_de_bord" />}
                />
                <Route path="/demo/home" element={<Home/>} />
                <Route path="/utilisateurs" element={<UserList />} />
              </Route>
              <Route
                element={
                  <Authenticated fallback={<Outlet />}>
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                <Route
                  path="/login"
                  element={
                    <AuthPage
                      type="login"
                      providers={[
                        {
                          name: "google",
                          label: "Connectez-vous avec Google",
                          icon: (
                              <GoogleOutlined
                                  style={{ fontSize: 18, lineHeight: 0 }}
                              />
                          ),
                        },
                      ]}
                    />
                  }
                />
                <Route
                  path="/register"
                  element={<RegisterPage />}
                />
                <Route
                  path="/forgot-password"
                  element={<AuthPage type="forgotPassword" />}
                />
              </Route>
              <Route
                element={
                  <Authenticated>
                    <ThemedLayout Title={Title} Header={Header}>
                      <Outlet />
                    </ThemedLayout>
                  </Authenticated>
                }
              >
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>

            <RefineKbar />
            <UnsavedChangesNotifier />
          </Refine>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
