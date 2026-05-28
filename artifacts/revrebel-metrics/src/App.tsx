import React, { Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";

const queryClient = new QueryClient();

// (app) pages
const HomePage = React.lazy(() => import("@/app/page"));
const DashboardPage = React.lazy(() => import("@/app/(app)/dashboard/page"));
const DashboardSegmentsPage = React.lazy(() => import("@/app/(app)/dashboard/segments/page"));
const DashboardChannelsPage = React.lazy(() => import("@/app/(app)/dashboard/channels/page"));
const DashboardRoomTypesPage = React.lazy(() => import("@/app/(app)/dashboard/room-types/page"));
const DashboardDemandPage = React.lazy(() => import("@/app/(app)/dashboard/demand/page"));
const DashboardWebsitePage = React.lazy(() => import("@/app/(app)/dashboard/website/page"));
const UsersPage = React.lazy(() => import("@/app/(app)/users/page"));
const AppsPage = React.lazy(() => import("@/app/(app)/apps/page"));
const CampaignsPage = React.lazy(() => import("@/app/(app)/campaigns/page"));
const CampaignsActivePage = React.lazy(() => import("@/app/(app)/campaigns/active/page"));
const CampaignsPerformancePage = React.lazy(() => import("@/app/(app)/campaigns/performance/page"));
const CampaignsSetupPage = React.lazy(() => import("@/app/(app)/campaigns/setup/page"));
const ChatsPage = React.lazy(() => import("@/app/(app)/chats/page"));
const ChatsAssistantPage = React.lazy(() => import("@/app/(app)/chats/assistant/page"));
const DataLibraryPage = React.lazy(() => import("@/app/(app)/data-library/page"));
const DataLibraryDataHealthPage = React.lazy(() => import("@/app/(app)/data-library/data-health/page"));
const DataLibraryLookupsPage = React.lazy(() => import("@/app/(app)/data-library/lookups/page"));
const DataLibraryMappingsPage = React.lazy(() => import("@/app/(app)/data-library/mappings/page"));
const DataLibraryUnmappedCodesPage = React.lazy(() => import("@/app/(app)/data-library/unmapped-codes/page"));
const HelpDeskPage = React.lazy(() => import("@/app/(app)/help-desk/page"));
const HelpDeskContactPage = React.lazy(() => import("@/app/(app)/help-desk/contact/page"));
const HelpDeskDocumentationPage = React.lazy(() => import("@/app/(app)/help-desk/documentation/page"));
const HotelsStrategiesPage = React.lazy(() => import("@/app/(app)/hotels/strategies/page"));
const HotelsCampaignsPage = React.lazy(() => import("@/app/(app)/hotels/campaigns/page"));
const HotelsEventsPage = React.lazy(() => import("@/app/(app)/hotels/events/page"));
const HotelsNotesPage = React.lazy(() => import("@/app/(app)/hotels/notes/page"));
const HotelsTasksPage = React.lazy(() => import("@/app/(app)/hotels/tasks/page"));
const MetricLibraryPage = React.lazy(() => import("@/app/(app)/metric-library/page"));
const MetricLibraryBasePage = React.lazy(() => import("@/app/(app)/metric-library/base/page"));
const MetricLibraryCalculatedPage = React.lazy(() => import("@/app/(app)/metric-library/calculated/page"));
const PropertiesPage = React.lazy(() => import("@/app/(app)/properties/page"));
const StrategiesPage = React.lazy(() => import("@/app/(app)/strategies/page"));
const StrategiesPlaybooksPage = React.lazy(() => import("@/app/(app)/strategies/playbooks/page"));
const StrategiesRecommendedActionsPage = React.lazy(() => import("@/app/(app)/strategies/recommended-actions/page"));
const StrategiesTriggersPage = React.lazy(() => import("@/app/(app)/strategies/triggers/page"));
const TasksPage = React.lazy(() => import("@/app/(app)/tasks/page"));

// Settings pages
const SettingsPage = React.lazy(() => import("@/app/(app)/settings/page"));
const SettingsProfilePage = React.lazy(() => import("@/app/(app)/settings/profile/page"));
const SettingsAccountPage = React.lazy(() => import("@/app/(app)/settings/account/page"));
const SettingsAppearancePage = React.lazy(() => import("@/app/(app)/settings/appearance/page"));
const SettingsNotificationsPage = React.lazy(() => import("@/app/(app)/settings/notifications/page"));
const SettingsDisplayPage = React.lazy(() => import("@/app/(app)/settings/display/page"));
const SettingsDataLibraryLookupsPage = React.lazy(() => import("@/app/(app)/settings/data-library/lookups/page"));

// Auth pages
const SignInPage = React.lazy(() => import("@/app/(auth)/sign-in/page"));
const SignUpPage = React.lazy(() => import("@/app/(auth)/sign-up/page"));

// Backend pages
const PlaygroundPage = React.lazy(() => import("@/app/(backend)/playground/page"));
const UIBuilderPage = React.lazy(() => import("@/app/(backend)/ui-builder/page"));

// Misc pages
const MetricLayoutsPage = React.lazy(() => import("@/app/metric-layouts/page"));
const WidgetPropsPage = React.lazy(() => import("@/app/widget-props/page"));
const WidgetsTestPage = React.lazy(() => import("@/app/widgets-test/page"));
const DailyPickupTableTestPage = React.lazy(() => import("@/app/widgets-test/dailypickuptable/page"));

function AppShell({ children }: { children: React.ReactNode }) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}

function PageLoader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
    </div>
  );
}

function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        {/* Auth routes - no shell */}
        <Route path="/sign-in" component={SignInPage} />
        <Route path="/sign-up" component={SignUpPage} />

        {/* Backend routes - no app shell */}
        <Route path="/playground" component={PlaygroundPage} />
        <Route path="/ui-builder">
          {() => (
            <Suspense fallback={<PageLoader />}><UIBuilderPage /></Suspense>
          )}
        </Route>

        {/* Misc utility routes */}
        <Route path="/metric-layouts" component={MetricLayoutsPage} />
        <Route path="/widget-props" component={WidgetPropsPage} />
        <Route path="/widgets-test/dailypickuptable" component={DailyPickupTableTestPage} />
        <Route path="/widgets-test" component={WidgetsTestPage} />

        {/* Main app routes - with AuthenticatedLayout shell */}
        <Route path="/">
          {() => (
            <AppShell>
              <Suspense fallback={<PageLoader />}><HomePage /></Suspense>
            </AppShell>
          )}
        </Route>

        <Route path="/dashboard">
          {() => (
            <AppShell>
              <Suspense fallback={<PageLoader />}><DashboardPage /></Suspense>
            </AppShell>
          )}
        </Route>
        <Route path="/dashboard/segments">
          {() => <AppShell><Suspense fallback={<PageLoader />}><DashboardSegmentsPage /></Suspense></AppShell>}
        </Route>
        <Route path="/dashboard/channels">
          {() => <AppShell><Suspense fallback={<PageLoader />}><DashboardChannelsPage /></Suspense></AppShell>}
        </Route>
        <Route path="/dashboard/room-types">
          {() => <AppShell><Suspense fallback={<PageLoader />}><DashboardRoomTypesPage /></Suspense></AppShell>}
        </Route>
        <Route path="/dashboard/demand">
          {() => <AppShell><Suspense fallback={<PageLoader />}><DashboardDemandPage /></Suspense></AppShell>}
        </Route>
        <Route path="/dashboard/website">
          {() => <AppShell><Suspense fallback={<PageLoader />}><DashboardWebsitePage /></Suspense></AppShell>}
        </Route>

        <Route path="/users">
          {() => <AppShell><Suspense fallback={<PageLoader />}><UsersPage /></Suspense></AppShell>}
        </Route>
        <Route path="/apps">
          {() => <AppShell><Suspense fallback={<PageLoader />}><AppsPage /></Suspense></AppShell>}
        </Route>

        <Route path="/campaigns">
          {() => <AppShell><Suspense fallback={<PageLoader />}><CampaignsPage /></Suspense></AppShell>}
        </Route>
        <Route path="/campaigns/active">
          {() => <AppShell><Suspense fallback={<PageLoader />}><CampaignsActivePage /></Suspense></AppShell>}
        </Route>
        <Route path="/campaigns/performance">
          {() => <AppShell><Suspense fallback={<PageLoader />}><CampaignsPerformancePage /></Suspense></AppShell>}
        </Route>
        <Route path="/campaigns/setup">
          {() => <AppShell><Suspense fallback={<PageLoader />}><CampaignsSetupPage /></Suspense></AppShell>}
        </Route>

        <Route path="/chats">
          {() => <AppShell><Suspense fallback={<PageLoader />}><ChatsPage /></Suspense></AppShell>}
        </Route>
        <Route path="/chats/assistant">
          {() => <AppShell><Suspense fallback={<PageLoader />}><ChatsAssistantPage /></Suspense></AppShell>}
        </Route>

        <Route path="/data-library">
          {() => <AppShell><Suspense fallback={<PageLoader />}><DataLibraryPage /></Suspense></AppShell>}
        </Route>
        <Route path="/data-library/data-health">
          {() => <AppShell><Suspense fallback={<PageLoader />}><DataLibraryDataHealthPage /></Suspense></AppShell>}
        </Route>
        <Route path="/data-library/lookups">
          {() => <AppShell><Suspense fallback={<PageLoader />}><DataLibraryLookupsPage /></Suspense></AppShell>}
        </Route>
        <Route path="/data-library/mappings">
          {() => <AppShell><Suspense fallback={<PageLoader />}><DataLibraryMappingsPage /></Suspense></AppShell>}
        </Route>
        <Route path="/data-library/unmapped-codes">
          {() => <AppShell><Suspense fallback={<PageLoader />}><DataLibraryUnmappedCodesPage /></Suspense></AppShell>}
        </Route>

        <Route path="/help-desk">
          {() => <AppShell><Suspense fallback={<PageLoader />}><HelpDeskPage /></Suspense></AppShell>}
        </Route>
        <Route path="/help-desk/contact">
          {() => <AppShell><Suspense fallback={<PageLoader />}><HelpDeskContactPage /></Suspense></AppShell>}
        </Route>
        <Route path="/help-desk/documentation">
          {() => <AppShell><Suspense fallback={<PageLoader />}><HelpDeskDocumentationPage /></Suspense></AppShell>}
        </Route>

        <Route path="/hotels/strategies">
          {() => <AppShell><Suspense fallback={<PageLoader />}><HotelsStrategiesPage /></Suspense></AppShell>}
        </Route>
        <Route path="/hotels/campaigns">
          {() => <AppShell><Suspense fallback={<PageLoader />}><HotelsCampaignsPage /></Suspense></AppShell>}
        </Route>
        <Route path="/hotels/events">
          {() => <AppShell><Suspense fallback={<PageLoader />}><HotelsEventsPage /></Suspense></AppShell>}
        </Route>
        <Route path="/hotels/notes">
          {() => <AppShell><Suspense fallback={<PageLoader />}><HotelsNotesPage /></Suspense></AppShell>}
        </Route>
        <Route path="/hotels/tasks">
          {() => <AppShell><Suspense fallback={<PageLoader />}><HotelsTasksPage /></Suspense></AppShell>}
        </Route>

        <Route path="/metric-library">
          {() => <AppShell><Suspense fallback={<PageLoader />}><MetricLibraryPage /></Suspense></AppShell>}
        </Route>
        <Route path="/metric-library/base">
          {() => <AppShell><Suspense fallback={<PageLoader />}><MetricLibraryBasePage /></Suspense></AppShell>}
        </Route>
        <Route path="/metric-library/calculated">
          {() => <AppShell><Suspense fallback={<PageLoader />}><MetricLibraryCalculatedPage /></Suspense></AppShell>}
        </Route>

        <Route path="/properties">
          {() => <AppShell><Suspense fallback={<PageLoader />}><PropertiesPage /></Suspense></AppShell>}
        </Route>

        <Route path="/strategies">
          {() => <AppShell><Suspense fallback={<PageLoader />}><StrategiesPage /></Suspense></AppShell>}
        </Route>
        <Route path="/strategies/playbooks">
          {() => <AppShell><Suspense fallback={<PageLoader />}><StrategiesPlaybooksPage /></Suspense></AppShell>}
        </Route>
        <Route path="/strategies/recommended-actions">
          {() => <AppShell><Suspense fallback={<PageLoader />}><StrategiesRecommendedActionsPage /></Suspense></AppShell>}
        </Route>
        <Route path="/strategies/triggers">
          {() => <AppShell><Suspense fallback={<PageLoader />}><StrategiesTriggersPage /></Suspense></AppShell>}
        </Route>

        <Route path="/tasks">
          {() => <AppShell><Suspense fallback={<PageLoader />}><TasksPage /></Suspense></AppShell>}
        </Route>

        <Route path="/settings">
          {() => <AppShell><Suspense fallback={<PageLoader />}><SettingsPage /></Suspense></AppShell>}
        </Route>
        <Route path="/settings/profile">
          {() => <AppShell><Suspense fallback={<PageLoader />}><SettingsProfilePage /></Suspense></AppShell>}
        </Route>
        <Route path="/settings/account">
          {() => <AppShell><Suspense fallback={<PageLoader />}><SettingsAccountPage /></Suspense></AppShell>}
        </Route>
        <Route path="/settings/appearance">
          {() => <AppShell><Suspense fallback={<PageLoader />}><SettingsAppearancePage /></Suspense></AppShell>}
        </Route>
        <Route path="/settings/notifications">
          {() => <AppShell><Suspense fallback={<PageLoader />}><SettingsNotificationsPage /></Suspense></AppShell>}
        </Route>
        <Route path="/settings/display">
          {() => <AppShell><Suspense fallback={<PageLoader />}><SettingsDisplayPage /></Suspense></AppShell>}
        </Route>
        <Route path="/settings/data-library/lookups">
          {() => <AppShell><Suspense fallback={<PageLoader />}><SettingsDataLibraryLookupsPage /></Suspense></AppShell>}
        </Route>

        {/* 404 fallback */}
        <Route>
          {() => (
            <AppShell>
              <div className="flex h-svh items-center justify-center">
                <div className="text-center">
                  <h1 className="text-7xl font-bold">404</h1>
                  <p className="mt-2 text-muted-foreground">Page not found</p>
                </div>
              </div>
            </AppShell>
          )}
        </Route>
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppRouter />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
