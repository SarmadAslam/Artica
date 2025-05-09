import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// ================================= Sarmad ======================================
// Admin Pages - Sarmad
import AdminLogin from "./pages/admin/adminAuth/AdminLogin";
import Dashboard from "./pages/admin/dashboard/dashboard";
import ManageUsers from "./pages/admin/ManageUsers/ManageUsers";
import ManageJobs from "./pages/admin/ManageJobs/ManageJobs";
import ManageBids from "./pages/admin/ManageBids/ManageBids";
import ManageArticles from "./pages/admin/ManageArticles/MonitorArticles";
import ManageCompetitions from "./pages/admin/ManageCompetitions/ManageCompetitions";
import ManageNews from "./pages/admin/ManageNewsAndUpdates/ManageNews";
import ManageExhibitions from "./pages/admin/ManageExhibitions/ManageExhibitions";
import AdminProtectedRoutes from "./components/routes/AdminProtectedRoutes";
import AdminRedirect from "./pages/admin/AdminRedirect";

// Auth Pages - Sarmad
import Login from "./pages/auth/Login/Login";
import Register from "./pages/auth/Register/Register";
import VerifyOtp from "./pages/auth/Register/VerifyOTP";
import { RoleSelection } from "./pages/auth/Register/role-selection";
import ForgotPassword from "./pages/auth/ResetPassword/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword/ResetPassword";

// General Pages - Sarmad
import NotFoundPage from "./pages/notFound/PageNotFound";
import ArtistHome from "./components/views/home/Home";
import Home from "./pages/home/Home";
// Client Pages
import PostJob from "./pages/Client/PostJob/PostJob";
import Title from "./pages/Client/PostJob/title";
import JobForm from "./pages/Client/PostJob/JobForm";
import SearchJob from "./pages/Artist/SearchJob/SearchJob";
import CreateProfile from "./pages/Client/ClientProfile/CreateProfile";
import ClientProfileCard from "./pages/Client/ClientProfile/ClientProfileCard";
import ExhibitionsList from "./pages/Artist/Exhibition/viewExhibition";
import ClientDashboard from "./pages/Client/ClientProfile/Dashboard";
import ParticipateInExhibition from "./pages/Artist/Exhibition/participateInExhibition";

// Artist Pages - Eisha
import LandingPage from "./components/views/LandingPage"
import Profile from "./components/views/profile/Profile";
import ShowProfile from "./components/views/profile/ShowProfile";
import EditArtistPortfolio from "./components/views/profile/EditArtistPortfolio";
import Browse from "./components/views/browse/Browse";
import About from "./components/views/about/About";
import Contact from "./components/views/contact/Contact";
import ArtworkForm from "./components/views/artworks/ArtworkForm";
import WinningBidSection from "./components/WinningBidSection";
import Bidding from "./components/views/bidding/Bidding";
import ArtworkDetail from "./components/views/artworks/ArtworkDetail";
import Categories from "./components/views/categories/Categories";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateArticle from "./components/views/Article/CreateArticle";
import ArtArticlePage from "./components/ArtArticlePage";
import AllStories from "./components/AllStories";
import MyArticles from "./components/MyArticles";
import AllArts from "./components/AllArts";
import ArtistProfile from "./components/ArtistProfile";
import AllArtists from "./components/AllArtists";
import Purchase from "./components/views/purshase/Purchase";
import ListArtWork from "./components/ListArtWork";
import AboutUs from "./components/AboutUs";
import BidNotifications from "./components/views/bidding/BidNotifications";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentCancelled from "./components/PaymentCancelled";
import Signup from "./components/views/auth/Signup";
import ViewExhibitionItems from "./pages/Artist/Exhibition/viewExhibitionItems";
import ArtworkDetails from "./pages/Artist/Exhibition/IndividualImageDetail";
import ExhibitionArtworks from "./pages/Artist/Exhibition/clientViewExhibition/ExhibitionArtworks";
import ExhibitionsGrid from "./pages/Artist/Exhibition/clientViewExhibition/ExhibitionsGrid";
import ClientHomePage from "./pages/Client/ClientHomepage/ClientHomepage";
import ExhibitionParticipantsPage from "./pages/admin/ManageExhibitions/[id]/participants";
import Settings from "./pages/admin/Settings/Settings";

// Set up all routes here
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOtp />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/role-selection",
    element: <RoleSelection />,
  },

  // Admin - Sarmad

  // Smart Entry 
  { path: "/admin", element: <AdminRedirect /> },

  // Public Rout
  { path: "/admin/login", element: <AdminLogin /> },

  // Admin Protected Routes
  {
    path: "/admin/dashboard",
    element: (
      <AdminProtectedRoutes>
        <Dashboard />
      </AdminProtectedRoutes>
    ),
  },
  {
    path: "/admin/manage-users",
    element: (
      <AdminProtectedRoutes>
        <ManageUsers />
      </AdminProtectedRoutes>
    ),
  },
  {
    path: "/admin/manage-jobs",
    element: (
      <AdminProtectedRoutes>
        <ManageJobs />
      </AdminProtectedRoutes>
    ),
  },
  {
    path: "/admin/manage-bids",
    element: (
      <AdminProtectedRoutes>
        <ManageBids />
      </AdminProtectedRoutes>
    ),
  },
  {
    path: "/admin/manage-articles",
    element: (
      <AdminProtectedRoutes>
        <ManageArticles />
      </AdminProtectedRoutes>
    ),
  },
  {
    path: "/admin/manage-competitions",
    element: (
      <AdminProtectedRoutes>
        <ManageCompetitions />
      </AdminProtectedRoutes>
    ),
  },
  {
    path: "/admin/manage-competitions/:id/participants",
    element: (
      <AdminProtectedRoutes>
        <ExhibitionParticipantsPage />
      </AdminProtectedRoutes>
    ),
  },
  {
    path: "/admin/manage-news-updates",
    element: (
      <AdminProtectedRoutes>
        <ManageNews />
      </AdminProtectedRoutes>
    ),
  },
  {
    path: "/admin/manage-exhibitions",
    element: (
      <AdminProtectedRoutes>
        <ManageExhibitions />
      </AdminProtectedRoutes>
    ),
  },
  {
    path: "/admin/manage-exhibitions/:id/participants",
    element: (
      <AdminProtectedRoutes>
        <ExhibitionParticipantsPage />
      </AdminProtectedRoutes>
    ),
  },
  
  {
    path: "/admin/settings",
    element: (
      <AdminProtectedRoutes>
        <Settings />
      </AdminProtectedRoutes>
    ),
  },

  {
    path: "/postjob",
    element: <PostJob />,
  },
  {
    path: "/title",
    element: <Title />,
  },
  {
    path: "/job-form",
    element: <JobForm />,
  },
  {
    path: "/search-job",
    element: <SearchJob />,
  },
  {
    path: "/client-profile",
    element: <CreateProfile />,
  },
  {
    path: "/client-dashboard",
    element: <ClientDashboard />,
  },
  {
    path: "/client/profile",
    element: <ClientProfileCard />,
  },
  {
    path: "/exhibition",
    element: <ExhibitionsList />,
  },
  {
    path: "/participate",
    element: <ParticipateInExhibition />,
  },
  {
    path: "/viewExhibition",
    element: <ParticipateInExhibition />,
  },
  {
    path: "/exhibition-detail",
    element: <ViewExhibitionItems />,
  },
  {
    path: "/artwork/:id",
    element: <ArtworkDetails />,
  },
  {
    path: "/clienthomepage",
    element: <ClientHomePage />,
  },
  {
    path: "/exhibition-artworks/:title",
    element: <ExhibitionArtworks />,
  },
  {
    path: "/client-view-exhibition",
    element: <ExhibitionsGrid/>,
  },
  {
    path: "/dashboard",
    element: <LandingPage />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <Profile /> },
          { path: "showProfile", element: <ShowProfile /> },
          { path: "editArtistPortfolio", element: <EditArtistPortfolio /> },
          { path: "browse", element: <Browse /> },
          { path: "about", element: <About /> },
          { path: "contact", element: <Contact /> },
          { path: "artworkForm", element: <ArtworkForm /> },
          { path: "winningbidsection", element: <WinningBidSection /> },
          { path: "bidding", element: <Bidding /> },
          { path: "categories", element: <Categories /> },
          { path: "create-article", element: <CreateArticle /> },
          { path: "purchase", element: <Purchase /> },
          { path: "listmyartwork", element: <ListArtWork /> },
        ],
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/BidHistory",
    element: <BidNotifications />,
  },
  {
    path: "/payment-success",
    element: <PaymentSuccess />,
  },
  {
    path: "/payment-cancelled",
    element: <PaymentCancelled />,
  },
  {
    path: "/ArtArticlePage/:id",
    element: <ArtArticlePage />,
  },
  {
    path: "/all-art-stories",
    element: <AllStories />,
  },
  {
    path: "/MyArticles",
    element: <MyArticles />,
  },
  {
    path: "/AllArts",
    element: <AllArts />,
  },
  {
    path: "/artist-profile/:id",
    element: <ArtistProfile />,
  },
  {
    path: "/artworkDetail",
    element: <ArtworkDetail />,
  },
  {
    path: "/all-artists",
    element: <AllArtists />,
  },
  {
    path: "/about",
    element: <AboutUs />,
  },
  {
    path: "/artist-homepage",
    element: <ArtistHome />,
  },
 
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
