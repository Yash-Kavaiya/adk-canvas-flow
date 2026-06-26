import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { MaterialButtonDemo } from "@/components/material-button-demo";
import { MaterialCardDemo } from "@/components/material-card-demo";
import { AppErrorBoundary } from "@/components/layout/AppErrorBoundary";



const App = () => (
  <>
    <Toaster />
    <Sonner />
    <AppErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/buttons" element={<MaterialButtonDemo />} />
          <Route path="/cards" element={<MaterialCardDemo />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppErrorBoundary>
  </>
);

export default App;
