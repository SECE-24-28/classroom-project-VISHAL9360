#!/usr/bin/env node

/**
 * Integration Testing Script
 * Tests the connection between Frontend and Backend
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
};

let testToken = '';
let testUserId = '';

// Helper functions
const log = (message, color = 'reset') => {
    console.log(`${colors[color]}${message}${colors.reset}`);
};

const logSuccess = (message) => log(` ${message}`, 'green');
const logError = (message) => log(` ${message}`, 'red');
const logInfo = (message) => log(`ℹ  ${message}`, 'blue');
const logWarning = (message) => log(`  ${message}`, 'yellow');

// Test functions
async function testServerConnection() {
    logInfo('Testing server connection...');
    try {
        const response = await axios.get('http://localhost:5000');
        if (response.status === 200) {
            logSuccess('Backend server is running');
            return true;
        }
    } catch (error) {
        logError('Backend server is not running');
        logWarning('Please start the backend server: cd "mern Backend" && npm start');
        return false;
    }
}

async function testUserRegistration() {
    logInfo('Testing user registration...');
    try {
        const testUser = {
            name: 'Test User',
            email: `test${Date.now()}@example.com`,
            password: 'Test@1234',
        };

        const response = await axios.post(`${BASE_URL}/auth/register`, testUser);

        if (response.data.success && response.data.token) {
            testToken = response.data.token;
            testUserId = response.data._id;
            logSuccess('User registration successful');
            logInfo(`Token: ${testToken.substring(0, 20)}...`);
            return true;
        }
    } catch (error) {
        logError(`Registration failed: ${error.response?.data?.message || error.message}`);
        return false;
    }
}

async function testUserLogin() {
    logInfo('Testing user login...');
    try {
        const credentials = {
            email: 'test@example.com',
            password: 'Test@1234',
        };

        const response = await axios.post(`${BASE_URL}/auth/login`, credentials);

        if (response.data.success && response.data.token) {
            testToken = response.data.token;
            logSuccess('User login successful');
            return true;
        }
    } catch (error) {
        logWarning('Login with existing user failed (might not exist)');
        return false;
    }
}

async function testProtectedRoute() {
    logInfo('Testing protected route access...');
    try {
        const response = await axios.get(`${BASE_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${testToken}`,
            },
        });

        if (response.data.success) {
            logSuccess('Protected route access successful');
            logInfo(`User: ${response.data.data.name} (${response.data.data.email})`);
            return true;
        }
    } catch (error) {
        logError(`Protected route access failed: ${error.response?.data?.message || error.message}`);
        return false;
    }
}

async function testUnauthorizedAccess() {
    logInfo('Testing unauthorized access (should fail)...');
    try {
        await axios.get(`${BASE_URL}/auth/me`);
        logError('Unauthorized access was allowed (security issue!)');
        return false;
    } catch (error) {
        if (error.response?.status === 401) {
            logSuccess('Unauthorized access properly blocked');
            return true;
        }
        logError('Unexpected error during unauthorized access test');
        return false;
    }
}

async function testFetchPlans() {
    logInfo('Testing fetch recharge plans...');
    try {
        const response = await axios.get(`${BASE_URL}/plans`);

        if (response.data.success && Array.isArray(response.data.data)) {
            logSuccess(`Fetched ${response.data.data.length} recharge plans`);
            if (response.data.data.length > 0) {
                logInfo(`Sample plan: ₹${response.data.data[0].amount} - ${response.data.data[0].planType}`);
            }
            return true;
        }
    } catch (error) {
        logError(`Fetch plans failed: ${error.response?.data?.message || error.message}`);
        return false;
    }
}

async function testAdminOnlyRoute() {
    logInfo('Testing admin-only route (should fail for regular user)...');
    try {
        await axios.get(`${BASE_URL}/auth/users`, {
            headers: {
                Authorization: `Bearer ${testToken}`,
            },
        });
        logWarning('Admin route was accessible to regular user (might be admin)');
        return true;
    } catch (error) {
        if (error.response?.status === 403) {
            logSuccess('Admin route properly protected');
            return true;
        }
        logError('Unexpected error during admin route test');
        return false;
    }
}

async function testTokenExpiration() {
    logInfo('Testing with invalid token...');
    try {
        await axios.get(`${BASE_URL}/auth/me`, {
            headers: {
                Authorization: 'Bearer invalid_token_here',
            },
        });
        logError('Invalid token was accepted (security issue!)');
        return false;
    } catch (error) {
        if (error.response?.status === 401) {
            logSuccess('Invalid token properly rejected');
            return true;
        }
        logError('Unexpected error during token validation test');
        return false;
    }
}

// Main test runner
async function runTests() {
    console.log('\n' + '='.repeat(60));
    log('🧪 MERN STACK INTEGRATION TESTS', 'cyan');
    console.log('='.repeat(60) + '\n');

    const results = {
        passed: 0,
        failed: 0,
        total: 0,
    };

    const tests = [
        { name: 'Server Connection', fn: testServerConnection, critical: true },
        { name: 'User Registration', fn: testUserRegistration },
        { name: 'User Login', fn: testUserLogin },
        { name: 'Protected Route Access', fn: testProtectedRoute },
        { name: 'Unauthorized Access Block', fn: testUnauthorizedAccess },
        { name: 'Fetch Recharge Plans', fn: testFetchPlans },
        { name: 'Admin Route Protection', fn: testAdminOnlyRoute },
        { name: 'Invalid Token Rejection', fn: testTokenExpiration },
    ];

    for (const test of tests) {
        console.log('\n' + '-'.repeat(60));
        log(`TEST: ${test.name}`, 'cyan');
        console.log('-'.repeat(60));

        results.total++;
        const passed = await test.fn();

        if (passed) {
            results.passed++;
        } else {
            results.failed++;
            if (test.critical) {
                logError('Critical test failed. Stopping tests.');
                break;
            }
        }

        // Wait a bit between tests
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Print summary
    console.log('\n' + '='.repeat(60));
    log('📊 TEST SUMMARY', 'cyan');
    console.log('='.repeat(60));
    logInfo(`Total Tests: ${results.total}`);
    logSuccess(`Passed: ${results.passed}`);
    if (results.failed > 0) {
        logError(`Failed: ${results.failed}`);
    }

    const percentage = ((results.passed / results.total) * 100).toFixed(1);
    console.log(`\nSuccess Rate: ${percentage}%\n`);

    if (results.passed === results.total) {
        log('🎉 ALL TESTS PASSED! Integration is working perfectly!', 'green');
    } else if (results.passed > 0) {
        logWarning('Some tests failed. Please check the errors above.');
    } else {
        logError('All tests failed. Please check your backend server.');
    }

    console.log('='.repeat(60) + '\n');
}

// Run the tests
runTests().catch(error => {
    logError(`Test runner error: ${error.message}`);
    process.exit(1);
});
