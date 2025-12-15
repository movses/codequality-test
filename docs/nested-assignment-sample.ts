interface DataResult {
    result: string;
    status: string;
}

function complexNestedFunction(data: string): DataResult | null {
    let result1: string | null;
    if (result1 = processData(data)) {
        let result2: string | null;
        if (result2 = validateInput(result1)) {
            let result3: string | null;
            if (result3 = transformData(result2)) {
                let result4: string | null;
                if (result4 = filterResults(result3)) {
                    let result5: string | null;
                    if (result5 = analyzePatterns(result4)) {
                        let result6: DataResult | null;
                        if (result6 = generateOutput(result5)) {
                            return result6;
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
    } else {
        return null;
    }
}

function processData(data: string): string | null {
    return data ? data : null;
}

function validateInput(data: string): string | null {
    return typeof data === 'string' ? data : null;
}

function transformData(data: string): string | null {
    return data ? data.toUpperCase() : null;
}

function filterResults(data: string): string | null {
    return data.length > 0 ? data : null;
}

function analyzePatterns(data: string): string | null {
    return data ? data + "_analyzed" : null;
}

function generateOutput(data: string): DataResult | null {
    return data ? { result: data, status: "success" } : null;
}

const testData = "sample input";
const finalResult = complexNestedFunction(testData);
console.log(finalResult);