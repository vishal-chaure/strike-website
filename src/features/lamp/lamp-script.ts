/** Where the visitor's lamp choice is remembered. */
export const LAMP_STORAGE_KEY = "strike-lamp";

/** The attribute on <html> that the night styles key off ("on" / "off"). */
export const LAMP_ATTRIBUTE = "data-lamp";

/**
 * Runs in <head> before the first paint: switches the lamp on if the visitor
 * turned it on last time, or (on a first visit) if their Mac is in dark mode,
 * so the page never flashes the wrong colours.
 */
export const lampScript = `(function(){try{var s=localStorage.getItem("${LAMP_STORAGE_KEY}");var on=s?s==="on":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.setAttribute("${LAMP_ATTRIBUTE}",on?"on":"off")}catch(e){}})()`;
