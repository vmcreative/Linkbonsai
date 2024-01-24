// frontend/src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes

import VisitorView from './components/VisitorView/VisitorView';
import EditorView from './components/EditorView/EditorView';

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the editor view (add authentication logic) */}
        <Route path="/editor/:userHandle" element={<EditorView />} />

        {/* Route for the visitor view */}
        <Route path="/:userHandle" element={<VisitorView />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
