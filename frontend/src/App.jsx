import React from 'react';
// IMPORT BrowserRouter
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import EventDetails from './pages/EventDetails';
import Attendees from './pages/Attendees';
import EventAttendees from './pages/EventAttendees';
import Analytics from './pages/Analytics';

function App() {
    return (
        // WRAP EVERYTHING IN BrowserRouter AND ADD THE BASENAME PROP
        <BrowserRouter basename="/eventapp">
            <Navbar />
            <main className="pt-16">
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
        </BrowserRouter>
    );
}

export default App;