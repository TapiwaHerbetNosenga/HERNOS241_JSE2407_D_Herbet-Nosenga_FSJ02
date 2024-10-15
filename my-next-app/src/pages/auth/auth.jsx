import React from 'react';
import SignupForm from '@/components/FirebaseAuth';

const AuthPage = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#f7fafc" }}>
      <div style={{ backgroundColor: "#fff", padding: "2rem", borderRadius: "0.5rem", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", width: "100%", maxWidth: "28rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: "700", marginBottom: "1.5rem", textAlign: "center", color: "#4a5568" }}>
          Sign In to Your Account
        </h1>
        <SignupForm />
      </div>
    </div>
  );
};

export default AuthPage;
