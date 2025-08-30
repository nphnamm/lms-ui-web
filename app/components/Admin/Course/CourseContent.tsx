import { styles } from "@/app/styles/style";
import React, { FC, useState } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa"; // From Font Awesome set
import { BsLink45Deg } from "react-icons/bs";
import toast from "react-hot-toast";
import VideoUpload from "../../Course/UploadVideo";

type Props = {
    active: number;
    setActive: (active: number) => void;
    courseContentData: any;
    setCourseContentData: (setCourseContentData: any) => void;
    handleSubmit: any;
};

const CourseContent: FC<Props> = ({
    courseContentData,
    setCourseContentData,
    active,
    setActive,
    handleSubmit: handleCourseSubmit,
}) => {
    const [isCollapsed, setIsCollapsed] = useState(Array(courseContentData.length).fill(false));
    const [activeSection, setActiveSection] = useState(1);
    const [isAutoUpload, setIsAutoUpload] = useState(true);
    const handleSubmit = (e: any) => {
        e.preventDefault();
    };
    const handleCollapsedToggle = (index: number) => {
        const updatedCollapsed = [...isCollapsed];
        updatedCollapsed[index] = !updatedCollapsed[index];
        setIsCollapsed(updatedCollapsed);
    };
    const handleremoveLink = (index: number, linkIndex: number) => {
        const updateData = [...courseContentData];
        updateData[index].links.splice(linkIndex, 1);
        setCourseContentData(updateData);
    };
    const handleAddLink = (index: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].links.push({ title: "", url: "" });
        setCourseContentData(updatedData);
    };
    const newContentHandler = (item: any) => {
        // console.log('item', item);
        if (item.title === "" || item.description === "" || item.videoUrl === "") {
            toast.error("Please fill all the filed first ");
        } else {
            let newVideoSection = "";
            if (courseContentData.length > 0) {
                const lastVideoSection = courseContentData[courseContentData.length - 1].videoSection;
                // use the last videoSection if available, else use user input
                if (lastVideoSection) {
                    newVideoSection = lastVideoSection;
                }
            }
            const newContent = {
                videoUrl: "",
                title: "",
                description: "",
                videoSection: newVideoSection,
                links: [{ title: "", url: "" }],
            };
            setCourseContentData([...courseContentData, newContent]);
        }
    };
    const addNewSection = () => {
        if (
            courseContentData[courseContentData.length - 1]?.title === "" ||
            courseContentData[courseContentData.length - 1]?.description === "" ||
            courseContentData[courseContentData.length - 1]?.videoUrl === "" ||
            courseContentData[courseContentData.length - 1]?.links[0].title === "" ||
            courseContentData[courseContentData.length - 1]?.links[0].url === ""
        ) {
            toast.error("Please fill all the fields first!");
        } else {
            setActiveSection(activeSection + 1);
            const newContent = {
                videoUrl: "",
                title: "",
                description: "",
                videoSection: `Untitled Section ${activeSection}`,
                links: [{ title: "", url: "" }],
            };
            setCourseContentData([...courseContentData, newContent]);
        }
    };
    const prevButton = () => {
        setActive(active - 1);
    };
    const handleOptions = () => {
        // console.log('1', courseContentData[courseContentData.length - 1])
        if (
            courseContentData[courseContentData.length - 1]?.title === "" ||
            courseContentData[courseContentData.length - 1]?.description === "" ||
            courseContentData[courseContentData.length - 1]?.videoUrl === "" ||
            courseContentData[courseContentData.length - 1]?.links[0].title === ""
        ) {
            toast.error("Section can't be empty");
        } else {
            setActive(active + 1);
            handleCourseSubmit();
        }
    };
    const handleCheckboxChange = () => {
        setIsAutoUpload(!isAutoUpload);
    };
    const handleVideoUpload = (index: number, videoUrl: string) => {
        console.log('video' ,videoUrl)
        const updatedData = [...courseContentData];
        updatedData[index].videoUrl = videoUrl;
        setCourseContentData(updatedData);
    };
    console.log('courseData', courseContentData)
    return (
        <div className="w-[80%] m-auto mt-24 p-3">
            <form className="shadow-xl ">
                {courseContentData?.map((item: any, index: number) => {
                    const showSectionInput =
                        index === 0 || item.videoSection !== courseContentData[index - 1].videoSection;

                    return (
                        <>
                            <div className={` w-full bg-[#cdc8c817] p-4 ${showSectionInput ? "mt-10" : "mb-0"}`}>
                                {showSectionInput && (
                                    <>
                                        <div className="flex w-full items-center">
                                            <input
                                                type="text"
                                                className={`text-[20px]
                                                          ${
                                                              item.videoSection === "Untitled Section"
                                                                  ? "w-[170px]"
                                                                  : "w-min"
                                                          }  font-Poppins cursor-pointer dark:text-white text-black bg-transparent border border-2
                                                        `}
                                                value={item.videoSection}
                                                onChange={(e) => {
                                                    const updatedData = [...courseContentData];
                                                    updatedData[index].videoSection = e.target.value;
                                                    setCourseContentData(updatedData);
                                                }}
                                            />
                                            <FaPencilAlt className="cursor-pointer dark:text-white text-black" />
                                        </div>
                                    </>
                                )}
                                <div className="flex w-full items-center justify-between my-0">
                                    {isCollapsed[index] ? (
                                        <>
                                            {item.title ? (
                                                <p className="font-Poppins dark:text-white text-black">
                                                    {index + 1}. {item.title}
                                                </p>
                                            ) : (
                                                <></>
                                            )}
                                        </>
                                    ) : (
                                        <div></div>
                                    )}
                                    {/* // arrow button for collapsed video content */}
                                    <div className="flex items-center">
                                        <AiOutlineDelete
                                            className={`dark:text-white text-[20px] mr-2 text-black ${
                                                index > 0 ? "curosr-pointer" : "cursor-no-drop"
                                            }`}
                                            onClick={() => {
                                                if (index > 0) {
                                                    const updateData = [...courseContentData];
                                                    updateData.splice(index, 1);
                                                    setCourseContentData(updateData);
                                                }
                                            }}
                                        />
                                        {/* 
                                        <MdOutlineKeyboardArrowDown
                                            fontSize="large"
                                            className='dark:text-white text-black'
                                            style={{
                                                transform: isCollapsed[index] ? "rotate(180deg) : "rotate(0deg)",
                                        }}
                                            onClick={() => handleCollapsedToggle(index)}
                                        /> */}
                                        <MdOutlineKeyboardArrowDown
                                            fontSize="large"
                                            className="dark:text-white text-black"
                                            style={{
                                                transform: isCollapsed[index] ? "rotate(180deg)" : "rotate(0deg)",
                                            }}
                                            onClick={() => handleCollapsedToggle(index)}
                                        />
                                    </div>
                                </div>
                                {!isCollapsed[index] && (
                                    <>
                                        <div className="my-3">
                                            <label className={styles.label}>Video Title</label>
                                            <input
                                                type="text"
                                                placeholder="Project Plan..."
                                                className={`${styles.input}`}
                                                value={item.title}
                                                onChange={(e) => {
                                                    const updateData = [...courseContentData];
                                                    updateData[index].title = e.target.value;
                                                    setCourseContentData(updateData);
                                                }}
                                            />
                                        </div>
                                        <div className="flex items-center gap-4 my-3">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={isAutoUpload}
                                                    onChange={() => handleCheckboxChange()}
                                                />{" "}
                                                Auto Upload
                                            </label>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={!isAutoUpload}
                                                    onChange={() => handleCheckboxChange()}
                                                />{" "}
                                                Embed Link
                                            </label>
                                        </div>

                                        {isAutoUpload ? (
                                            <VideoUpload
                                                onUploadComplete={(videoUrl: string) =>
                                                    handleVideoUpload(index, videoUrl)
                                                }
                                            />
                                        ) : !isAutoUpload ? (
                                            <input
                                                type="text"
                                                placeholder="Enter video embed link"
                                                className={`${styles.input}`}
                                                value={item.videoUrl}
                                                onChange={(e) => {
                                                    const updatedData = [...courseContentData];
                                                    updatedData[index].videoUrl = e.target.value;
                                                    setCourseContentData(updatedData);
                                                }}
                                            />
                                        ) : null}

                                        <div className="mb-3">
                                            <label className={styles.label}>Video Length (in minutes)</label>
                                            <input
                                                type="number"
                                                placeholder="20"
                                                className={`${styles.input}`}
                                                value={item.videoLength}
                                                onChange={(e) => {
                                                    const updateData = [...courseContentData];
                                                    updateData[index].videoLength = e.target.value;
                                                    setCourseContentData(updateData);
                                                }}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className={styles.label}>Video Description</label>
                                            <textarea
                                                rows={8}
                                                cols={30}
                                                placeholder="sdder"
                                                className={`${styles.input} !h-min py-2`}
                                                value={item.description}
                                                onChange={(e) => {
                                                    const updateData = [...courseContentData];
                                                    updateData[index].description = e.target.value;
                                                    setCourseContentData(updateData);
                                                }}
                                            />
                                            <br />
                                            <br />
                                            <br />
                                            {item?.links.map((link: any, linkIndex: number) => (
                                                <div key={linkIndex} className="mb-3 block">
                                                    <div className="w-full flex items-center justify-between">
                                                        <label className={styles.label}>Link {linkIndex + 1}</label>
                                                        <AiOutlineDelete
                                                            className={`${
                                                                linkIndex === 0 ? "cursor-no-drop" : "cursor-pointer"
                                                            } text-black dark:text-white text-[20px]`}
                                                            onClick={() => {
                                                                linkIndex === 0
                                                                    ? null
                                                                    : handleremoveLink(index, linkIndex);
                                                            }}
                                                        />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        placeholder="Source Code...(Link title)"
                                                        className={`${styles.input}`}
                                                        value={link.title}
                                                        onChange={(e) => {
                                                            const updateData = [...courseContentData];
                                                            updateData[index].links[linkIndex].title = e.target.value;
                                                            setCourseContentData(updateData);
                                                        }}
                                                    />
                                                    <input
                                                        type="url"
                                                        placeholder="Source Code Url...(Link URL)"
                                                        className={`${styles.input} mt-6`}
                                                        value={link.url}
                                                        onChange={(e) => {
                                                            const updateData = [...courseContentData];
                                                            updateData[index].links[linkIndex].url = e.target.value;
                                                            setCourseContentData(updateData);
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                            <br />
                                            <div className="inline-block mb-4">
                                                <p
                                                    onClick={() => handleAddLink(index)}
                                                    className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                                                >
                                                    <BsLink45Deg className="mr-2" /> Add Link
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}
                                <br />
                                {index === courseContentData.length - 1 && (
                                    <div>
                                        <p
                                            className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                                            onClick={(e: any) => newContentHandler(item)}
                                        >
                                            <AiOutlinePlusCircle className="mr-2" /> Add New Content
                                        </p>
                                    </div>
                                )}
                            </div>
                        </>
                    );
                })}
                <br />
                <div
                    className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
                    onClick={() => addNewSection()}
                >
                    Add new section
                </div>
            </form>
            <br />
            <div className="w-full flex items-center justify-between">
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={() => prevButton()}
                >
                    Prev
                </div>
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={() => handleOptions()}
                >
                    Next
                </div>
            </div>
        </div>
    );
};

export default CourseContent;
