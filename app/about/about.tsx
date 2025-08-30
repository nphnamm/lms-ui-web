import React from "react";
import { styles } from "../styles/style";

type Props = {};

const About = (props: Props) => {
    return (
        <div className="text-black dark:text-white">
            <br />
            <h1 className={`${styles.title}`} style={{ fontSize: "800px", lineHeight: "45px" }}>
                What is <span className="text-gradient">Becodemy?</span>
            </h1>
            <br />
            <div className="w-[95%] 800px:w-[85%] m-auto">
                <p className="text-[18px] font-Poppins">
                    Are you ready to take your programming skills to the next level? Look no further than Becodemy, the
                    premier programming community dedicated to helping new programmers achieve their goals and reach
                    their full potential.
                    <br />
                    <br />
                    As the founder and CEO of Becodemy, I know firsthand the challenges that come with learning and
                    growing in the programming industry. That’s why I created Becodemy to provide new programmers with
                    the resources and support they need to succeed.
                    <br />
                    <br />
                    Our YouTube channel is a treasure trove of informative videos on everything from programming basics
                    to advanced techniques. But that’s just the beginning. Our affordable courses are designed to give
                    you the high-quality education you need to succeed in the industry, without breaking the bank.
                    <br />
                    <br />
                    But Becodemy is more than just a community—we’re a family. Our supportive community of like-minded
                    individuals is here to help you every step of the way, whether you’re just starting out or looking
                    to take your skills to the next level.
                    <br />
                    <br />
                    With Becodemy by your side, there’s nothing standing between you and your dream job. Our courses and
                    community will provide you with the guidance, support, and motivation you need to unleash your full
                    potential and become a skilled programmer.
                    <br />
                    <br />
                    So what are you waiting for? Join the Becodemy family today and let’s conquer the programming
                    industry together! With our affordable courses, informative videos, and supportive community, the
                    sky’s the limit.
                    <br />
                    <br />
                    <span className="text-[22px]">
                        <span className="text-[22px]">- ShahriarSajeeb</span>
                    </span>
                    <h5 className="text-[18px] font-Poppins">Founder and CEO of Becodemy</h5>
                </p>
            </div>
        </div>
    );
};

export default About;
