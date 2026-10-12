import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMe } from "../services/authService";

export function useMe() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [me, setMe] = useState(null);

  useEffect(() => {
    if (!token) {
      setMe(null);
      return;
    }
    getMe(token)
      .then(setMe)
      .catch((err) => {
        if (err.status === 401) {
          logout();
          navigate("/login");
        }
      });
  }, [token]);

  return me; // null mientras carga o si no hay sesión
}
