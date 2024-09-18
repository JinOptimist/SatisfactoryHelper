type ButtonProps = {} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button = ({ ...props }: ButtonProps) => (
  <button {...props} className={`py-2 px-4 bg-satisfactory hover:bg-amber-500 rounded ${props.className}`} />
);
