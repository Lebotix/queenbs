export const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
};

export const handlePhoneClick = (number: string) => {
    navigator.clipboard.writeText(number);
    window.location.href = `tel:${number}`;
};