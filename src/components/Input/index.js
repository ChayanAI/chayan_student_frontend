import Input from './Input';

const Text = ({ name, col, type }) => {
  return <Input name={name} col={col} type={type} variant="input" />;
};

const Select = ({ name, col, options }) => {
  return <Input name={name} col={col} options={options} variant="select" />;
};

const Block = ({ name, col, rows }) => {
  return <Input name={name} col={` col-span-full ${col}`} rows={rows} variant="textarea" />;
};

export { Text, Select, Block };
