import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProgressProvider } from "@/contexts/UserProgressContext";
import { CreditsProvider } from "@/contexts/CreditsContext";
import { Layout } from "@/components/Layout";
import Landing from "./pages/Landing";
import SelectLanguage from "./pages/SelectLanguage";
import CreateProfile from "./pages/CreateProfile";
import Dashboard from "./pages/Dashboard";
import Lessons from "./pages/Lessons";
import LessonDetail from "./pages/LessonDetail";
import Conversation from "./pages/Conversation";
import Stories from "./pages/Stories";
import StoryPlay from "./pages/StoryPlay";
import Profile from "./pages/Profile";
import PublicProfile from "./pages/PublicProfile";
import Upgrade from "./pages/Upgrade";
import TcfTefPractice from "./pages/TcfTefPractice";
import TcfTefCategory from "./pages/TcfTefCategory";
import TcfTefReadingTest1 from "./pages/TcfTefReadingTest1";
import TcfTefReadingTest2 from "./pages/TcfTefReadingTest2";
import TcfTefReadingTest3 from "./pages/TcfTefReadingTest3";
import TcfTefReadingTest4 from "./pages/TcfTefReadingTest4";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProgressProvider>
        <CreditsProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/select-language" element={<SelectLanguage />} />
              <Route path="/onboarding" element={<CreateProfile />} />
              <Route path="/u/:shareToken" element={<PublicProfile />} />
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/lessons" element={<Lessons />} />
                <Route path="/lessons/:id" element={<LessonDetail />} />
                <Route path="/conversation" element={<Conversation />} />
                <Route path="/stories" element={<Stories />} />
                <Route path="/stories/:id" element={<StoryPlay />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/upgrade" element={<Upgrade />} />
                <Route path="/tcf-tef" element={<TcfTefPractice />} />
                <Route path="/tcf-tef/:skill" element={<TcfTefCategory />} />
                <Route path="/tcf-tef/reading/test/1" element={<TcfTefReadingTest1 />} />
                <Route path="/tcf-tef/reading/test/2" element={<TcfTefReadingTest2 />} />
                <Route path="/tcf-tef/reading/test/3" element={<TcfTefReadingTest3 />} />
                <Route path="/tcf-tef/reading/test/4" element={<TcfTefReadingTest4 />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CreditsProvider>
      </UserProgressProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
