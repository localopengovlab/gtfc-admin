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
import { AntdInferencer } from "@refinedev/inferencer/antd";
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
import { AgendaList } from 'pages/agenda'
import { supabaseGtfc } from "utility";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { Header } from "./components/header";
import { authProvider, accessControlProvider } from "providers";
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
            accessControlProvider={accessControlProvider}
            routerProvider={routerBindings}
            notificationProvider={notificationProvider}
            i18nProvider={i18nProvider}
            resources={[
              {
                name: "tableau_de_bord",
                list: "/demo/home"
              },
              {
                name: "reunion",
              },
              {
                name: "agenda",
                list: "/reunion/agenda",
                create: "/reunion/agenda/create",
                edit: "/reunion/agenda/edit/:id",
                show: "/reunion/agenda/show/:id",
                meta: {
                    canDelete: true,
                    parent: "reunion"
                },
              },
              {
                name: "lieu",
                list: "/reunion/lieu",
                create: "/reunion/lieu/create",
                edit: "/reunion/lieu/edit/:id",
                meta: {
                    parent: "reunion",
                    canDelete: true,
                },
              },
              {
                name: "statut",
                list: "/reunion/statut",
                create: "/reunion/statut/create",
                edit: "/reunion/statut/edit/:id",
                meta: {
                    parent: "reunion",
                    canDelete: true,
                },
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
                <Route
                    index
                    element={
                        <NavigateToResource resource="samples" />
                    }
                />
                <Route path="reunion">
                  <Route path="agenda">
                    <Route index element={<AgendaList />} />
                    <Route
                        path="create"
                        element={<AntdInferencer />}
                    />
                    <Route
                        path="edit/:id"
                        element={<AntdInferencer />}
                    />
                    <Route
                        path="show/:id"
                        element={<AntdInferencer />}
                    />
                  </Route>

                    <Route path="lieu">
                        <Route index element={<AntdInferencer />} />
                        <Route
                            path="create"
                            element={<AntdInferencer />}
                        />
                        <Route
                            path="edit/:id"
                            element={<AntdInferencer />}
                        />
                    </Route>

                    <Route path="statut">
                        <Route index element={<AntdInferencer />} />
                        <Route
                            path="create"
                            element={<AntdInferencer />}
                        />
                        <Route
                            path="edit/:id"
                            element={<AntdInferencer />}
                        />
                    </Route>
                </Route>
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
