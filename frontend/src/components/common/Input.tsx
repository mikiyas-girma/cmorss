// Input Box Component

type InputType = {
  value: string;
  placeholder: string;
  textColor?: string;
  bgColor?: string;
  onChange: (text: string) => void;
  otherProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

/**
 * Input Field Component
 * With placeholder props, value and onChange
 * returns JSX Component
 */

const Input: React.FC<InputType> = ({
  value,
  placeholder,
  bgColor,
  textColor,
  onChange,
  otherProps,
}) => {
  return (
    <div className="w-[90%] mx-auto max-w-[400px]">
      <input
        {...otherProps}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`${bgColor ? bgColor : 'bg-slate-50'} ${
          textColor ? textColor : 'text-slate-700'
        } rounded-2xl p-3 mb-5 text-center font-semibold w-full outline-none md:text-lg focus:shadow-md shadow-slate-100 outline outline-2 outline-slate-200`}
      />
    </div>
  );
};

export default Input;
