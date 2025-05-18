import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 p-4 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Employee Management
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
            >
              {theme === 'light' ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
            <button
              onClick={openAddModal}
              className="bg-blue-500 dark:bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-200 shadow hover:shadow-md"
            >
              Add Employee
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-md shadow-sm animate-fade-in">
            {error}
          </div>
        )}

        {/* Employee Cards Section */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Employee Records
          </h2>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search employees..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Employee Cards */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 dark:border-blue-400"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentEmployees.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 dark:text-gray-400 text-lg">
                No employees found
              </div>
            ) : (
              currentEmployees.map((employee) => (
                <div
                  key={employee.id}
                  onClick={() => handleViewDetails(employee)}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg hover:scale-102 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
                      {employee.name || 'Unknown'}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        employee.status
                          ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                          : 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'
                      }`}
                    >
                      {employee.status ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <p>
                      <span className="font-medium">ID:</span> {employee.id || 'N/A'}
                    </p>
                    <p>
                      <span className="font-medium">Department:</span>{' '}
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          employee.department === 'Engineering'
                            ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                            : employee.department === 'HR'
                            ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
                            : employee.department === 'Marketing'
                            ? 'bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300'
                            : employee.department === 'Finance'
                            ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300'
                            : employee.department === 'Operations'
                            ? 'bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300'
                            : 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                        }`}
                      >
                        {employee.department || 'N/A'}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">Joining Date:</span>{' '}
                      {employee.joiningDate
                        ? new Date(employee.joiningDate).toLocaleDateString()
                        : 'N/A'}
                    </p>
                    <p>
                      <span className="font-medium">Salary:</span>{' '}
                      ${employee.salary ? employee.salary.toLocaleString() : 'N/A'}
                    </p>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleEdit(employee); }}
                      className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(employee.id); }}
                      className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 font-medium transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {indexOfFirstEmployee + 1} to{' '}
            {Math.min(indexOfLastEmployee, filteredEmployees.length)} of{' '}
            {filteredEmployees.length} entries
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`py-2 px-4 rounded-md transition-all duration-200 ${
                currentPage === 1
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Previous
            </button>
            <button className="py-2 px-4 bg-blue-500 dark:bg-blue-600 text-white rounded-md">
              {currentPage}
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === Math.ceil(filteredEmployees.length / employeesPerPage)}
              className={`py-2 px-4 rounded-md transition-all duration-200 ${
                currentPage === Math.ceil(filteredEmployees.length / employeesPerPage)
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit Employee */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md animate-scale-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {modalMode === 'add' ? 'Add New Employee' : 'Edit Employee'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Employee ID*
                </label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  placeholder="EMP123"
                  className={`w-full p-2 border ${
                    formErrors.id ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } rounded-md text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  required
                  disabled={modalMode === 'edit'}
                />
                {formErrors.id && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1">{formErrors.id}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Employee Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full name"
                  className={`w-full p-2 border ${
                    formErrors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } rounded-md text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  required
                />
                {formErrors.name && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1">{formErrors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Joining Date*
                </label>
                <input
                  type="date"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleInputChange}
                  className={`w-full p-2 border ${
                    formErrors.joiningDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } rounded-md text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  required
                />
                {formErrors.joiningDate && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1">{formErrors.joiningDate}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Salary (USD)*
                </label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  placeholder="50000"
                  min="0"
                  className={`w-full p-2 border ${
                    formErrors.salary ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } rounded-md text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  required
                />
                {formErrors.salary && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1">{formErrors.salary}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Department*
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={`w-full p-2 border ${
                    formErrors.department ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } rounded-md text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  required
                >
                  <option value="" disabled>
                    Select department
                  </option>
                  <option value="HR">HR</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                  <option value="Operations">Operations</option>
                  <option value="Sales">Sales</option>
                </select>
                {formErrors.department && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1">{formErrors.department}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="status"
                  checked={formData.status}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                />
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Active Employee
                </label>
              </div>
              <button
                type="submit"
                disabled={isLoading || Object.keys(formErrors).length > 0}
                className={`w-full py-2 px-4 rounded-md text-white font-medium transition-all duration-200 ${
                  isLoading || Object.keys(formErrors).length > 0
                    ? 'bg-blue-300 dark:bg-blue-500/50 cursor-not-allowed'
                    : 'bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 hover:shadow-md'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : modalMode === 'add' ? (
                  'Register Employee'
                ) : (
                  'Update Employee'
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Employee Details */}
      {isDetailsModalOpen && selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md animate-scale-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Employee Details
              </h2>
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-800 dark:text-gray-100">ID:</span>
                <span>{selectedEmployee.id || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-800 dark:text-gray-100">Name:</span>
                <span>{selectedEmployee.name || 'Unknown'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-800 dark:text-gray-100">Department:</span>
                <span
                  className={`inline-block px-2 py-1 text-xs rounded-full ${
                    selectedEmployee.department === 'Engineering'
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                      : selectedEmployee.department === 'HR'
                      ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
                      : selectedEmployee.department === 'Marketing'
                      ? 'bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300'
                      : selectedEmployee.department === 'Finance'
                      ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300'
                      : selectedEmployee.department === 'Operations'
                      ? 'bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300'
                      : 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                  }`}
                >
                  {selectedEmployee.department || 'N/A'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-800 dark:text-gray-100">Joining Date:</span>
                <span>
                  {selectedEmployee.joiningDate
                    ? new Date(selectedEmployee.joiningDate).toLocaleDateString()
                    : 'N/A'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-800 dark:text-gray-100">Salary:</span>
                <span>
                  ${selectedEmployee.salary ? selectedEmployee.salary.toLocaleString() : 'N/A'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-800 dark:text-gray-100">Status:</span>
                <span
                  className={`inline-block px-2 py-1 text-xs rounded-full ${
                    selectedEmployee.status
                      ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                      : 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'
                  }`}
                >
                  {selectedEmployee.status ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  setIsDetailsModalOpen(false);
                  handleEdit(selectedEmployee);
                }}
                className="flex-1 py-2 px-4 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="flex-1 py-2 px-4 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;