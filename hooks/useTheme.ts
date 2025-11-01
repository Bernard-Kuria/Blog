export const applyToggleStyles = (
  t: "light" | "dark",
  btn: HTMLLIElement | null,
  toggle: HTMLDivElement | null
) => {
  if (!btn || !toggle) return;
  if (t === "dark") {
    btn.style.borderColor = "#f4f5f0";
    btn.style.backgroundColor = "#232323";
    toggle.style.backgroundColor = "#f4f5f0";
    toggle.style.transform = "translateX(15px)";
  } else {
    btn.style.borderColor = "#232323";
    btn.style.backgroundColor = "#f4f5f0";
    toggle.style.backgroundColor = "#232323";
    toggle.style.transform = "translateX(1px)";
  }
};