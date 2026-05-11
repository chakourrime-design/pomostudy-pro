import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from 'framer-motion';
export function Button({ children, onClick, variant = 'primary', disabled = false, size = 'md' }) {
    const bgColor = {
        primary: '#EF4444',
        secondary: 'rgba(255,255,255,0.1)',
        ghost: 'transparent',
        danger: '#7F1D1D',
    }[variant];
    const textColor = {
        primary: '#fff',
        secondary: '#fff',
        ghost: '#fff',
        danger: '#FCA5A5',
    }[variant];
    const borderStyle = {
        primary: 'none',
        secondary: '1px solid rgba(255,255,255,0.2)',
        ghost: '1px solid rgba(255,255,255,0.15)',
        danger: 'none',
    }[variant];
    const paddingStyle = {
        sm: '6px 14px',
        md: '10px 24px',
        lg: '14px 36px',
    }[size];
    const fontSizeStyle = {
        sm: 12,
        md: 14,
        lg: 16,
    }[size];
    return (_jsx(motion.button, { whileTap: { scale: disabled ? 1 : 0.93 }, whileHover: { scale: disabled ? 1 : 1.03 }, onClick: onClick, disabled: disabled, style: {
            background: bgColor,
            color: textColor,
            border: borderStyle,
            padding: paddingStyle,
            fontSize: fontSizeStyle,
            borderRadius: 999,
            cursor: disabled ? 'not-allowed' : 'pointer',
            fontWeight: 600,
            opacity: disabled ? 0.5 : 1,
            transition: 'all 0.2s',
        }, children: children }));
}
