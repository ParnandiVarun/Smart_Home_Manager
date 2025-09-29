const React = require("react");
const { useState, useEffect } = require("react");
const API = require("../api/axios");

function AlertsPanel() {
  const [alerts, setAlerts] = useState([]);

  const fetchAlerts = async () => {
    const res = await API.get("/alerts");
    setAlerts(res.data);
  };

  const resolveAlert = async (id) => {
    await API.patch(`/alerts/${id}/resolve`);
    fetchAlerts();
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="font-bold mb-2">Device Alerts</h2>
      {alerts.length === 0 && <p>No active alerts.</p>}
      <ul>
        {alerts.map((a) => (
          <li
            key={a._id}
            className="mb-2 p-2 border rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{a.device.name}</p>
              <p className="text-sm text-red-500">{a.message}</p>
            </div>
            <button
              onClick={() => resolveAlert(a._id)}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Resolve
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

module.exports = AlertsPanel;
