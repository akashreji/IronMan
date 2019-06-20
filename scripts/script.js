//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//==============================================================================

// How to load in modules
const Diagnostics = require('Diagnostics');
const Scene = require('Scene');
const TouchGestures = require('TouchGestures')
const Reactive = require('Reactive');

var planeTracker= Scene.root.find('planeTracker0');
var shoe= Scene.root.find('Converse Sneakers0');

// How to access scene objects
const directionalLight = Scene.root.find('directionalLight0');

TouchGestures.onPinch().subscribe(function(ShoePinching)
{
	var lastScaleX = shoe.transform.scaleX.pinLastValue();
	shoe.transform.scaleX = Reactive.mul(lastScaleX, ShoePinching.scale);

	var lastScaleY = shoe.transform.scaleY.pinLastValue();
	shoe.transform.scaleY = Reactive.mul(lastScaleY, ShoePinching.scale);

	var lastScaleZ = shoe.transform.scaleZ.pinLastValue();
	shoe.transform.scaleZ = Reactive.mul(lastScaleZ, ShoePinching.scale);
});

TouchGestures.onPan(shoe).subscribe(function(ShoePanning)
{
	planeTracker.trackPoint(ShoePanning.location,ShoePanning.state);
});        


/*
const Animation = require('Animation');

const Patches = require('Patches');
const Materials = require('Materials');

const screenScale = Patches.getScalarValue('screenScale');

const rectangle = Scene.root.find('rectangle0');
const container = Scene.root.find('Container');

const selectionCount = 2;   // Number of selections
const spacing = 0.8;         // Spacing between button (rectangle position offset)
const initialIndex = 3;     // Initial selection index on startup, defaults to 0

const selectedIndex = HorizontalSlider(container, screenScale, selectionCount, spacing, {
    initialIndex
});

// Change material based on slider selected index
selectedIndex.monitor({ fireOnInitialValue: true }).subscribe(e => {
    rectangle.material = Materials.get(`material${e.newValue}`);
    });

function HorizontalSlider(cont, scale, count, spacing, options = {}) {
    spacing *= 100;

    const initialIndex = +options.initialIndex || 0;
    const container = cont.transform;
    const indicator = cont.child('Indicator').transform;
    const driver = Animation.timeDriver({ durationMilliseconds: 250 });
    
    const index = container.x.div(spacing).abs().round();   // Return index
    container.x = initialIndex * -spacing;                  // Initialize position based on initial index
    indicator.x = index.mul(spacing);

    TouchGestures.onPan(container).subscribe(e => {
        container.x = Reactive.clamp(e.translation.x.div(scale).add(container.x.pinLastValue()), (count - 1) * -spacing, 0);
        // Snap to grid on release
        e.state.eq('ENDED').onOn().subscribe(() => {
            container.x = Animation.animate(driver, Animation.samplers.easeInOutQuad(container.x.pinLastValue(), -(index.pinLastValue() * spacing)));
            driver.reset();
            driver.start();
        });
        
    });

    return index;
} */