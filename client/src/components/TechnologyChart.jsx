import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TechnologyChart = ({ data, color = '#3b82f6' }) => {
    if (!data || !data.history) return null;

    const chartData = data.history.map((h, i) => ({
        name: i,
        score: h.score,
        time: new Date(h.timestamp).toLocaleTimeString()
    }));

    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="time" hide />
                    <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="score"
                        stroke={color}
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TechnologyChart;
