"use client";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import CourseCard from "../components/Course/CourseCard";
import { styles } from "../styles/style";
import Heading from "../utils/Heading";
import About from "./about";

type Props = {};

const Page = (props: Props) => {
    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(2);
    return (
        <div>
            <Heading
                title={"All courses - Elearning"}
                description={"Elearning is a learning management system for helpling programmers"}
                keywords={"programming community, coding skills, expert insights, collaboration, growth"}
            />
            <Header open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} route={route} />

            <About />
        </div>
    );
};

export default Page;

