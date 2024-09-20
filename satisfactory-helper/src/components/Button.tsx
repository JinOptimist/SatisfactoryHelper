type ButtonProps = {} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button = ({ disabled, ...props }: ButtonProps) => (
  <button
    {...props}
    disabled={disabled}
    className={`py-2 px-4 rounded ${disabled ? 'bg-neutral-700' : 'bg-satisfactory hover:bg-amber-500'} ${
      props.className
    }`}
  />
);
