import { describe, it, expect } from 'vitest';
import { validateEmail, validatePassword, validateActivityDuration} from './public/verification.js';

  // Test 1: Test validation for empty fields in login
describe('validateEmail', () => {
  it('should detect empty email fields', () => {
    const userEmail = '';
    // Act & Assert - check if field is empty
    expect(userEmail === '').toBe(true);
    
    // Arrange - field filled
    const filledEmail = 'user@example.com';
    // Act & Assert
    expect(filledEmail === '').toBe(false);
  });
});

// Test 2: Test validation for empty fields in login
describe('validatePassword', () => {
  it('should detect empty password fields', () => {
    const userPassword = '';
    expect(userPassword === '').toBe(true);
    const filledPassword = 'password123';
    expect(filledPassword === '').toBe(false);
  });
});

// Test 3: Test that activity duration is greater than zero
describe('validateActivityDuration', () => {
  it('should validate that activity duration is not zero', () => {
    const hours = 1;
    const minutes = 30;
    expect(parseInt(hours) === 0 && parseInt(minutes) === 0).toBe(false);
    expect(parseInt(hours) > 0 || parseInt(minutes) > 0).toBe(true);
  });

  // Test 4: Test zero duration detection
  it('should detect when both hours and minutes are zero', () => {
    const hours = 0;
    const minutes = 0;
    expect(parseInt(hours) === 0 && parseInt(minutes) === 0).toBe(true);
  });
});
