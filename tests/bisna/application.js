module('Bisna application', {
    teardown: function () {
        Bisna.dispose('test');
    }
});


test('Test register', 1, function () {
    Bisna.register('test', function () { return {}; });

    ok(Bisna.isRegistered('test'), 'Bisna should contain module "test".');
});

test('Test unregister', 2, function () {
    Bisna.register('test', function () { return {}; });

    ok(Bisna.isRegistered('test'), 'Bisna should contain module "test".');

    Bisna.unregister('test');

    ok( ! Bisna.isRegistered('test'), 'Bisna should NOT contain module "test".');
});

test('Test isRegistered', 2, function () {
    Bisna.register('test', function () { return {}; });

    ok(Bisna.isRegistered('test'), 'Bisna should contain module "test".');
    ok( ! Bisna.isRegistered('another-test'), 'Bisna should NOT contain module "another-test".');
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

test('Test dispose', 3, function () {
    Bisna.register('test', function () { return {}; });

    ok( ! Bisna.contains('test'), 'Bisna should NOT contain module instance "test".');

    Bisna.resolve('test');

    ok(Bisna.contains('test'), 'Bisna should contain module instance "test".');

    Bisna.dispose('test');

    ok( ! Bisna.contains('test'), 'Bisna should NOT contain module "test".');
});

test('Test contains', 2, function () {
    Bisna.register('test', function () { return {}; });

    ok( ! Bisna.contains('test'), 'Bisna should NOT contain module instance "test".');

    Bisna.resolve('test');

    ok(Bisna.contains('test'), 'Bisna should contain module instance "test".');
});

test('Test multiple resolve calls return same instance', 1, function () {
    var m1, m2;

    Bisna.register('test', function () { return {}; });

    m1 = Bisna.resolve('test');
    m2 = Bisna.resolve('test');

    equal(m1, m2, 'Module should resolve to same instance.');
});

test('Test constructor call is lazy-loaded', 1, function () {
    Bisna.register('test', function () {
        ok(true, 'Constructor is lazy-loaded');

        return {};
    });


    Bisna.resolve('test');
});