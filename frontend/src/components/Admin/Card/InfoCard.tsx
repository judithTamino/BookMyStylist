import type { FunctionComponent, ReactNode } from "react";

interface InfoCardProps {
  icon?: ReactNode;
  label: string;
  value:number;
  color:string;
}
 
const InfoCard: FunctionComponent<InfoCardProps> = (props) => {
  const {icon, label, value, color} = props;
  return ( 
    <div className="flex items-center gap-3">
      <div className={`w-2 h-3 md:h-5 ${color} rounded-full`}></div>

      <p className="text-xs md:text-sm text-slate-700 dark:text-slate-400">
        <span className="text-sm md:text-[15px] text-black dark:text-white font-semibold">{value} </span>
        {label}
      </p>
    </div>
   );
}
 
export default InfoCard;