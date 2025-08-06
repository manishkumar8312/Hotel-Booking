import React from 'react'

function Unauthorized() {
  return (
    <div className="flex items-center justify-center h-[80vh] bg-gray-100">
      <div className="text-center px-6 py-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-700 text-lg">
          You must be a <span className="font-medium">Hotel Owner</span> to access this page and register hotels.
        </p>
      </div>
    </div>
  )
}

export default Unauthorized;