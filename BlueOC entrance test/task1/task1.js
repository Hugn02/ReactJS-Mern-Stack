function mostFrequentStringLengths(strings) {
    
    const lengths = strings.map(str => str.length);

    const frequencyMap = {};
    lengths.forEach(length => {
        frequencyMap[length] = (frequencyMap[length] || 0) + 1;
    });

    const maxFrequency = Math.max(...Object.values(frequencyMap));
    const mostFrequentLengths = Object.keys(frequencyMap).filter(
        length => frequencyMap[length] === maxFrequency
    );

    const result = strings.filter(str => mostFrequentLengths.includes(String(str.length)));

    return result;
}

const input = ['a', 'ab', 'abc', 'cd', 'def', 'gh'];
const output = mostFrequentStringLengths(input);
console.log(output); 