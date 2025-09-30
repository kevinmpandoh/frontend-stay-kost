// components/layout/Sidebar.tsx
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Ellipsis } from "lucide-react";
import { useSidebarStore } from "@/stores/sidebar.store";
import { AppLogo } from "../common/AppLogo";

type SubItem = { name: string; path: string; badge?: number };
export type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  badge?: number;
  subItems?: SubItem[];
};

type SidebarProps = {
  navItems: NavItem[];
  title?: string; // biar fleksibel
};

const Sidebar: React.FC<SidebarProps> = ({ navItems, title = "Menu" }) => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } =
    useSidebarStore();
  const pathname = usePathname();

  const isActive = useCallback((path: string) => path === pathname, [pathname]);
  const isAnySubItemActive = (subItems?: SubItem[]) =>
    subItems?.some((sub) => isActive(sub.path));

  const [openSubmenu, setOpenSubmenu] = useState<{ index: number } | null>(
    null,
  );
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {},
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    let matched = false;
    navItems.forEach((nav, index) => {
      nav.subItems?.forEach((sub) => {
        if (isActive(sub.path)) {
          setOpenSubmenu({ index });
          matched = true;
        }
      });
    });
    if (!matched) setOpenSubmenu(null);
  }, [pathname, isActive, navItems]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu((prev) => (prev?.index === index ? null : { index }));
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-50 mt-16 flex h-screen flex-col border-r border-gray-200 bg-white px-5 text-gray-900 transition-all duration-300 ease-in-out lg:mt-0 dark:border-gray-800 dark:bg-gray-900 ${
        isExpanded || isMobileOpen
          ? "w-[290px]"
          : isHovered
            ? "w-[290px]"
            : "w-[90px]"
      } ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div className={`flex justify-center py-8`}>
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <AppLogo />
          ) : (
            <AppLogo mode="icon" />
          )}
        </Link>
      </div>

      {/* Menu */}
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 flex text-xs leading-[20px] text-gray-400 uppercase ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? title : <Ellipsis />}
              </h2>

              <ul className="flex flex-col gap-4">
                {navItems.map((nav, index) => {
                  const isSubActive = isAnySubItemActive(nav.subItems);

                  return (
                    <li key={nav.name}>
                      {nav.subItems ? (
                        <button
                          onClick={() => handleSubmenuToggle(index)}
                          className={`menu-item group cursor-pointer ${
                            isSubActive
                              ? "menu-item-active"
                              : "menu-item-inactive"
                          }`}
                        >
                          <span>{nav.icon}</span>
                          {(isExpanded || isHovered || isMobileOpen) && (
                            <span className="menu-item-text">{nav.name}</span>
                          )}
                          {(isExpanded || isHovered || isMobileOpen) && (
                            <ChevronDown
                              className={`ml-auto h-5 w-5 transition-transform duration-200 ${
                                openSubmenu?.index === index ? "rotate-180" : ""
                              }`}
                            />
                          )}
                        </button>
                      ) : (
                        nav.path && (
                          <Link
                            href={nav.path}
                            className={`menu-item group ${
                              isActive(nav.path)
                                ? "menu-item-active"
                                : "menu-item-inactive"
                            }`}
                          >
                            <span>{nav.icon}</span>
                            {(isExpanded || isHovered || isMobileOpen) && (
                              <span className="menu-item-text">{nav.name}</span>
                            )}
                          </Link>
                        )
                      )}

                      {nav.subItems &&
                        (isExpanded || isHovered || isMobileOpen) && (
                          <div
                            ref={(el) => {
                              subMenuRefs.current[`${index}`] = el;
                            }}
                            className="overflow-hidden transition-all duration-300"
                            style={{
                              height:
                                openSubmenu?.index === index
                                  ? `${subMenuHeight[`${index}`]}px`
                                  : "0px",
                            }}
                          >
                            <ul className="mt-2 ml-9 space-y-1">
                              {nav.subItems.map((subItem) => (
                                <li key={subItem.name}>
                                  <Link
                                    href={subItem.path}
                                    className={`menu-dropdown-item ${
                                      isActive(subItem.path)
                                        ? "menu-dropdown-item-active"
                                        : "menu-dropdown-item-inactive"
                                    }`}
                                  >
                                    {subItem.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
