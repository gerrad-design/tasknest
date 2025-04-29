import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

function Auth() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div>
      {isRegister ? (
        <Register toggleForm={() => setIsRegister(false)} />
      ) : (
        <Login toggleForm={() => setIsRegister(true)} />
      )}
    </div>
  );
}

export default Auth;
