export const formatEUR = (cents: number) =>
    (cents / 100).toLocaleString("nl-NL", { style: "currency", currency: "EUR" });