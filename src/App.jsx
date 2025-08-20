import { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";
import { UserContext } from "./contexts/UserContext";
import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import HootList from "./components/HootList/HootList";
import HootDetails from "./components/HootDetails/HootDetails";
import HootForm from "./components/HootForm/HootForm";
import CommentForm from "./components/CommentForm/CommentForm";
import * as hootService from "./services/hootService";

const App = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [hoots, setHoots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();
      setHoots(hootsData);
    };
    if (user) fetchAllHoots();
  }, [user, isLoading]);

  const handleAddHoot = async (hootFormData) => {
    await hootService.create(hootFormData);
    setIsLoading(!isLoading);
    navigate("/hoots");
  };

  const handleDeleteHoot = async (hootId) => {
    await hootService.deleteHoot(hootId);
    setIsLoading(!isLoading);
    navigate("/hoots");
  };

  const handleUpdateHoot = async (hootId, hootFormData) => {
    await hootService.update(hootId, hootFormData);
    setIsLoading(!isLoading);
    navigate("/hoots");
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        {user ? (
          <>
            {/* Protected routes (available only to signed-in users) */}
            <Route path="/hoots" element={<HootList hoots={hoots} />} />
            <Route
              path="/hoots/:hootId"
              element={<HootDetails handleDeleteHoot={handleDeleteHoot} />}
            />
            <Route
              path="/hoots/new"
              element={<HootForm handleAddHoot={handleAddHoot} />}
            />
            <Route
              path="/hoots/:hootId/edit"
              element={<HootForm handleUpdateHoot={handleUpdateHoot} />}
            />
            <Route
              path="/hoots/:hootId/comments/:commentId/edit"
              element={<CommentForm />}
            />
          </>
        ) : (
          <>
            {/* Non-user routes (available only to guests) */}
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
