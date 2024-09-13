import React, { useContext, useState } from "react";
import { useHttpClient } from "../../Shared/hooks/http-hooks";
import { AuthContext } from "../../Shared/Components/Context/Auth-context";
import "./Table.css";

const CreateTable = () => {
  const [tableName, setTableName] = useState("");
  const [qrCodeImage, setQrCodeImage] = useState(null);
  const { isLoading, sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/table",
        "POST",
        JSON.stringify({ name: tableName }),
        {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        }
      );

      setQrCodeImage(responseData.qrCode);
      setTableName("");
    } catch (error) {
      console.log(error);
      alert("Error creating table");
    }
  };

  return (
    <div className="create-table-page">
      <div className="form-container">
        <h2>Create a New Table</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="tableName">Table Name:</label>
            <input
              type="text"
              id="tableName"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              placeholder="Enter table name"
              required
            />
          </div>
          <button type="submit" className="submit-btn" disabled={!tableName}>
            {isLoading ? "Creating..." : "Create Table"}
          </button>
        </form>
        {qrCodeImage && (
          <div className="qr-code">
            <h3>QR Code for the Table</h3>
            <img src={qrCodeImage} alt="QR Code" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTable;
