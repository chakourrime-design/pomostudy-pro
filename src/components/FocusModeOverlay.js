import { jsx as _jsx } from "react/jsx-runtime";
export function FocusModeOverlay({ children }) {
    return (_jsx("div", { className: "min-h-screen w-full bg-[#050505] selection:bg-red-500/30", children: children }));
}
