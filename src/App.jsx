import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Layout from './components/Layout';
import ContactListPage from './pages/ContactListPage';
import CreateContactPage from './pages/CreateContactPage';
import EditContactPage from './pages/EditContactPage'; // <-- Import the new page

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/contacts" />} />
            <Route path="/contacts" element={<ContactListPage />} />
            <Route path="/contacts/create" element={<CreateContactPage />} />
            {/* Add the new edit route */}
            <Route path="/contacts/edit/:contactId" element={<EditContactPage />} />
            <Route path="*" element={<Navigate to="/contacts" />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;