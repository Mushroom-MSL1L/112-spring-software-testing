const assert = require('assert');
const { test } = require('node:test');

const Calculator = require('../src/calculator');

test("Test Calculator main", () => {
    // Test invalid month1
    assert.throws( 
        () => Calculator.main(0, 1, 1, 1, 2024) ,
        (err) => {
            assert.strictEqual(err.message, "invalid month1");
            return true;
        }
    );
    assert.strictEqual(Calculator.main(1, 1, 1, 1, 2024), 0);
    assert.strictEqual(Calculator.main(12, 31, 12, 31, 2024), 0);
    assert.throws(
        () => Calculator.main(13, 1, 1, 1, 2024),
        (err) => {
            assert.strictEqual(err.message, "invalid month1");
            return true;
        }
    );
    // Test invalid month2
    assert.throws(
        () => Calculator.main(1, 1, 0, 1, 2024),
        (err) => {
            assert.strictEqual(err.message, "invalid month2");
            return true;
        }
    );
    assert.throws(
        () => Calculator.main(1, 1, 13, 1, 2024),
        (err) => {
            assert.strictEqual(err.message, "invalid month2");
            return true;
        }
    );

    // Test invalid day1
    assert.throws(
        () => Calculator.main(1, 0, 1, 1, 2024),
        (err) => {
            assert.strictEqual(err.message, "invalid day1");
            return true;
        }
    );
    assert.strictEqual(Calculator.main(1, 1, 1, 1, 2024), 0);
    assert.strictEqual(Calculator.main(1, 31, 1, 31, 2024), 0);
    assert.throws(
        () => Calculator.main(1, 32, 1, 1, 2024),
        (err) => {
            assert.strictEqual(err.message, "invalid day1");
            return true;
        }
    );

    // Test invalid day2
    assert.throws(
        () => Calculator.main(1, 1, 1, 0, 2024),
        (err) => {
            assert.strictEqual(err.message, "invalid day2");
            return true;
        }
    );
    assert.throws(
        () => Calculator.main(1, 1, 1, 32, 2024),
        (err) => {
            assert.strictEqual(err.message, "invalid day2");
            return true;
        }
    );

    // Test invalid year
    assert.throws(
        () => Calculator.main(1, 1, 1, 1, 0),
        (err) => {
            assert.strictEqual(err.message, "invalid year");
            return true;
        }
    );
    assert.strictEqual(Calculator.main(1, 1, 1, 1, 1), 0);
    assert.strictEqual(Calculator.main(1, 1, 1, 1, 10000), 0);
    assert.throws(
        () => Calculator.main(1, 1, 1, 1, 10001),
        (err) => {
            assert.strictEqual(err.message, "invalid year");
            return true;
        }
    );

    // Test day1 must be less than day2 if month1 is equal to month2
    assert.throws(
        () => Calculator.main(1, 2, 1, 1, 2024),
        (err) => {
            assert.strictEqual(err.message, "day1 must be less than day2 if month1 is equal to month2");
            return true;
        }
    );
    assert.strictEqual(Calculator.main(1, 1, 1, 2, 2024), 1);
    assert.strictEqual(Calculator.main(1, 31, 2, 1, 2024), 1);//
    assert.strictEqual(Calculator.main(1, 5, 2, 6, 2024), 32);//
    assert.strictEqual(Calculator.main(1, 4, 2, 5, 2024), 32);//

    // Test month1 must be less than month2
    assert.throws(
        () => Calculator.main(2, 1, 1, 1, 2024),
        (err) => {
            assert.strictEqual(err.message, "month1 must be less than month2");
            return true;
        }
    );
});

test ("Test Calculator #calculate", () => {
    //setTimeout(Calculator.main(1, 1, 12, 31, 400), 100) ;
    // Test month2 === month1
    assert.strictEqual(Calculator.main(1, 1, 1, 1, 2024), 0);

    // Test else 
    assert.strictEqual(Calculator.main(1, 1, 12, 31, 400), 365);
    assert.strictEqual(Calculator.main(1, 1, 12, 31, 100), 364);    
}) ;

test ("Test Calculator #isLeapYear", () => {
    // TTT -> invalid 
    // TTF -> F
    assert.strictEqual(Calculator.main(2, 1, 3, 1, 4), 29);
    // TFT -> F
    assert.strictEqual(Calculator.main(2, 1, 3, 1, 400), 29);
    // TFF -> T
    assert.strictEqual(Calculator.main(2, 1, 3, 1, 100), 28);
    // FTT -> invalid
    // FTF -> F
    assert.strictEqual(Calculator.main(2, 1, 3, 1, 1), 28);
    // FFT -> invalid
    // FFF -> invalid
}); 