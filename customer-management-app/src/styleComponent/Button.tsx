import "./Button.css";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

export default function Button({ variant = "primary", ...props }: Props) {
  return <button className={`btn ${variant}`} {...props} />;
}
