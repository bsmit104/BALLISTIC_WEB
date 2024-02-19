console.log('Script loaded!');
document.addEventListener('DOMContentLoaded', function () {
    const ball = document.getElementById('floating-ball');

    let isDragging = false;
    let offsetX, offsetY;
    let isFlinging = false;
    let velocityX = 0;
    let velocityY = 0;

    ball.addEventListener('mousedown', startDragging);
    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('mousemove', function (e) {
        if (isDragging) {
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;

            ball.style.left = x + 'px';
            ball.style.top = y + 'px';
        }

        if (isFlinging) {
            velocityX = e.movementX;
            velocityY = e.movementY;
        }
    });
    document.addEventListener('mouseup', function () {
        if (isFlinging) {
            isFlinging = false;

            function updatePosition() {
                let x = ball.getBoundingClientRect().left + velocityX;
                let y = ball.getBoundingClientRect().top + velocityY;

                // Check boundaries
                if (x < 0 || x + ball.offsetWidth > window.innerWidth) {
                    velocityX = -velocityX;
                }

                if (y < 0 || y + ball.offsetHeight > window.innerHeight) {
                    velocityY = -velocityY;
                }

                ball.style.left = x + 'px';
                ball.style.top = y + 'px';

                if (isFlinging) {
                    requestAnimationFrame(updatePosition);
                }
            }

            updatePosition();
        }
    });

    function startDragging(e) {
        isDragging = true;
        offsetX = e.clientX - ball.getBoundingClientRect().left;
        offsetY = e.clientY - ball.getBoundingClientRect().top;
    }

    function stopDragging() {
        isDragging = false;
    }
    console.log('Script ended!');
});