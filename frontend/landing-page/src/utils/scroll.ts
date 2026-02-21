export const smoothScrollTo = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export const handleAnchorClick = (href: string): void => {
  if (href.startsWith('#')) {
    const id = href.slice(1);
    if (id) {
      smoothScrollTo(id);
    }
  }
};
