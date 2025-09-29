import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Routines() {
  const [routines, setRoutines] = useState([]);
  const householdId = "YOUR_HOUSEHOLD_ID"; // make dynamic later
  const [name, setName] = useState("");
  const [time, setTime] = useState("");

  const fetchRoutines = async () => {
    const res = await API.get(`/routines/${householdId}`);
    setRoutines(res.data);
  };

  const createRoutine = async () => {
    await API.post("/routines", {
      household: householdId,
      name,
      time,
      actions: [],
    });
    setName("");
    setTime("");
    fetchRoutines();
  };

  const triggerRoutine = async (id) => {
    await API.post(`/routines/${id}/trigger`);
    fetchRoutines();
  };

  useEffect(() => {
    fetchRoutines();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Routines</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-2">Create New Routine</h2>
        <input
          type="text"
          placeholder="Routine name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2 rounded"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-2 mr-2 rounded"
        />
        <button
          onClick={createRoutine}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <div className="grid gap-4">
        {routines.map((r) => (
          <div
            key={r._id}
            className="p-4 bg-white rounded shadow flex justify-between"
          >
            <div>
              <h3 className="font-bold">{r.name}</h3>
              <p>Time: {r.time}</p>
              <p>Actions: {r.actions.length} devices</p>
            </div>
            <button
              onClick={() => triggerRoutine(r._id)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Run Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
