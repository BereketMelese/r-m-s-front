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
      alert("Setting updated successfully!");
    } catch (error) {
      console.error("Failed to update settinfs", error);
    }
  };
  return (
    <div className="admin-settings-page">
      <h2>Admin Settings</h2>
      <div className="settings-item">
        <label>
          <input
            type="checkbox"
            checked={settings.payWithPointsEnabled}
            onChange={handleToggleSettings}
          />
        </label>
        <label>
          Point Multiplier:
          <input
            type="number"
            value={settings.pointMultiplier}
            onChange={handleMultiplierChange}
            min={1}
          />
        </label>
      </div>
      <button onClick={handleSaveSettings}>Save Setting</button>
    </div>
  );
};

export default Settings;
