import React, { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function EmployeeCard({ id, name, role, photo, onDelete }) {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        {/* Front Side */}
        <div className="flip-card-front">
          <img src={photo || "https://via.placeholder.com/120"} alt={name} />
          <h3>{name}</h3>
        </div>
        {/* Back Side */}
        <div className="flip-card-back">
          <p>{role}</p>
          <button className="delete-btn" onClick={() => onDelete(id)}>
            ❌ Remove
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [photo, setPhoto] = useState("");
  const [search, setSearch] = useState("");

  const addEmployee = (e) => {
    e.preventDefault();
    if (!name || !role) {
      alert("Name and Role are required!");
      return;
    }
    setEmployees([
      ...employees,
      { id: uuidv4(), name, role, photo }
    ]);
    setName("");
    setRole("");
    setPhoto("");
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  // Search filter
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <nav>👩‍💻 Employee Directory</nav>
     
      <div className="counter">Total Employees: {employees.length}</div>
     
      {/* Search Bar */}
      <input
        type="text"
        placeholder="🔍 Search by name or role..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Add Employee Form */}
      <form onSubmit={addEmployee}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <input
          type="url"
          placeholder="Enter Image URL"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />
        <button type="submit">➕ Add Employee</button>
      </form>

      {/* Employee List */}
      <div className="employee-list">
        {filteredEmployees.map((emp) => (
          <EmployeeCard
            key={emp.id}
            id={emp.id}
            name={emp.name}
            role={emp.role}
            photo={emp.photo}
            onDelete={deleteEmployee}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
