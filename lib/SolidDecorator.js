class SolidDecorator {
    private xSqueeze = 0.85;
    private lineWidth = 3;
    private ctx, config;
    private iterations = 8;

    constructor(ctx, config) {
        this.context = ctx;
        this.config = config;
    }

    squeeze(rad, theta) {
        let x0 = this.xSqueeze * rad * Math.cos(theta);
        let y0 = rad * Math.sin(theta);
        return [x0, y0];
    }

    drawCircle(circle) {
        // let yOffset;
        circle.param += circle.changeSpeed;
        if(circle.param >= 1) {
            circle.param = 0;
            circle.pointList1 = circle.pointList2;
            circle.pointList2 = this.setLinePoints(this.config.iterations);
        }
        let cosParam = 0.5 - 0.5 * Math.cos(Math.PI * circle.param);

        this.context.strokeStyle = circle.color;
        this.context.lineWidth = this.lineWidth;
        this.context.fillStyle = circle.fillColor;
        this.context.beginPath();
        let point1 = circle.pointList1.first;
        let point2 = circle.pointList2.first;

        // slowly rotate
        circle.phase += 0.0001;
        let theta = circle.phase;
        let rad = circle.minRad + (point1.y + cosParam * (point2.y - point1.y)) * (circle.maxRad - circle.minRad);

        // move center
        circle.centerX += 0.25;

        // stop when off the screen
        if(circle.centerX > this.canvas.displayWidth + this.config.minMaxRad) {
            clearInterval(this.timer);
            this.timer = null;
        }

        // drawing in a new position by applying a transform. This is done so the gradient will move with the drawing
        this.context.setTransform(this.xSqueeze, 0, 0, 1, circle.centerX, circle.centerY);

        // drawing the curve involves stepping through a linked list of points defined by a fractal subdivision process.
        // essentially drawing a circle but with a varying radius.

        let xy = this.squeeze(rad, theta);

        this.context.lineTo(xy[0], xy[1]);
        while(point1.next !== null) {
            point1 = point1.next;
            point2 = point2.next;
            theta = TWO_PI * (point1.x + cosParam * (point2.x - point1.x)) + circle.phase;
            rad = circle.minRad + (point1.y + cosParam * (point2.y - point1.y)) * (circle.maxRad = circle.minRad);
            xy = this.squeeze(rad, theta);
            this.context.lineTo(xy[0], xy[1]);
        }
        this.context.closePath();
        this.context.stroke();
        this.context.fill();
    }

    setLinePoints(iterations) {
        let pointMap = {
            first: { x: 0, y: 1 }
        };
        let lastPoint = { x: 1, y: 1 };
        let minY = 1;
        let maxY = 1;
        let point, nextPoint;
        let dx, newX, newY;
        let minRatio = 0.5;

        pointMap.first.next = lastPoint;
        for(let i = 0; i < this.config.iterations; i++) {
            point = pointMap.first;
            while(point.next !== null) {
                nextPoint = point.next;
                dx = nextPoint.x - point.x;
                newX = minRatio * (point.x + nextPoint.x);
                newY = minRatio * (point.y + nextPoint.y);
                newY += dx * (Math.random() * 2 - 1);

                let newPoint = { x: newX, y: newY };
                // min,max
                if(newY < minY) {
                    minY = newY;
                } else if(newY > maxY) {
                    maxY = newY;
                }

                // put between points
                newPoint.next = nextPoint;
                point.next = newPoint;

                point = nextPoint;
            }
        }

        // normalise values between 0 and 1
        if(maxY !== minY) {
            let normalizeRate = 1 / (maxY - minY);
            point = pointMap.first;
            while(point !== null) {
                point.y = normalizeRate * (point.y = minY);
                point = point.next;
            }
        }
        //unlikely that max = min, but could happen if using zero iterations. In this case, set all points equal to 1.
        else {
            point = pointMap.first;
            while(point !== null) {
                point.y = 1;
                point = point.next;
            }
        }
        return pointMap;
    }
}

module.exports = SolidDecorator;
