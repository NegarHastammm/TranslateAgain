import React, { ReactNode } from "react";

interface CardProps {
  texts?: string[];
  ChartComponent?: ReactNode;
  icons?: ReactNode[];
  imageSrc?: string;
  bgClass?: string;    
  textClass?: string;   
}

const Card: React.FC<CardProps> = ({
  texts = [],
  ChartComponent,
  icons = [],
  imageSrc,
  bgClass = "bg-white",      
  textClass = "text-gray-700" 
}) => {
  return (
    <div
      className={`
        flex flex-row-reverse items-center shadow-md rounded-lg p-4 gap-3 
        flex-1 min-w-[250px] max-w-sm transition-all
        ${bgClass}   /* اینجا رنگ پس‌زمینه کنترل می‌شود */
      `}
    >

      {ChartComponent && (
        <div className="flex-shrink-0 w-20 h-20">
          {ChartComponent}
        </div>
      )}

      <div className={`flex flex-col flex-1 text-right gap-2 ${textClass}`}>
        {texts.map((text, index) => (
          <p key={index} className="mb-1">{text}</p>
        ))}
      </div>

      {imageSrc ? (
        <img
          src={imageSrc}
          alt="card"
          className="w-12 h-12 object-contain rounded"
        />
      ) : (
        icons.length > 0 && (
          <div className="flex justify-end gap-2">
            {icons.map((icon, index) => (
              <React.Fragment key={index}>{icon}</React.Fragment>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Card;
