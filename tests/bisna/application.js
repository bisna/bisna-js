module('Bisna application');

test('Test register', function () {
    Bisna.register('test', function () {});

    ok(Bisna.contains('test'), 'Bisna should contain module "test".');
});

test('Test contains', function () {
    Bisna.register('test', function () {});

    ok(Bisna.contains('test'), 'Bisna should contain module "test".');
    ok( ! Bisna.contains('another-test'), 'Bisna should NOT contain module "another-test".');
});

test('Test dispose', function () {
    Bisna.register('test', function () {});

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
    var Module = function (Bisna) {
        return {};
    }, m1, m2;

    Bisna.register('test', Module);

    m1 = Bisna.resolve('test');
    m2 = Bisna.resolve('test');

    equal(m1, m2, 'Module should resolve to same instance.');
});
