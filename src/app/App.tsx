import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@/app/Layout";
import { Home, NoMatch } from "@/pages";
import { ResumeProvider, ThemeProvider } from "@/contexts";

const App: FC = () => {
  return (
    <ThemeProvider>
      <ResumeProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </ResumeProvider>
    </ThemeProvider>
  );
};

export default App;
