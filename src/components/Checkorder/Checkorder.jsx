import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Checkorder.css";
import OrderData from "../../app-data/OrderData";

function Checkorder() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  const filteredData = OrderData.filter((item) => {
    const matchesStatus = filterStatus === "All" ? true : item.status === filterStatus.toLowerCase();
    const matchesSearch = searchTerm === "" ? true : item.order_number.toString() === searchTerm;

    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = filteredData.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="checkorder-container">
      <h1 className="fs-3 font-bold mb-3">Order Management</h1>
      <div className="d-flex justify-content-between align-items-center my-3">
        <div>
          <span className="text-success me-3 font-bold">
            <i className="bi bi-check-circle-fill ml-1"></i> Successful
          </span>
          <span className="text-warning me-3 font-bold">
            <i className="bi bi-hourglass-split"></i> In progress
          </span>
          <span className="text-danger font-bold">
            <i className="bi bi-x-circle-fill"></i> Unsuccessful
          </span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <div className="input-group">
            <input
              type="text"
              className="form-control text-sm py-1"
              placeholder="Search order id"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); 
              }}
              aria-label="Search Order Number"
              aria-describedby="search-addon"
            />
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
          </div>
          <select
            className="form-select w-auto"
            style={{ minWidth: "150px" }}
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1); 
            }}
          >
            <option value="All">All Status</option>
            <option value="Success">Successful</option>
            <option value="Waiting">Waiting</option>
            <option value="Failed">Unsuccessful</option>
          </select>
        </div>
      </div>
      <table className="table table-hover table-bordered shadow-sm rounded table-striped">
        <thead className="table-dark">
          <tr>
            <th>เดือน/วัน/ปี</th>
            <th className="text-start">Order Id</th>
            <th className="text-start">Username</th>
            <th className="text-start">Provider</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.order_number}>
              <td className="align-middle text-center">{item.date}</td>
              <td className="align-middle text-sm">{item.order_number}</td>
              <td className="align-middle">{item.username}</td>
              <td className="align-middle">{item.provider}</td>
              <td className="align-middle text-center">
                {item.status === "success" ? (
                  <span className="me-3 bg-success text-white px-3 py-1 text-sm font-bold rounded-2xl">
                    Successful
                    <i className="bi bi-check-circle-fill ml-1 text-green-500"></i>
                  </span>
                ) : item.status === "waiting" ? (
                  <span className="me-3 bg-warning text-white px-3 py-1 text-sm font-bold rounded-2xl">
                    Waiting
                    <i className="bi bi-hourglass-split ml-1 text-yellow-100"></i>
                  </span>
                ) : item.status === "failed" ? (
                  <span className="me-3 bg-danger text-white px-3 py-1 text-sm font-bold rounded-2xl">
                    Unsuccessful{" "}
                    <i className="bi bi-x-circle-fill ml-1 text-red-200"></i>
                  </span>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center align-items-center mt-3">
        <button
          className="btn btn-primary mx-2"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          หน้าแรก
        </button>
        <button
          className="btn btn-secondary mx-2"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          ก่อนหน้า
        </button>
        <span className="page-info mx-3">
          {filteredData.length === 0 ? "0" : currentPage} / {totalPages}
        </span>
        <button
          className="btn btn-secondary mx-2"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          ถัดไป
        </button>
        <button
          className="btn btn-primary mx-2"
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          หน้าสุดท้าย
        </button>
      </div>
    </div>
  );
}

export default Checkorder;
