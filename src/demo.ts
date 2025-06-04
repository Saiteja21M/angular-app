import * as readline from 'readline';

function doSomething(num:number, num1:number) {
    console.log(num + num1);
}

doSomething(2,6);

let sum = (num:number, num2:number) => {
    return num + num2;
};

console.log(sum(3,9));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter your search query: ', (queryParam) => {
    if (queryParam) {
        fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(queryParam)}`)
            .then(response => response.json())
            .then(data => {
                console.log('TVMaze Search Results:', data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
            .finally(() => rl.close());
    } else {
        console.log('No query provided.');
        rl.close();
    }
});


