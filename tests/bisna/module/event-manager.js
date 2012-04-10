module('Bisna module Event Manager', {
    teardown: function () {
        Bisna.dispose('event-manager');
    }
});


test('Test addEventListener', 1, function () {
    var EventManager = Bisna.resolve('event-manager');

    EventManager.addEventListener('test', function () {});

    ok(EventManager.hasEventListener('test'), 'Event is being listened by Event Manger');
});

test('Test hasEventListener', 2, function () {
    var EventManager = Bisna.resolve('event-manager');

    ok( ! EventManager.hasEventListener('test'), 'Should contain no Event listener attached');

    EventManager.addEventListener('test', function () {});

    ok(EventManager.hasEventListener('test'), 'Event should be listened by Event Manger');
});

test('Test removeEventListener', 2, function () {
    var EventManager = Bisna.resolve('event-manager'),
        voidFunction = function () {};

    EventManager.addEventListener('test', voidFunction);

    ok(EventManager.hasEventListener('test'), 'Event should be listened by Event Manger');

    EventManager.removeEventListener('test', voidFunction);

    ok( ! EventManager.hasEventListener('test'), 'Should contain no Event listener attached');
});

test('Test dispatchEvent', 2, function () {
    var EventManager = Bisna.resolve('event-manager'),
        eventData    = {foo: 'bar'};

    EventManager.addEventListener('test', function (event) {
        equal(event.type, 'test', 'Event type should match');
        equal(event.userData, eventData, 'Event data should match');
    });

    EventManager.dispatchEvent('test', eventData);
});