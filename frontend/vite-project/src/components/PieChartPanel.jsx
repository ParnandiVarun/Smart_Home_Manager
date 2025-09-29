const React = require("react");
const { PieChart, Pie, Cell, Tooltip } = require("recharts");

function PieChartPanel({ data }) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold mb-2">Device Distribution</h2>
      <PieChart width={350} height={250}>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}

module.exports = PieChartPanel;
