import React, { useState, useEffect } from "react";
import './Reviews.css';
import ReviewsText from "./ReviewsText";
import ReviewsCard from "./ReviewsCard";
import review from "../assets/review.png";
import review1 from "../assets/review1.png";

const reviewsData = [
    { reviewimage: review, maintext: "Cameron Williamson", subtext: "Designer", content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae." },
    { reviewimage: review1, maintext: "Esther Howard", subtext: "Marketing", content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae." }
];

function Reviews() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 600);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isMobile) {
            const interval = setInterval(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % reviewsData.length);
            }, 3000); 

            return () => clearInterval(interval);
        }
    }, [isMobile]);

    return (
        <div className="reviews">
            <div className="reviews_top">
                <h4>What our customers are <br /> saying us?</h4>
                <div className="reviews_topcont">
                    <ReviewsText textmain="10m+" textsub="Happy People" />
                    <ReviewsText star="&#9733;" textmain="4.88" textsub="Overall rating" />
                </div>
            </div>

            <div className="reviews_cards">
                {isMobile ? (
                    <ReviewsCard
                        reviewimage={reviewsData[currentIndex].reviewimage}
                        maintext={reviewsData[currentIndex].maintext}
                        subtext={reviewsData[currentIndex].subtext}
                        content={reviewsData[currentIndex].content}
                    />
                ) : (
                    reviewsData.map((review, index) => (
                        <ReviewsCard
                            key={index}
                            reviewimage={review.reviewimage}
                            maintext={review.maintext}
                            subtext={review.subtext}
                            content={review.content}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default Reviews;
