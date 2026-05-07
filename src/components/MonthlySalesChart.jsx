import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

export default function MonthlySalesChart({ data }) {
  return (
    <div className="card">
      <h3 className="text-subheading mb-6">Monthly Sales Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8D5C4" />
          <XAxis dataKey="month" stroke="#8B6F47" />
          <YAxis stroke="#8B6F47" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFCF7',
              border: '2px solid #D2B48C',
              borderRadius: '8px'
            }}
            formatter={(value) => [`₹${value}`, 'Sales']}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#7BA428"
            strokeWidth={2}
            dot={{ fill: '#7BA428', r: 4 }}
            activeDot={{ r: 6 }}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
