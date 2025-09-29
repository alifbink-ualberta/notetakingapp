type ButtonProps = {
  label: string;
  variant?: "default" | "cancel" | "special"; // optional
  handleClick: () => void;
};

function Button({label, variant, handleClick}: ButtonProps) {
    return <button
    className={variant === "cancel"? "cancel" : variant === "special" ? "special" : "default"} 
    onClick={handleClick} >{label}
    </button>
}

export default Button