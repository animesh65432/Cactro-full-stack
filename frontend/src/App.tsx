import { VideoDetails } from "./components/VideoDetails";
import { CommentSection } from "./components/CommentSection";
import { EditVideo } from "./components/EditVideo";
import { NotesSection } from "./components/NotesSection";

const App = () => {
  return (
    <main>
      <VideoDetails />
      <EditVideo />
      <CommentSection />
      <NotesSection />
    </main>
  );
};

export default App
