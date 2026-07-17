// ToggleSwitch.jsx — small reusable on/off switch used in Preferences.
import { COLORS } from "../../constants/theme";

function ToggleSwitch({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-semibold" style={{ color: COLORS.TEXT_PRIMARY }}>
          {label}
        </p>
        {description && (
          <p className="text-xs mt-0.5" style={{ color: COLORS.TEXT_SECONDARY }}>
            {description}
          </p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className="relative shrink-0 w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          background: checked ? COLORS.ACCENT : COLORS.BORDER,
          ["--tw-ring-color"]: COLORS.ACCENT,
        }}
      >
        <span
          className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200"
          style={{ transform: checked ? "translateX(20px)" : "translateX(0)" }}
        />
      </button>
    </div>
  );
}

export default ToggleSwitch;
