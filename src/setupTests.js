// src/setupTests.js or similar
import { server } from './mocks/server'; // Adjust the path as needed
import { handlers } from './mocks/handlers'; // Adjust the path as needed

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that are declared in a test.
afterEach(() => server.resetHandlers());

// Clean up after all tests are finished.
afterAll(() => server.close());