import type { RouteObject } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/home/page";
import { lazy, Suspense } from "react";

const ReportPage = lazy(() => import("@/pages/report/page"));
const ReportsPage = lazy(() => import("@/pages/reports/page"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/reports",
    element: (
      <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "#F5F3EE" }} />}>
        <ReportsPage />
      </Suspense>
    ),
  },
  {
    path: "/reports/:id",
    element: (
      <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "#F5F3EE" }} />}>
        <ReportPage />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;