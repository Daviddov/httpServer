
function prime(until) {
    for (let num = 1; num < until; num++) {
        for (let n = 2; n < Math.sqrt(num); n++) {
            if (num % n === 0) {
                break;
            } console.log(num); 
            break;

        }
    }
}
module.exports = prime
// prime(process.argv[2])
