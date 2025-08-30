import { styles } from "@/app/styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";

type Props = {
    courseInfo: any;
    setCourseInfo: (courseInfo: any) => void;
    active: number;
    setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({ courseInfo, setCourseInfo, active, setActive }) => {
    const [dragging, setDragging] = useState(false);
    const [categories, setCategories] = useState([]);

    const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
        refetchOnMountOrArgChange: true,
    });
    //console.log("data", data);
    //console.log("categories", categories);

    useEffect(() => {
        if (data) {
            setCategories(data?.layout?.categories);
        }
    }, [data]);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setActive(active + 1);
    };
    const handleFileChange = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    setCourseInfo({ ...courseInfo, thumbnail: reader.result });
                }
            };
            reader.readAsDataURL(file);
        }
    };
    const handleDragOver = (e: any) => {
        e.preventDefault();
        setDragging(true);
    };
    const handleDragLeave = (e: any) => {
        e.preventDefault();
        setDragging(false);
    };
    const handleDrop = (e: any) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                setCourseInfo({ ...courseInfo, thumbnail: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className="w-[80%] m-auto mt-24">
            <form onSubmit={handleSubmit} className="${styles.label}">
                <div>
                    <label className={`${styles.label}`} htmlFor="">
                        Course Name
                    </label>

                    <input
                        type="name"
                        name=""
                        required
                        value={courseInfo?.name}
                        onChange={(e: any) => setCourseInfo({ ...courseInfo, name: e.target.value })}
                        id="name"
                        placeholder="MERN STack LMS Platform with NextJS 13"
                        className={`
                        ${styles.input}
                        `}
                    />
                </div>
                <br />
                <div className="mb-5">
                    <label className={`${styles.label}`}> Course Description</label>
                    <textarea
                        id=""
                        name=""
                        cols={30}
                        rows={8}
                        required
                        value={courseInfo?.description}
                        onChange={(e: any) => setCourseInfo({ ...courseInfo, description: e.target.value })}
                        placeholder="Write something amazing..."
                        className={`
                        ${styles.input} !h-min !py-2 
                        `}
                    />
                </div>
                <br />
                <div className="w-full flex justify-between">
                    <div className="w-[45%]">
                        <label className={`${styles.label}`}>Course Price</label>
                        <input
                            type="number"
                            name=""
                            required
                            value={courseInfo?.price}
                            onChange={(e: any) => setCourseInfo({ ...courseInfo, price: e.target.value })}
                            id="price"
                            placeholder="29"
                            className={`
                        ${styles.input}
                        `}
                        />
                    </div>
                    <div className="w-[45%]">
                        <label className={`${styles.label}`}>Estimated Price (optional)</label>
                        <input
                            type="number"
                            name=""
                            required
                            value={courseInfo?.estimatedPrice}
                            onChange={(e: any) => setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })}
                            id="price"
                            placeholder="79"
                            className={`
                        ${styles.input}
                        `}
                        />
                    </div>
                </div>
                <br />
                <div className="w-full flex justify-between">
                    <div className="w-[45%]">
                        <label className={`${styles.label}`}>Course Tags</label>
                        <input
                            type="text"
                            name=""
                            required
                            value={courseInfo?.tags}
                            onChange={(e: any) => setCourseInfo({ ...courseInfo, tags: e.target.value })}
                            id="tags"
                            placeholder="MERN, NEXT 13, SOCKET IO, Tailwind css, LMS"
                            className={`
                        ${styles.input}
                        `}
                        />
                    </div>
                    <div className="w-[45%]">
                        <label className={`${styles.label} w-[45%]`}>Course Categories</label>
                        <select
                            name=""
                            id=""
                            onChange={(e: any) => setCourseInfo({ ...courseInfo, category: e.target.value })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-[40px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-[10px] px-2 "
                        >
                            <option value="">Select Category</option>
                            {categories?.map((item: any) => (
                                <option value={item?._id} key={item._id}>
                                    {item.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <br />
                <div className="w-full flex justify-between">
                    <div className="w-[45%]">
                        <label className={`${styles.label}`}>Course Level</label>
                        <input
                            type="text"
                            name=""
                            required
                            value={courseInfo?.level}
                            onChange={(e: any) => setCourseInfo({ ...courseInfo, level: e.target.value })}
                            id="level"
                            placeholder="Begineer/Intermediate/Expert"
                            className={`
                        ${styles.input}
                        `}
                        />
                    </div>
                    <div className="w-[45%]">
                        <label className={`${styles.label}`}>Demo URL</label>
                        <input
                            type="text"
                            name=""
                            required
                            value={courseInfo?.demoUrl}
                            onChange={(e: any) => setCourseInfo({ ...courseInfo, demoUrl: e.target.value })}
                            id="demoUrl"
                            placeholder="themovie.vercel.com"
                            className={`
                        ${styles.input}
                        `}
                        />
                    </div>
                </div>
                <br />
                <div className="w-full max-h-[300px]">
                    <input type="file" accept="image/*" id="file" className="hidden" onChange={handleFileChange} />
                    <label
                        htmlFor="file"
                        className={`w-full min-h-[10vh]  dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
                            dragging ? "bg-blue-500" : "bg-transparent"
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {courseInfo.thumbnail ? (
                            <img src={courseInfo.thumbnail} alt="" className="max-w-[300px] w-full object-cover" />
                        ) : (
                            <span className="text-black dark:text-white">
                                Drag and drop your thumbnail here or click to browse
                            </span>
                        )}
                    </label>
                </div>
                <br />
                <div className="w-full flex items-center justify-end pt-[24px] pb-[24px]">
                    <input
                        type="submit"
                        value="Next"
                        className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    />
                </div>
            </form>
        </div>
    );
};

export default CourseInformation;
