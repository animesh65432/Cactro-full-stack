import { VideoDetails } from "./components/VideoDetails";
import { CommentSection } from "./components/CommentSection";
import { EditVideo } from "./components/EditVideo";
import { NotesSection } from "./components/NotesSection";
import { ToastContainer } from "react-toastify"
import styles from "./App.module.css"

const App = () => {
  return (
    <main className={styles.Container}>
      <VideoDetails />
      <EditVideo />
      <CommentSection />
      <NotesSection />
      <ToastContainer />
    </main>
  );
};

export default App
