function Button({label, handleClick}: {label: string, handleClick: () => void}) {
    return <button onClick={handleClick} >{label}</button>
}

export default Button