import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import EventDetails from './pages/EventDetails';
import Attendees from './pages/Attendees'; // <-- General Attendees Page
import EventAttendees from './pages/EventAttendees'; // <-- Specific Event Attendees Page
import Analytics from './pages/Analytics';

function App() {
    return (
        <>
            <Navbar />
            <main className="pt-16"> {/* Assuming navbar height is h-16 (4rem) */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Protected Routes */}
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/attendees" element={<PrivateRoute><Attendees /></PrivateRoute>} />
                    <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
                    <Route path="/event/:id" element={<PrivateRoute><EventDetails /></PrivateRoute>} />
                    <Route path="/event/:id/attendees" element={<PrivateRoute><EventAttendees /></PrivateRoute>} />
                </Routes>
            </main>
        </>
    );
}

export default App;