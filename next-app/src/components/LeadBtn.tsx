import React from "react";

const LeadBtn = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <button className={`${className}`}>{children}</button>;
};

export default LeadBtn;
