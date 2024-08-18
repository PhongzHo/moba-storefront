"use client"
import React from 'react';
import { Button, clx } from "@medusajs/ui"
import { BarsThree } from "@medusajs/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"


interface DropdownMenuProps {
    items: { name: string; handle: string }[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ items }) => {
    // Hàm để mở/đóng dropdown menu
    const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); // Ngăn sự kiện click truyền ra ngoài
        const dropdown = document.getElementById('dropdown-menu');
        if (dropdown) {
            dropdown.classList.toggle('hidden');
        }
    };

    // Hàm để đóng dropdown menu khi nhấn ra ngoài
    const handleClickOutside = (event: MouseEvent) => {
        const dropdown = document.getElementById('dropdown-menu');
        const button = document.getElementById('dropdown-button');
        if (
            dropdown &&
            !dropdown.contains(event.target as Node) &&
            button &&
            !button.contains(event.target as Node)
        ) {
            dropdown.classList.add('hidden');
        }
    };

    // Thêm sự kiện nhấn chuột vào document
    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left">
            {/* Nút Menu */}
            <Button
                id="dropdown-button"
                onClick={toggleDropdown}
                size='large'
                variant='transparent'
                className="flex items-center rounded-full text-black bg-moba-green"
            >
                <span>Danh Mục</span>
            </Button>

            {/* Menu Dropdown */}
            <div
                id="dropdown-menu"
                className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 rounded-lg shadow-lg hidden" // Sử dụng lớp hidden để ẩn menu
            >
                <ul className="py-1">   
                    {items.map((item) => (
                        <li key={item.handle} className="hover:bg-gray-100">
                            <a
                                href={item.handle}
                                className="block px-4 py-2 text-gray-700 hover:text-blue-500"
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DropdownMenu;
