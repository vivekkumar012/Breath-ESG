type Props = {
  severity: string;
};

const SeverityBadge = ({ severity }: Props) => {
  const styles = {
    HIGH: "bg-red-100 text-red-700",
    MEDIUM: "bg-yellow-100 text-yellow-700",
    LOW: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm ${
        styles[severity as keyof typeof styles]
      }`}
    >
      {severity}
    </span>
  );
};

export default SeverityBadge;
