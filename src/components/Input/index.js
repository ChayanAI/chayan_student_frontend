import Input from './Input';

const Text = ({value,disp, setValue, setState, name, col, type ,step, list, index}) => {
  return <Input value={value} disp={disp} setValue={setValue} list={list} index={index} setstate={setState} step={step} name={name} col={col} type={type} variant="input" />;
};

const Select = ({value, setValue, disp, setState, name, col, options, list ,index}) => {
  return <Input value={value} setValue={setValue} setstate={setState} list={list} index={index} disp={disp} name={name} col={col} options={options} variant="select" />;
};

const Block = ({value,disp, setValue, setState, name, col, rows, list , index}) => {
  return <Input value={value} disp={disp} setValue={setValue} list={list} index={index} setstate={setState} name={name} col={` col-span-full ${col}`} rows={rows} variant="textarea" />;
};

export { Text, Select, Block };
