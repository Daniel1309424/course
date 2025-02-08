import StatisticLine from './StatisticLine';

const Statistics = (props) => {
  if (props.all === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.all} />
        <StatisticLine text="average" value={props.average.toFixed(2)} />
        <StatisticLine text="positive" value={`${props.positive.toFixed(2)} %`} />
      </tbody>
    </table>
  );
};

export default Statistics;
