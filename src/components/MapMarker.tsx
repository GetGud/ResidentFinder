interface MapMarkerProps {
    x: number;
    y: number;
    price: string;
    isHovered?: boolean;
    onClick?: () => void;
}

export const MapMarker = ({ x, y, price, isHovered, onClick }: MapMarkerProps) => (
    <div
        className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10 hover:z-50 ${isHovered ? 'z-50 scale-110' : ''}`}
        style={{ left: `${x}%`, top: `${y}%` }}
        onClick={onClick}
    >
        <div className={`bg-[#134e4a] text-white text-xs font-bold px-2 py-1 rounded shadow-lg border-2 border-white group-hover:scale-110 group-hover:bg-gray-900 transition-all ${isHovered ? 'bg-gray-900 scale-110' : ''}`}>
            {price.split(' ')[0].replace('+', '')}
        </div>
        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white absolute left-1/2 -translate-x-1/2 bottom-[-6px] drop-shadow-sm"></div>
    </div>
);
