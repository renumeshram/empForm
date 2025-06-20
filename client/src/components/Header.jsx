import React from 'react';

const Header = ({ 
  appName = "NMDC Employee Management System", 
  userRole = null, 
  userName = null, 
  onLogout = null,
  showUserInfo = true 
}) => {
  return (
    <header className="bg-gray-900 shadow-md border-b-2 border-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* App Name/Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{appName}</h1>
              <p className="text-sm text-gray-600">Management Portal</p>
            </div>
          </div>

          {/* User Info and Actions */}
          {/* {showUserInfo && (
            <div className="flex items-center space-x-4">
              {userName && (
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{userName}</p>
                  {userRole && (
                    <p className="text-xs text-gray-600 capitalize">{userRole}</p>
                  )}
                </div>
              )}
              
              {userRole && (
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  userRole === 'admin' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {userRole.toUpperCase()}
                </div>
              )}

              {onLogout && (
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              )}
            </div>
          )} */}
        </div>
      </div>
    </header>
  );
};

export default Header;