import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../Shared/hooks/http-hooks";
import "./SalesPage.css";

const SalesPage = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const [dailySales, setDailySales] = useState(null);
  const [monthlySales, setMonthlySales] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    if (selectedDate) {
      const fetchDailySales = async () => {
        try {
          const responseData = await sendRequest(
            `http://localhost:5000/api/sales/daily?date=${selectedDate}`
          );
          setDailySales(responseData);
        } catch (error) {
          console.log("Error fetching daily sales data:", error);
        }
      };
      fetchDailySales();
    }
  }, [selectedDate, sendRequest]);

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      const fetchMonthlySales = async () => {
        try {
          const responseData = await sendRequest(
            `http://localhost:5000/api/sales/monthly?month=${selectedMonth}&year=${selectedYear}`
          );
          setMonthlySales(responseData);
        } catch (error) {
          console.log("Error fetching monthly sales data:", error);
        }
      };
      fetchMonthlySales();
    }
  }, [selectedMonth, selectedYear, sendRequest]);

  return (
    <div className="sales-page">
      <h1>Sales Overview</h1>

      <div className="sales-section">
        <h2>Daily Sales</h2>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        {isLoading && <p>Loading...</p>}
        {dailySales ? (
          <div className="sales-data">
            <p>Total Revenue: ${dailySales.totalRevenue.toFixed(2)}</p>
            <p>Total Orders: {dailySales.totalOrders}</p>
          </div>
        ) : (
          !isLoading &&
          selectedDate && <p>No sales data available for this date.</p>
        )}
      </div>

      <div className="sales-section">
        <h2>Monthly Sales</h2>
        <div className="monthly-inputs">
          <input
            type="number"
            placeholder="Month (1-12)"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            min="1"
            max="12"
          />
          <input
            type="number"
            placeholder="Year (e.g 2024)"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            min="2024"
            max={new Date().getFullYear()}
          />
          {isLoading && <p>Loading...</p>}
          {monthlySales ? (
            <div className="sales-data">
              <p>Total Revenue: ${monthlySales.totalRevenue.toFixed(2)}</p>
              <p>Total Orders: {monthlySales.totalOrders}</p>
            </div>
          ) : (
            !isLoading &&
            selectedMonth &&
            selectedYear && <p>No sales data available for this month.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
