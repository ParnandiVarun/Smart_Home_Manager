const React = require("react");
const { useState, useEffect } = require("react");
const API = require("../api/axios");
const DeviceCard = require("../components/DeviceCard");
const AlertsPanel = require("../components/AlertsPanel");
const PieChartPanel = require("../components/PieChartPanel");
const EnergyChartPanel = require("../components/EnergyChartPanel");

function Dashboard() {
  const [overview, setOverview] = useState(null);
  const [energy, setEnergy] = useState([]);
  const householdId = "YOUR_HOUSEHOLD_ID";

  const fetchData = async () => {
    const res1 = await API.get(`/dashboard/${householdId}/overview`);
    setOverview(res1.data);

    const res2 = await API.get(`/energy/${householdId}`);
    setEnergy(res2.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!overview) return <p>Loading...</p>;

  const pieData = overview.rooms.flatMap((room) =>
    room.devices.map((d) => ({ name: d.name, value: 1 }))
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {overview.household} Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PieChartPanel data={pieData} />
        <EnergyChartPanel energy={energy} />
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {overview.rooms.flatMap((room) =>
          room.devices.map((device) => (
            <DeviceCard key={device._id} device={device} refresh={fetchData} />
          ))
        )}
      </div>
      <div className="mt-8">
        <AlertsPanel />
      </div>
    </div>
  );
}

module.exports = Dashboard;
