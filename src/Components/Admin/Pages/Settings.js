import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../Shared/hooks/http-hooks";
import "./settings.css";

const Settings = () => {
  const { sendRequest } = useHttpClient();
  const [settings, setSettings] = useState({
    payWithPointsEnabled: true,
    pointMultiplier: 1,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/points/settings",
          "GET"
        );
        setSettings(responseData);
      } catch (error) {
        console.error("Failed to fetch settings", error);
      }
    };

    fetchSettings();
  }, [sendRequest]);

  const handleToggleSettings = (e) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      payWithPointsEnabled: e.target.checked,
    }));
  };

  const handleMultiplierChange = (e) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      pointMultiplier: e.target.value,
    }));
  };

  const handleSaveSettings = async () => {
    try {
      await sendRequest(
        "http://localhost:5000/api/points/settings",
        "PATCH",
        JSON.stringify(settings),
        {
          "Content-Type": "application/json",
        }
      );
      alert("Settings updated successfully!");
    } catch (error) {
      console.error("Failed to update settings", error);
    }
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Admin Settings</h1>
      <div className="settings-card">
        <div className="settings-item">
          <label className="settings-label">Pay with Points</label>
          <div className="toggle-switch">
            <input
              type="checkbox"
              className="toggle-checkbox"
              id="togglePoints"
              checked={settings.payWithPointsEnabled}
              onChange={handleToggleSettings}
            />
            <label className="toggle-label" htmlFor="togglePoints"></label>
          </div>
        </div>

        <div className="settings-item">
          <label className="settings-label">Point Multiplier</label>
          <input
            type="number"
            className="settings-input"
            value={settings.pointMultiplier}
            onChange={handleMultiplierChange}
            min={1}
          />
        </div>

        <button className="settings-button" onClick={handleSaveSettings}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
