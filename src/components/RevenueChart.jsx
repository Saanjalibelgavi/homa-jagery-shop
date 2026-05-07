import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

export default function RevenueChart({ data }) {
  return (
    <div className="card">
      <h3 className="text-subheading mb-6">Monthly Revenue</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8D5C4" />
          <XAxis dataKey="month" stroke="#8B6F47" />
          <YAxis stroke="#8B6F47" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFCF7',
              border: '2px solid #D2B48C',
              borderRadius: '8px'
            }}
            formatter={(value) => [`₹${value}`, 'Revenue']}
          />
          <Bar
            dataKey="revenue"
            fill="#7BA428"
            radius={[8, 8, 0, 0]}
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
