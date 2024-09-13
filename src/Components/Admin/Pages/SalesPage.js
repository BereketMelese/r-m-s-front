import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../Shared/hooks/http-hooks";
import Chart from "react-apexcharts";
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

  // Safe formatter function for the pie chart
  const safeFormatter = (val) => {
    console.log("Formatter value:", val);

    if (typeof val === "number" && !isNaN(val)) {
      return `$${val.toFixed(2)}`;
    }
    return `$${val}`;
  };

  // Pie chart options for daily sales
  const dailySalesPieChartOptions = {
    chart: {
      type: "donut",
      height: 350,
    },
    labels: ["Revenue", "Remaining"],
    legend: false,
    colors: ["#727cf5", "#e9ecef"],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "32px",
              fontWeight: 600,
              color: "#333",
            },
            value: {
              show: true,
              fontSize: "24px",
              fontWeight: 400,
              color: "#333",
              formatter: safeFormatter,
            },
          },
        },
      },
    },
  };

  const dailySalesPieChartSeries = dailySales
    ? [
        dailySales.totalRevenue || 0,
        (dailySales.totalRevenue % 10) * 10 - dailySales.totalRevenue,
      ] // Ensure proper default value
    : [0, 1];

  // Pie chart options for monthly sales
  const monthlySalesPieChartOptions = {
    chart: {
      type: "donut",
      height: 350,
    },
    labels: ["Revenue", "Remaining"],
    legend: false,
    colors: ["#0acf97", "#e9ecef"],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "80%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "32px",
              fontWeight: 600,
              color: "#333",
            },
            value: {
              show: true,
              fontSize: "24px",
              fontWeight: 400,
              color: "#333",
              formatter: safeFormatter,
            },
          },
        },
      },
    },
  };

  const monthlySalesPieChartSeries = monthlySales
    ? [
        monthlySales.totalRevenue || 0,
        (monthlySales.totalRevenue % 10) * 10 - monthlySales.totalRevenue,
      ]
    : [0, 1];

  return (
    <div className="sales-page">
      <h1>Sales Overview</h1>

      {/* Daily Sales Section */}
      <div className="sales-section">
        <h2>Daily Sales</h2>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        {isLoading && <p>Loading...</p>}
        {dailySales ? (
          <div className="chart-container">
            <div className="card">
              <div className="card-header">Daily Sales Revenue</div>
              <div className="card-body">
                <Chart
                  options={dailySalesPieChartOptions}
                  series={dailySalesPieChartSeries}
                  type="donut"
                  height={350}
                />
                <p className="revenue-description">
                  Total Revenue for {selectedDate}:{" "}
                  {safeFormatter(dailySales.totalRevenue)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          !isLoading &&
          selectedDate && <p>No sales data available for this date.</p>
        )}
      </div>

      {/* Monthly Sales Section */}
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
            <div className="chart-container">
              <div className="card">
                <div className="card-header">Monthly Sales Revenue</div>
                <div className="card-body">
                  <Chart
                    options={monthlySalesPieChartOptions}
                    series={monthlySalesPieChartSeries}
                    type="donut"
                    height={350}
                  />
                  <p className="revenue-description">
                    Total Revenue for {selectedMonth}/{selectedYear}:{" "}
                    {safeFormatter(monthlySales.totalRevenue)}
                  </p>
                </div>
              </div>
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
