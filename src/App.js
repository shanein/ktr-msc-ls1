import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import Navbar from "./coponents/Navbar";
import SignUpModal from "./coponents/SignUpModal";
import SignInModal from "./coponents/SignInModal"
import CreateCardModal from "./coponents/CreateCardModal"
import Private from "./pages/Private/Pivate";
import PrivateHome from "./pages/Private/PrivateHome/PrivateHome";
import PrivateMyaccount from "./pages/Private/PrivateMyaccount/PrivateMyaccount"

function App() {
  return (
    <>
    <SignUpModal />
    <SignInModal />
    <CreateCardModal />
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/private" element={<Private />}>
          <Route path="/private/private-home" element={<PrivateHome />} />
          <Route path="/private/my-account" element={<PrivateMyaccount />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
