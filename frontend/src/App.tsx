import { VideoDetails } from "./components/VideoDetails";
import { CommentSection } from "./components/CommentSection";
import { EditVideo } from "./components/EditVideo";
import { NotesSection } from "./components/NotesSection";

const App = () => {
  return (
    <main style={{ maxWidth: "800px", margin: "auto", padding: "2rem" }}>
      <VideoDetails />
      <EditVideo />
      <CommentSection />
      <NotesSection />
    </main>
  );
};

export default App
