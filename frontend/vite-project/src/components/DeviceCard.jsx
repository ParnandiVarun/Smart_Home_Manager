import API from "../api/axios";

export default function DeviceCard({ device, refresh }) {
  const toggleDevice = async () => {
    const newStatus = device.status === "On" ? "Off" : "On";
    await API.patch(`/devices/${device._id}/status`, { status: newStatus });
    refresh();
  };

  return (
    <div className="p-4 bg-white rounded shadow hover:shadow-lg">
      <h2 className="font-bold">{device.name}</h2>
      <p>
        Status:{" "}
        <span
          className={
            device.status === "On" ? "text-green-500" : "text-gray-500"
          }
        >
          {device.status}
        </span>
      </p>
      <button
        onClick={toggleDevice}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {device.status === "On" ? "Turn Off" : "Turn On"}
      </button>
    </div>
  );
}
