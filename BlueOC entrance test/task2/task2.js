function sumOfTwoLargest(numbers) {
    if (numbers.length < 2) {
        throw new Error("Mảng phải chứa ít nhất hai phần tử.");
    }
    numbers.sort((a, b) => b - a); 
    const largest1 = numbers[0];
    const largest2 = numbers[1];
    const sum = largest1 + largest2;
    console.log(`Đầu vào: [${numbers.join(', ')}]`);
    console.log(`Hai số lớn nhất là ${largest1} và ${largest2}. Tổng là ${sum}.`);
    return sum;
}

const input = [
    [1, 4, 2, 3, 5],     
];

input.forEach(caseInput => {
    sumOfTwoLargest(caseInput);
});
