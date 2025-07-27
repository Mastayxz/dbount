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
  HiMenuAlt3,
} from "react-icons/hi";

import { motion } from "framer-motion";
import React from "react";
import { useState } from "react";


const customSidebarTheme = {
  root: {
    base: "h-full border-r-0 shadow-none fixed", // menghilangkan border & shadow
    collapsed: {
      on: "16",
      off: "w-64",
    },
    inner: "bg-gray-100 dark:bg-gray-900",
  },
};

const SideBar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Sidebar aria-label="Sidebar navigation" theme={customSidebarTheme} collapsed={isCollapsed}>

        {/* Tombol toggle */}
      <motion.div
      animate={{ width: isCollapsed ? 64 : 200 }} 
      transition={{ duration: 0.3 , ease : "easeInOut" }}
      className="flex items-center justify-end p-2"
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-500 hover:text-gray-800 "
        >
          <HiMenuAlt3 size={24} />
        </button>
      </motion.div>

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
