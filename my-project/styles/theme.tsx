import { ColorSchemeName, Platform } from "react-native";

export type Palette = {
    background: string;
    surface: string;
    card: string;
    text: string;
    muted: string;
    primary: string;
    primaryVariant: string;
    secondary: string;
    border: string;
    success: string;
    warning: string;
    danger: string;
    link: string;
};

export type Radii = {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    pill: number;
};

export type Shadows = {
    none: {};
    sm: { elevation: number } | { shadowColor: string; shadowOffset: { width: number; height: number }; shadowOpacity: number; shadowRadius: number };
    md: { elevation: number } | { shadowColor: string; shadowOffset: { width: number; height: number }; shadowOpacity: number; shadowRadius: number };
    lg: { elevation: number } | { shadowColor: string; shadowOffset: { width: number; height: number }; shadowOpacity: number; shadowRadius: number };
};

export type Typography = {
    fontFamily: string;
    fontFamilyMono: string;
    h1: { fontSize: number; lineHeight: number; fontWeight?: string | number };
    h2: { fontSize: number; lineHeight: number; fontWeight?: string | number };
    body: { fontSize: number; lineHeight: number };
    small: { fontSize: number; lineHeight: number };
    label: { fontSize: number; lineHeight: number; fontWeight?: string | number };
};

export type Theme = {
    name: "light" | "dark";
    colors: Palette;
    spacing: (n: number) => number;
    radii: Radii;
    shadows: Shadows;
    typography: Typography;
    // helper for status bar style or others if needed
    statusBarStyle: "dark-content" | "light-content";
};

/* Utilities */
const baseSpacing = (n: number) => Math.max(0, n) * 4;

const defaultFonts = {
    ios: {
        ui: "System",
        mono: "Menlo",
    },
    android: {
        ui: "Roboto",
        mono: "monospace",
    },
    web: {
        ui: "system-ui",
        mono: "ui-monospace",
    },
};

const fonts = Platform.select({
    ios: defaultFonts.ios,
    android: defaultFonts.android,
    default: defaultFonts.web,
});

/* Light theme */
export const lightTheme: Theme = {
    name: "light",
    colors: {
        background: "#FFFFFF",
        surface: "#F7F8FA",
        card: "#FFFFFF",
        text: "#0f1720",
        muted: "#6b7280",
        primary: "#0ea5e9", // sky-500
        primaryVariant: "#0369a1",
        secondary: "#7c3aed", // violet-600
        border: "#e6e9ef",
        success: "#16a34a",
        warning: "#f59e0b",
        danger: "#ef4444",
        link: "#0ea5e9",
    },
    spacing: baseSpacing,
    radii: {
        xs: 4,
        sm: 6,
        md: 10,
        lg: 14,
        pill: 999,
    },
    shadows: {
        none: {},
        sm: Platform.select({
            ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3 },
            default: { elevation: 1 },
        }),
        md: Platform.select({
            ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.12, shadowRadius: 6 },
            default: { elevation: 3 },
        }),
        lg: Platform.select({
            ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.16, shadowRadius: 16 },
            default: { elevation: 6 },
        }),
    },
    typography: {
        fontFamily: fonts?.ui ?? "System",
        fontFamilyMono: fonts?.mono ?? "monospace",
        h1: { fontSize: 28, lineHeight: 34, fontWeight: "700" },
        h2: { fontSize: 22, lineHeight: 28, fontWeight: "600" },
        body: { fontSize: 16, lineHeight: 22 },
        small: { fontSize: 13, lineHeight: 18 },
        label: { fontSize: 12, lineHeight: 16, fontWeight: "600" },
    },
    statusBarStyle: "dark-content",
};

/* Dark theme */
export const darkTheme: Theme = {
    name: "dark",
    colors: {
        background: "#0b1220",
        surface: "#0f1724",
        card: "#111827",
        text: "#e6eef8",
        muted: "#9aa6b2",
        primary: "#38bdf8",
        primaryVariant: "#0369a1",
        secondary: "#8b5cf6",
        border: "#18202a",
        success: "#16a34a",
        warning: "#f59e0b",
        danger: "#f97316",
        link: "#7dd3fc",
    },
    spacing: baseSpacing,
    radii: {
        xs: 4,
        sm: 6,
        md: 10,
        lg: 14,
        pill: 999,
    },
    shadows: {
        none: {},
        sm: Platform.select({
            ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.18, shadowRadius: 3 },
            default: { elevation: 1 },
        }),
        md: Platform.select({
            ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.22, shadowRadius: 8 },
            default: { elevation: 3 },
        }),
        lg: Platform.select({
            ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.3, shadowRadius: 20 },
            default: { elevation: 6 },
        }),
    },
    typography: {
        fontFamily: fonts?.ui ?? "System",
        fontFamilyMono: fonts?.mono ?? "monospace",
        h1: { fontSize: 28, lineHeight: 34, fontWeight: "700" },
        h2: { fontSize: 22, lineHeight: 28, fontWeight: "600" },
        body: { fontSize: 16, lineHeight: 22 },
        small: { fontSize: 13, lineHeight: 18 },
        label: { fontSize: 12, lineHeight: 16, fontWeight: "600" },
    },
    statusBarStyle: "light-content",
};

/* Factory */
export const createTheme = (scheme: ColorSchemeName | undefined): Theme => {
    if (scheme === "dark") return darkTheme;
    return lightTheme;
};

export default createTheme;