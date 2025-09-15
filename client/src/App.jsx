import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AllRooms from "./pages/AllRooms";
import RoomDetails from "./pages/RoomDetails";
import MyBookings from "./pages/MyBookings";
import HotelReg from "./components/HotelReg";
import Layout from "./pages/hotelOwner/Layout";
import Dashboard from "./pages/hotelOwner/Dashboard";
import AddRoom from "./pages/hotelOwner/AddRoom";
import ListRoom from "./pages/hotelOwner/ListRoom";
import SignUpPage from "./pages/ClerkSignUp.jsx";
import SignInPage from "./pages/ClerkSignIn.jsx";
import SelectRolePage from "./pages/SelectRolePage.jsx";
import HotelOwnerRoute from "./pages/hotelOwner/HotelOwnerRoute.jsx";
import Unauthorized from "./pages/Unauthorized";

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <div>
      {!isOwnerPath && <Navbar />}
      {/* <HotelReg/> */}
      {/* {false && <HotelReg/>} */}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />

          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/select-role" element={<SelectRolePage />} />

          <Route
            path="/owner"
            element={
              <HotelOwnerRoute>
                <Layout />
              </HotelOwnerRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="list-room" element={<ListRoom />} />
          </Route>

          <Route
            path="/hotel-reg"
            element={
              <HotelOwnerRoute>
                <HotelReg />
              </HotelOwnerRoute>
            }
          />

          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
