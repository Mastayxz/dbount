import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import {
  HiHome,
  HiClipboardList,
  HiPlusCircle,
  HiOutlineLightningBolt,
} from "react-icons/hi";
import React from "react";
const customSidebarTheme = {
  root: {
    base: "h-full border-r-0 shadow-none", // menghilangkan border & shadow
    collapsed: {
      on: "w-16",
      off: "w-64",
    },
    inner: "bg-gray-100 dark:bg-gray-900",
  },
};

const SideBar = () => {
  return (
    <Sidebar aria-label="Sidebar navigation" theme={customSidebarTheme}>
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem href="/" icon={HiHome}>
            Home
          </SidebarItem>
          <SidebarItem href="/my-bounty" icon={HiClipboardList}>
            Bounty
          </SidebarItem>
          <SidebarItem href="/submit" icon={HiPlusCircle}>
            Create Problem
          </SidebarItem>
          <SidebarItem href="/activities" icon={HiOutlineLightningBolt}>
            Activities
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
};

export default SideBar;
