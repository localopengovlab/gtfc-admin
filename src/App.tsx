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
import { Home } from "pages/home";
import { AuthPage } from "pages/auth";
import { RegisterPage } from "pages/auth/register";
import { GoogleOutlined } from "@ant-design/icons";
import { 
  UtilisateurList,
  UtilisateurEdit,
  StatutList,
  StatutCreate,
  StatutEdit,
  LieuList,
  LieuCreate,
  LieuEdit,
  BureauList,
  BureauCreate,
  BureauEdit
} from "pages/reglage";
import { AgendaList, AgendaCreate, AgendaEdit, AgendaShow } from 'pages/agenda'
import { supabaseGtfc } from "utility";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { Header } from "./components/header";
import { authProvider, accessControlProvider } from "providers";
import { Title } from "./components/layout";
import { CalendarOutlined, SettingOutlined } from "@ant-design/icons";
import 'dayjs/locale/fr';

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
                list: "accueil"
              },
              {
                name: "reunion",
                meta: { label: "Réunions", icon: <CalendarOutlined /> }
              },
              {
                name: "agenda",
                list: "/reunion/agenda",
                create: "/reunion/agenda/create",
                edit: "/reunion/agenda/edit/:id",
                show: "/reunion/agenda/show/:id",
                meta: {
                    canDelete: true,
                    parent: "reunion",
                },
              },
              {
                name: "reglage",
                meta: { label: "Réglages", icon: <SettingOutlined /> }
              },
              {
                name: "users",
                list: "/reglage/utilisateurs",
                edit: "/reglage/utilisateurs/edit/:id",
                meta: {
                    parent: "reglage",
                    label: "Utilisateurs",
                    canDelete: true
                },
              },
              {
                name: "bureau",
                list: "/reglage/bureau",
                create: "/reglage/bureau/create",
                edit: "/reglage/bureau/edit/:id",
                meta: {
                    parent: "reglage",
                    label: "Bureaux",
                    canDelete: true,
                },
              },
              {
                name: "lieu",
                list: "/reglage/lieu",
                create: "/reglage/lieu/create",
                edit: "/reglage/lieu/edit/:id",
                meta: {
                    parent: "reglage",
                    label: "Lieux",
                    canDelete: true,
                },
              },
              {
                name: "statut",
                list: "/reglage/statut",
                create: "/reglage/statut/create",
                edit: "/reglage/statut/edit/:id",
                meta: {
                    parent: "reglage",
                    canDelete: true,
                },
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
                <Route path="reunion">
                  <Route path="agenda">
                    <Route index element={<AgendaList />} />
                    <Route
                        path="create"
                        element={<AgendaCreate />}
                    />
                    <Route
                        path="edit/:id"
                        element={<AgendaEdit />}
                    />
                    <Route
                        path="show/:id"
                        element={<AgendaShow />}
                    />
                  </Route>
                </Route>
                <Route path="accueil" element={<Home/>} />
                <Route path="reglage">
                  <Route path="utilisateurs">
                    <Route index element={<UtilisateurList />} />
                    <Route path="edit/:id" element={<UtilisateurEdit />} />
                  </Route>

                  <Route path="bureau">
                    <Route index element={<BureauList />} />
                    <Route
                        path="create"
                        element={<BureauCreate />}
                    />
                    <Route
                        path="edit/:id"
                        element={<BureauEdit />}
                    />
                  </Route>
                  <Route path="lieu">
                    <Route index element={<LieuList />} />
                    <Route
                        path="create"
                        element={<LieuCreate />}
                    />
                    <Route
                        path="edit/:id"
                        element={<LieuEdit />}
                    />
                  </Route>

                  <Route path="statut">
                    <Route index element={<StatutList />} />
                    <Route
                        path="create"
                        element={<StatutCreate />}
                    />
                    <Route
                        path="edit/:id"
                        element={<StatutEdit />}
                    />
                  </Route>
                </Route>
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
