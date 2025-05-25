import PublicacionesAcademicas from "./pages/PublicacionesAcademicas"
import { CustomSidebar } from "./shared/components/CustomSidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

function App() {
  return (
    <SidebarProvider>
      <CustomSidebar
      />
      <PublicacionesAcademicas
      />
    </SidebarProvider>
  )
}

export default App
