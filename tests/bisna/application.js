module('Bisna application');


QUnit.reset(function () {
    Bisna.dispose('test');
});


test('Test register', function () {
    Bisna.register('test', function () { return {}; });

    ok(Bisna.contains('test'), 'Bisna should contain module "test".');
});

test('Test contains', function () {
    Bisna.register('test', function () { return {}; });

    ok(Bisna.contains('test'), 'Bisna should contain module "test".');
    ok( ! Bisna.contains('another-test'), 'Bisna should NOT contain module "another-test".');
});

test('Test contains instance', function () {
    Bisna.register('test', function () { return {}; });

    ok(Bisna.contains('test', false), 'Bisna should contain module "test".');
    ok( ! Bisna.contains('test', true), 'Bisna should NOT contain module instance "test".');

    Bisna.resolve('test');

    ok(Bisna.contains('test', true), 'Bisna should contain module instance "test".');
});

test('Test dispose', function () {
    Bisna.register('test', function () { return {}; });

    ok(Bisna.contains('test'), 'Bisna should contain module "test".');

    Bisna.dispose('test');

    ok( ! Bisna.contains('test'), 'Bisna should NOT contain module "test".');
});

test('Test resolve', 1, function () {
    var Module = function (Bisna) {
        return {
            init: function () {
                ok(true, 'Module initialization should be called.');
            }
        };
    };

    Bisna.register('test', Module);

    Bisna.resolve('test');
});

test('Test multiple resolve calls return same instance', 1, function () {
    var m1, m2;

    Bisna.register('test', function () { return {}; });

    m1 = Bisna.resolve('test');
    m2 = Bisna.resolve('test');

    equal(m1, m2, 'Module should resolve to same instance.');
});
