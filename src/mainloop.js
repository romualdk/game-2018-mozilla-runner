/**
 * Main loop
 * 
 * based on https://github.com/IceCreamYou/MainLoop.js
 */

(function() {

let simulationTimestep = 1000 / 60;
let frameDelta  = 0;
let fps = 60;
let fpsAlpha = 0.9;
let fpsUpdateInterval = 1000;
let lastFpsUpdate = 0;
let framesSinceLastFpsUpdate = 0;
let numUpdateSteps = 0;
let minFrameDelay = 0;
let running = false;
let started = false;
let panic = false;

let NOOP = function() {};
let begin = NOOP;
let update = NOOP;
let draw = NOOP;
let end = NOOP;
let rafHandle;

function start() {
    if(!started) {
        started = true;

        rafHandle = window.requestAnimationFrame(function(timestamp) {
            draw(1);

            running = true;

            lastFrameTimeMs = timestamp;
            lastFpsUpdate = timestamp;
            framesSinceLastFpsUpdate = 0;

            rafHandle = window.requestAnimationFrame(animate);
        });
    }
}

function stop() {
    running = false;
    started = false;
    window.cancelAnimationFrame(rafHandle);
}

function animate(timestamp) {
    rafHandle = requestAnimationFrame(animate);

    if(timestamp < lastFrameTimeMs + minFrameDelay) {
        return;
    }

    frameDelta += timestamp - lastFrameTimeMs;
    lastFrameTimeMs = timestamp;

    begin(timestamp, frameDelta);

    if(timestamp > lastFpsUpdate + fpsUpdateInterval) {
        fps = fpsAlpha * framesSinceLastFpsUpdate * 1000
            / (timestamp - lastFpsUpdate)
            + (1 - fpsAlpha) * fps;
        
        lastFpsUpdate = timestamp;
        framesSinceLastFpsUpdate = 0;
    }

    framesSinceLastFpsUpdate++;

    numUpdateSteps = 0;
    while(frameDelta >= simulationTimestep) {
        update(simulationTimestep);
        frameDelta -= simulationTimestep;

        if(++numUpdateSteps >= 240) {
            panic = true;
            break;
        }
    }

    draw(frameDelta / simulationTimestep);
    
    end(fps, panic);
    panic = false;
}


})(this);