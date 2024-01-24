import { cookie } from "@/utils/storage"

const ProtectedRoute = ({ children }) => {
  const { decodeJwt } = cookie;
  const userIsAuthenticated = decodeJwt();

  if (!userIsAuthenticated) {
    location.href = '/login';
    return <></>;
  }

  return children;
};
export default ProtectedRoute;