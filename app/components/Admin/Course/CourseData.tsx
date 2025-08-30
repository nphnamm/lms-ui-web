import { styles } from "@/app/styles/style";
import { useTheme } from "next-themes";
import React, { FC } from "react";
import toast from "react-hot-toast";
import { MdAddCircle } from "react-icons/md";

type Props = {
    benefits: { title: string }[];
    setBenefits: (benefits: { title: string }[]) => void;
    prerequisites: { title: string }[];
    setPrerequisites: (prerequisites: { title: string }[]) => void;
    active: number;
    setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({ benefits, setBenefits, prerequisites, setPrerequisites, active, setActive }) => {
    const handleBenefitChange = (index: number, value: any) => {
        const updatedBenefits = [...benefits];
        updatedBenefits[index].title = value;
        setBenefits(updatedBenefits);
    };
    const { theme } = useTheme();
    // console.log('thême',theme)
    const handlePrerequisitesChange = (index: number, value: any) => {
        const updatedPrerequisites = [...prerequisites];
        updatedPrerequisites[index].title = value;
        setPrerequisites(updatedPrerequisites);
    };

    const handleAddBenefit = () => {
        setBenefits([...benefits, { title: "" }]);
    };
    const handleAddPrerequisite = () => {
        setPrerequisites([...prerequisites, { title: "" }]);
    };
    const preButton = () => {
        setActive(active - 1);
    };
    const handleOption = () => {
        if (benefits[benefits.length - 1]?.title !== "" && prerequisites[prerequisites.length - 1]?.title !== "") {
            setActive(active + 1);
        } else {
            toast.error("Please fill the fields for go to next");
        }
    };
    return (
        <div className="w-[80%] m-auto mt-24 block">
            <div>
                <label className={`${styles.label} text-[20px]`} htmlFor="email">
                    What are the benefits for students in this course?
                </label>
                <br />
                {benefits.map((benefit: any, index: number) => (
                    <input
                        type="text"
                        key={index}
                        name="Benefit"
                        placeholder="You will be able to build a full stack LMS Platform"
                        onChange={(e) => handleBenefitChange(index, e.target.value)}
                        required
                        className={`${styles.input} my-2`}
                        value={benefit.title}
                    />
                ))}
                <MdAddCircle
                    style={{
                        margin: "10px 0px",
                        cursor: "pointer",
                        width: "30px",
                        color: `${theme == "dark" ? "white" : "black"}`,
                    }}
                    onClick={handleAddBenefit}
                />
            </div>
            <div>
                <label className={`${styles.label} text-[20px]`} htmlFor="email">
                    What are the prerequisites for starting this course?
                </label>
                <br />
                {prerequisites.map((prerequisite: any, index: number) => (
                    <input
                        type="text"
                        key={index}
                        name="Prerequisites"
                        placeholder="You will be able to build a full stack LMS Platform"
                        onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
                        required
                        className={`${styles.input} my-2`}
                        value={prerequisite.title}
                    />
                ))}
                <MdAddCircle
                    style={{
                        margin: "10px 0px",
                        cursor: "pointer",
                        width: "30px",
                        color: `${theme == "dark" ? "white" : "black"}`,
                    }}
                    onClick={handleAddPrerequisite}
                />
            </div>
            <div className="w-full flex items-center justify-between">
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8"
                    onClick={() => preButton()}
                >
                    Previous
                </div>
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8"
                    onClick={() => handleOption()}
                >
                    Next
                </div>
            </div>
        </div>
    );
};

export default CourseData;
