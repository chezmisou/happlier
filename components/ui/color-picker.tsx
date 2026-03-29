'use client';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  presets?: string[];
}

const DEFAULT_PRESETS = [
  '#7c3aed', '#6d28d9', '#ec4899', '#ef4444',
  '#f97316', '#eab308', '#22c55e', '#06b6d4',
  '#3b82f6', '#0f172a', '#64748b', '#ffffff',
];

export function ColorPicker({
  label,
  value,
  onChange,
  presets = DEFAULT_PRESETS,
}: ColorPickerProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-xl border border-gray-200 shadow-sm flex-shrink-0 cursor-pointer relative overflow-hidden"
          style={{ backgroundColor: value }}
        >
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            aria-label={label}
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {presets.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => onChange(color)}
              className={`w-7 h-7 rounded-lg transition-all duration-150 border-2 hover:scale-110 active:scale-95 ${
                value === color
                  ? 'border-violet-600 ring-2 ring-violet-600/30 scale-110'
                  : 'border-transparent hover:border-gray-200'
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Couleur ${color}`}
            />
          ))}
        </div>
      </div>
      <p className="mt-1.5 text-xs text-gray-500 font-mono">{value}</p>
    </div>
  );
}
