import React, { ReactNode } from "react";

interface CardProps {
  texts?: string[];
  ChartComponent?: ReactNode;
  icons?: ReactNode[];
}

const Card: React.FC<CardProps> = ({ texts = [], ChartComponent, icons = [] }) => {
  return (
    <div className="
      flex flex-row-reverse items-center bg-white shadow-md rounded-lg p-4 
      gap-3 flex-1 min-w-[250px] max-w-sm
    ">

      {ChartComponent && (
        <div className="flex-shrink-0 w-20 h-20">
          {ChartComponent}
        </div>
      )}


      <div className="flex flex-col flex-1 text-right gap-2">
   
        {texts.map((text, index) => (
          <p key={index} className="text-gray-700 mb-1">{text}</p>
        ))}
      </div>
           {icons.length > 0 && (
          <div className="flex justify-end gap-2 ">
            {icons.map((icon, index) => (
              <React.Fragment key={index}>{icon}</React.Fragment>
            ))}
          </div>
        )}
    </div>
  );
};

export default Card;
