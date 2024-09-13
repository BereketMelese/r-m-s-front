import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "./Dashboard.module.css";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Data for the line chart
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales",
        data: [1200, 1900, 3000, 5000, 4500, 6000, 7000],
        fill: false,
        backgroundColor: "#3498db",
        borderColor: "#3498db",
        tension: 0.1,
      },
    ],
  };

  // Options for the line chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: $${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Sales ($)",
        },
      },
    },
  };

  return (
    <div className={styles.wrapper}>
      <main className={styles.content}>
        <div className={styles.pageTitle}>
          <h1>Dashboard</h1>
          <nav className={styles.breadcrumb}>
            <a href="/admin">Admin</a> &gt; Dashboard
          </nav>
        </div>

        <div className={styles.widgets}>
          <div className={styles.widget}>
            <i className="fa fa-wallet"></i>
            <div className={styles.widgetContent}>
              <h3>$58,947</h3>
              <p>Total Revenue</p>
            </div>
          </div>
          <div className={styles.widget}>
            <i className="fa fa-basket"></i>
            <div className={styles.widgetContent}>
              <h3>1,845</h3>
              <p>Orders</p>
            </div>
          </div>
          <div className={styles.widget}>
            <i className="fa fa-store"></i>
            <div className={styles.widgetContent}>
              <h3>825</h3>
              <p>Stores</p>
            </div>
          </div>
          <div className={styles.widget}>
            <i className="fa fa-users"></i>
            <div className={styles.widgetContent}>
              <h3>2,430</h3>
              <p>Sellers</p>
            </div>
          </div>
        </div>

        <div className={styles.salesAnalytics}>
          <h2>Sales Analytics</h2>
          <div className={styles.salesStats}>
            <div className={styles.stat}>
              <p>Current Week</p>
              <h3>$58,254</h3>
            </div>
            <div className={styles.stat}>
              <p>Previous Week</p>
              <h3>$69,524</h3>
            </div>
            <div className={styles.stat}>
              <p>Targets</p>
              <h3>$95,025</h3>
            </div>
          </div>
          <div className={styles.chart}>
            <Line data={data} options={options} />
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Your Company</p>
      </footer>
    </div>
  );
};

export default Dashboard;
