import Input from './Input';

const Text = ({ name, col, type, isRequired }) => {
  return <Input name={name} col={col} type={type} variant="input" isRequired={isRequired} />;
};

const Select = ({ name, col, options, isRequired }) => {
  return <Input name={name} col={col} options={options} variant="select" isRequired={isRequired} />;
};

const Block = ({ name, col, rows, isRequired }) => {
  return <Input name={name} col={` col-span-full ${col}`} rows={rows} variant="textarea" isRequired={isRequired} />;
};

export { Text, Select, Block };
