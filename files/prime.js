
function prime(until) {
    const arrPrimeNum = []
    for (let num = 1; num < until; num++) {
        for (let n = 2; n < Math.sqrt(num); n++) {
            if (num % n === 0) {
                break;
            } arrPrimeNum.push(num); 
            break;

        }
    } return arrPrimeNum

}
module.exports = prime

