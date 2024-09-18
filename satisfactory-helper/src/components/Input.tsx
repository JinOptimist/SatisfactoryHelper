type InputFieldProps = {} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const InputField = ({ ...props }: InputFieldProps) => (
  <input {...props} className={`py-2 px-4 bg-neutral-300 rounded ${props.className}`} />
);
