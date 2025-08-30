"use client";
import ThemeSwitcher from "@/app/utils/ThemeSwitcher";
import { FC, useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import {
    useGetAllNotificationsQuery,
    useUpdateNotificationStatusMutation,
} from "@/redux/features/nofitications/notificationsApi";
import io from "socket.io-client";
import { format } from "timeago.js";
const ENDPOINT = "http://localhost:8000";
const socket = io("ws://localhost:8000", {
    transports: ["websocket"],
});

type Props = {
    open?: boolean;
    setOpen?: any;
};
const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
    const { data, refetch } = useGetAllNotificationsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    const [updateNotifcationStatus, { isSuccess }] = useUpdateNotificationStatusMutation();
    const [notifications, setNotifications] = useState<any>([]);
    const [audio] = useState(
        new Audio("https://res.cloudinary.com/damk25wo5/video/upload/v1693465789/notification_vcetjn.mp3")
    );
    const playNotificationSound = () => {
        // audio.play();
    };
    useEffect(() => {
        if (data) {
            setNotifications(data.notifications.filter((item: any) => item.status === "unread"));
        }

        if (isSuccess) {
            refetch();
        }
        // audio.play();
    }, [data, isSuccess]);
    socket.on("newNotification", (data) => {
        console.log(data);
        refetch();
        playNotificationSound();
    });
    useEffect(() => {}, []);
    const handleNotificationStatusChange = async (id: string) => {
        await updateNotifcationStatus(id);
    };

    return (
        <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0">
            <ThemeSwitcher />
            <div className="relative cursor-pointer m-2" onClick={() => setOpen(!open)}>
                <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
                <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] text-[12px] flex items-center justify-center text-white">
                    {notifications && notifications.length}
                </span>
            </div>
            {open && (
                <div className="w-[350px] h-[50vh] dark:bg-[#111C43] bg-white shadow-xl absolute top-16  rounded  !z-9999 overflow-auto">
                    <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
                        Notifications
                    </h5>
                    {notifications &&
                        notifications.map((item: any, index: number) => (
                            <div
                                className="dark:bg-[#2d3a3ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]"
                            >
                                <div className="w-full flex items-center justify-between p-2">
                                    <p className="text-black dark:text-white">{item.title}</p>
                                    <p
                                        className="text-black dark:text-white cursor-pointer"
                                        onClick={() => handleNotificationStatusChange(item._id)}
                                    >
                                        Mark as read
                                    </p>
                                </div>
                                <p className="px-2 text-black dark:text-white">{item.message}</p>
                                <p className="p-2 text-black dark:text-white text-[14px]">{format(item?.createdAt)}</p>
                            </div>
                        ))}

                    <div />
                </div>
            )}
        </div>
    );
};
export default DashboardHeader;
