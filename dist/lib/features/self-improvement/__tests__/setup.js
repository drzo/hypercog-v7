import '@testing-library/jest-dom';
// Mock crypto for UUID generation
if (!global.crypto) {
    global.crypto = {
        randomUUID: () => 'test-uuid'
    };
}
// Mock process.env
process.env.NODE_ENV = 'test';
