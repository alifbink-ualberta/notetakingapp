type ButtonProps = {
  label?: string; // optional if you want icon-only buttons too
  variant?: "default" | "cancel" | "special";
  handleClick: () => void;
  children?: React.ReactNode; // this enables <Button>...</Button>
};

function Button({ label, variant, handleClick, children }: ButtonProps) {
  return (
    <button
      className={variant === "cancel"
        ? "cancel"
        : variant === "special"
        ? "special"
        : "default"}
      onClick={handleClick}
    >
      {children}
      {label && <span className="btn-label">{label}</span>}
    </button>
  );
}

export default Button;