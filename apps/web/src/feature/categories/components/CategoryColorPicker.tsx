type ColorSelection = {
  index: number;
  color: string;
};

type Props = {
  value: ColorSelection;
  onChange: (selection: ColorSelection) => void;
};

const COLORS = [
  '#378ADD', '#D85A30', '#1D9E75', '#BA7517', '#7F77DD',
  '#D4537E', '#E24B4A', '#639922', '#5F5E5A',
];

export function CategoryColorPicker({ value, onChange }: Props) {
  return (
    <div className="my-5">
      <p>Couleur</p>
      <div className="mt-3 flex flex-row gap-2 justify-between">
        {COLORS.map((color, index) => (
          <div
            key={color}
            onClick={() => onChange({ index, color })}
            className="cursor-pointer border-2 border-white w-12 h-12 rounded-full"
            style={{
              backgroundColor: color,
              boxShadow: value.color === color ? `0 0 0 2px ${color}` : 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
}