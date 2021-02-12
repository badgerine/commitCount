import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from 'recharts';

const BarGraph = (props) => {

  const data = props.data;
  const [xData, yData] = Object.entries(data[0]);

  return (
    <Paper>
      <BarChart width={300} height={350} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xData[0]} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={yData[0]} fill="#8884d8" />
      </BarChart>
    </Paper>
  );
}

export default BarGraph;