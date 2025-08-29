import { ReactNode } from "react";

interface HeadingProps {
  title: string;
  icon?: ReactNode; // optional in case you don’t always want an icon
}

const Heading = ({ title, icon }: HeadingProps) => {
  return (
    <div className="flex items-center w-fit mx-auto gap-3 px-4 rounded-md border bg-gradient-to-br from-gray-700/60 to-gray-900/60 backdrop-blur-md shadow-lg">
      {/* icon if provided */}
      <span className="text-md py-[5px] bg-gradient-to-br from-indigo-600 to-green-600 bg-clip-text text-transparent font-bold ">{title}</span>
      {icon && <span className="">{icon}</span>}
    </div>
  );
};

export default Heading;
