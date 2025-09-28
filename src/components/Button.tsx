type ButtonProps = {
  label: string;
  variant?: "default" | "cancel"; // optional
  handleClick: () => void;
};

function Button({label, variant, handleClick}: ButtonProps) {
    return <button className={variant === "cancel"? "cancel" : "default"} onClick={handleClick} >{label}</button>
}

export default Button