import TicketSchedule from "../scenes/TicketSchedule/index";
import TicketManagement from "../scenes/TicketManagement/index";
import Report from "../scenes/Report/index";
import Notification from "../scenes/Notification/index";
import More from "../scenes/More/index";
const listTabar = [
  {
    title: "Lịch bán vé",
    tabName: "ticketSchedule",
    component: TicketSchedule,
    img: require("../images/calendar.png")
  },
  {
    title: "Quản lý vé",
    tabName: "ticketManagement",
    component: TicketManagement,
    img: require("../images/manager.png")
  },
  {
    title: "Thống kê",
    tabName: "report",
    component: Report,
    img: require("../images/chart.png")
  },
  {
    title: "Thông báo",
    tabName: "notification",
    component: Notification,
    img: require("../images/noti.png"),
    badgeText: "5"
  },
  {
    title: "Thêm",
    tabName: "more",
    component: More,
    img: require("../images/more.png")
  }
];
export default listTabar;
