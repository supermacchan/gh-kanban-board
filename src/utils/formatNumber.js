export const formatNumber = (num) => {
    if (num < 1000) {
        return num.toString(); // return the number as-is
    } else if (num >= 1000 && num < 1000000) {
        return (num / 1000).toFixed(1) + 'k'; // convert to thousands with one decimal place
    } else {
        return (num / 1000000).toFixed(1) + 'kk'; // convert to millions with one decimal place
    }
}