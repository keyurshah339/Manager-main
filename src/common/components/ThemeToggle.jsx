import React from "react";
import { HiOutlineLightBulb } from "react-icons/hi";
import { IoMoonOutline } from "react-icons/io5";
import { useTheme } from "../hooks/useTheme";

export function ThemeToggle() {
    const [colorTheme, setTheme] = useTheme();
    return (
        <button
            onClick={() => setTheme(colorTheme)}
            className="ml-1 outline-none self-center"
        >
            {colorTheme === "dark" ? (
                <IoMoonOutline size={28} />
            ) : (
                <HiOutlineLightBulb size={28} />
            )}
        </button>
    );
}