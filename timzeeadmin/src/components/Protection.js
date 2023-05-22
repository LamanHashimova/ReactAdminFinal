import {Navigate, Outlet } from 'react-router-dom';


function ProtectedRoute() {
    
    let currentToken = localStorage.getItem('token');
    let currentUser;
    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
      };
    let userdet = parseJwt(currentToken)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];  
    if(userdet === "SuperAdmin" || userdet === "Admin"){
      currentUser = currentToken;
    }
    return currentUser ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute;