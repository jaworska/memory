import confetti from "canvas-confetti";
import { useEffect } from "react";

const useCelebration = (gameWon, showWinModal) => {
    useEffect(() => {
        if (gameWon && !showWinModal) {
            // Show confetti
            const duration = 3000;
            const end = Date.now() + duration;

            const frame = () => {
                confetti({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ["#ac8cff", "#ffffff"],
                });
                confetti({
                    particleCount: 2,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ["#ac8cff", "#ffffff"],
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            };
            frame();
        }
    }, [gameWon, showWinModal]);
};

export default useCelebration;
