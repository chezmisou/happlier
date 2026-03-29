'use client';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  presets?: string[];
}

const DEFAULT_PRESETS = [
  '#6366F1', '#8B5CF6', '#EC4899', '#EF4444',
  '#F59E0B', '#10B981', '#06B6D4', '#3B82F6',
];

export function ColorPicker({ label, value, onChange, presets = DEFAULT_PRESETS }: ColorPickerProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1.5 text-[var(--foreground)]">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5 flex-wrap">
          {presets.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => onChange(color)}
              className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                value === color ? 'border-[var(--foreground)] scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Couleur ${color}`}
            />
          ))}
        </div>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer border-0"
          aria-label={label}
        />
      </div>
    </div>
  );
}
