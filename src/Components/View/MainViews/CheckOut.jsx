import React, { useState } from "react";
import Box from "../SubViews/BoxAndLIst/Box";
import {
  MapPinIcon,
  PlusCircleIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import CusLoaction from "../GooleMap/CusLoaction";

const CheckOut = ({product, error, loading}) => {
  const KK = [
    {
      message: "Record founded",
      status: true,
      data: [
        {
          id: 81,
          barcode: "34343434343",
          productName:
            'Dell Latitude 7420 Core i5-1135G7 8GB (1x8GB) DDR4 256GB SSD M.2 PCIe NoDVDRW 14" FHD Non-Touch Ubuntu WLAN BT BL WC 4C (Grey+Black)',
          partNumber: "SNS21772726.2/21671556.2",
          specifications:
            'Model/SKU/Description\t:\tDell Latitude 7420\r\nProcessor/CPU\t:\tIntel Core i5-1135G7\r\nMemory/RAM\t:\t8GB, 2666 MHz, DDR4 Non-ECC\r\nHard Drive\t:\tM.2 256GB PCIe NVMe Class 35 Solid State Drive\r\nOptical Drive\t:\tNoDVDRW\r\nScreen Size\t:\t14" FHD Non-Touch\r\nOperating System\t:\tUbuntu\r\nBattery\t:\t4 Cell 63Whr\r\nWireless\t:\tIntel Wi-Fi 6 AX201 2x2 802.11ax 160MHz + Bluetooth 5.1\r\nGraphic/VGA/GPU\t:\tIntel Iris XE Graphics\r\nOther\t:\tNone',
          description:
            '486-61319 Dell Latitude 7420\r\n\r\n338-BYEX i5-1135G7 non-vPro, Intel Iris XE Graphics, 8GB Memory 1\r\n\r\n379-BEGU 11th Generation Intel Core i5-1135G7 (4 Core, 8M cache, base 2.4GHz, up to 4.2GHz) 1\r\n\r\n379-BDZB EPEAT 2018 Registered (Gold) 1\r\n\r\n391-BFRL Laptop 14.0" FHD Anti-glare, Non-Touch, WVA, 250 nits, HD RGB Cam,Mic, WLAN Only, Carbon Fiber 1\r\n\r\n370-AFMG 8GB, 2666 MHz, DDR4 Non-ECC, Integrated 1\r\n\r\n400-BIOJ M.2 256GB PCIe NVMe Class 35 Solid State Drive 1\r\n\r\n450-ABBR Power Cord for 3-pin Adapter (Cambodia) 1\r\n\r\n451-BCSM 4 Cell 63Whr ExpressChargeTM Capable Battery 1\r\n\r\n492-BCXP 65W Type-C Epeat Adapter 1\r\n\r\n555-BFVZ Intel Wi-Fi 6 AX201 2x2 802.11ax 160MHz + Bluetooth 5.1 1\r\n\r\n555-BGHO Wireless Intel AX201 WLAN Driver 1\r\n\r\n583-BHFD Single Point keyboard English US with backlit 1\r\n\r\n605-BBNY Ubuntu Linux 20.04 1\r\n\r\n709-17876 39M SADMG Rapid Parts Exchange Service-Channel 1\r\n\r\n883-10171 Battery Carries 1 Year Warranty from Invoice Date 1',
          price: "1200.00",
          discount: null,
          warranty: "12",
          subCategoryId: 1,
          brand: 1,
          created_at: "2024-03-04T06:48:20.000000Z",
          updated_at: "2024-03-04T06:48:20.000000Z",
          header_img:
            "https://www.evetech.co.za/repository/mobilev1/Laptop/ProImages/asus-tuf-gaming-a15-ryzen-7-rtx-2050-gaming-laptop-1000px-v1-0003.webp",
        },
        {
          id: 82,
          barcode: "34343434343",
          productName:
            'Dell Latitude 7420 Core i5-1135G7 8GB (1x8GB) DDR4 256GB SSD M.2 PCIe NoDVDRW 14" FHD Non-Touch Ubuntu WLAN BT BL WC 4C (Grey+Black)',
          partNumber: "SNS21772726.2/21671556.2",
          specifications:
            'Model/SKU/Description\t:\tDell Latitude 7420\r\nProcessor/CPU\t:\tIntel Core i5-1135G7\r\nMemory/RAM\t:\t8GB, 2666 MHz, DDR4 Non-ECC\r\nHard Drive\t:\tM.2 256GB PCIe NVMe Class 35 Solid State Drive\r\nOptical Drive\t:\tNoDVDRW\r\nScreen Size\t:\t14" FHD Non-Touch\r\nOperating System\t:\tUbuntu\r\nBattery\t:\t4 Cell 63Whr\r\nWireless\t:\tIntel Wi-Fi 6 AX201 2x2 802.11ax 160MHz + Bluetooth 5.1\r\nGraphic/VGA/GPU\t:\tIntel Iris XE Graphics\r\nOther\t:\tNone',
          description:
            '486-61319 Dell Latitude 7420\r\n\r\n338-BYEX i5-1135G7 non-vPro, Intel Iris XE Graphics, 8GB Memory 1\r\n\r\n379-BEGU 11th Generation Intel Core i5-1135G7 (4 Core, 8M cache, base 2.4GHz, up to 4.2GHz) 1\r\n\r\n379-BDZB EPEAT 2018 Registered (Gold) 1\r\n\r\n391-BFRL Laptop 14.0" FHD Anti-glare, Non-Touch, WVA, 250 nits, HD RGB Cam,Mic, WLAN Only, Carbon Fiber 1\r\n\r\n370-AFMG 8GB, 2666 MHz, DDR4 Non-ECC, Integrated 1\r\n\r\n400-BIOJ M.2 256GB PCIe NVMe Class 35 Solid State Drive 1\r\n\r\n450-ABBR Power Cord for 3-pin Adapter (Cambodia) 1\r\n\r\n451-BCSM 4 Cell 63Whr ExpressChargeTM Capable Battery 1\r\n\r\n492-BCXP 65W Type-C Epeat Adapter 1\r\n\r\n555-BFVZ Intel Wi-Fi 6 AX201 2x2 802.11ax 160MHz + Bluetooth 5.1 1\r\n\r\n555-BGHO Wireless Intel AX201 WLAN Driver 1\r\n\r\n583-BHFD Single Point keyboard English US with backlit 1\r\n\r\n605-BBNY Ubuntu Linux 20.04 1\r\n\r\n709-17876 39M SADMG Rapid Parts Exchange Service-Channel 1\r\n\r\n883-10171 Battery Carries 1 Year Warranty from Invoice Date 1',
          price: "1200.00",
          discount: null,
          warranty: null,
          subCategoryId: 1,
          brand: 1,
          created_at: "2024-03-04T12:47:59.000000Z",
          updated_at: "2024-03-12T16:13:08.000000Z",
          header_img:
            "https://www.evetech.co.za/repository/mobilev1/Laptop/ProImages/asus-tuf-gaming-a15-ryzen-7-rtx-2050-gaming-laptop-1000px-v1-0003.webp",
        },
        {
          id: 83,
          barcode: "454354",
          productName:
            'Dell Latitude 7420 Core i5-1135G7 8GB (1x8GB) DDR4 256GB SSD M.2 PCIe NoDVDRW 14" FHD Non-Touch Ubuntu WLAN BT BL WC 4C (Grey+Black)',
          partNumber: "SNS21772726.2/21671556.2",
          specifications:
            'Model/SKU/Description\t:\tDell Latitude 7420\r\nProcessor/CPU\t:\tIntel Core i5-1135G7\r\nMemory/RAM\t:\t8GB, 2666 MHz, DDR4 Non-ECC\r\nHard Drive\t:\tM.2 256GB PCIe NVMe Class 35 Solid State Drive\r\nOptical Drive\t:\tNoDVDRW\r\nScreen Size\t:\t14" FHD Non-Touch\r\nOperating System\t:\tUbuntu\r\nBattery\t:\t4 Cell 63Whr\r\nWireless\t:\tIntel Wi-Fi 6 AX201 2x2 802.11ax 160MHz + Bluetooth 5.1\r\nGraphic/VGA/GPU\t:\tIntel Iris XE Graphics\r\nOther\t:\tNone',
          description:
            '486-61319 Dell Latitude 7420\r\n\r\n338-BYEX i5-1135G7 non-vPro, Intel Iris XE Graphics, 8GB Memory 1\r\n\r\n379-BEGU 11th Generation Intel Core i5-1135G7 (4 Core, 8M cache, base 2.4GHz, up to 4.2GHz) 1\r\n\r\n379-BDZB EPEAT 2018 Registered (Gold) 1\r\n\r\n391-BFRL Laptop 14.0" FHD Anti-glare, Non-Touch, WVA, 250 nits, HD RGB Cam,Mic, WLAN Only, Carbon Fiber 1\r\n\r\n370-AFMG 8GB, 2666 MHz, DDR4 Non-ECC, Integrated 1\r\n\r\n400-BIOJ M.2 256GB PCIe NVMe Class 35 Solid State Drive 1\r\n\r\n450-ABBR Power Cord for 3-pin Adapter (Cambodia) 1\r\n\r\n451-BCSM 4 Cell 63Whr ExpressChargeTM Capable Battery 1\r\n\r\n492-BCXP 65W Type-C Epeat Adapter 1\r\n\r\n555-BFVZ Intel Wi-Fi 6 AX201 2x2 802.11ax 160MHz + Bluetooth 5.1 1\r\n\r\n555-BGHO Wireless Intel AX201 WLAN Driver 1\r\n\r\n583-BHFD Single Point keyboard English US with backlit 1\r\n\r\n605-BBNY Ubuntu Linux 20.04 1\r\n\r\n709-17876 39M SADMG Rapid Parts Exchange Service-Channel 1\r\n\r\n883-10171 Battery Carries 1 Year Warranty from Invoice Date 1',
          price: "1200.00",
          discount: null,
          warranty: null,
          subCategoryId: 1,
          brand: 1,
          created_at: "2024-03-04T12:49:52.000000Z",
          updated_at: "2024-03-12T16:13:16.000000Z",
          header_img:
            "https://www.evetech.co.za/repository/mobilev1/Laptop/ProImages/asus-tuf-gaming-a15-ryzen-7-rtx-2050-gaming-laptop-1000px-v1-0003.webp",
        },
        {
          id: 84,
          barcode: "CJS3220260372",
          productName:
            'Dell Latitude 7420 Core i5-1135G7 8GB (1x8GB) DDR4 256GB SSD M.2 PCIe NoDVDRW 14" FHD Non-Touch Ubuntu WLAN BT BL WC 4C (Grey+Black)',
          partNumber: "SNS21772726.2/21671556.2",
          specifications:
            'Model/SKU/Description\t:\tDell Latitude 7420\r\nProcessor/CPU\t:\tIntel Core i5-1135G7\r\nMemory/RAM\t:\t8GB, 2666 MHz, DDR4 Non-ECC\r\nHard Drive\t:\tM.2 256GB PCIe NVMe Class 35 Solid State Drive\r\nOptical Drive\t:\tNoDVDRW\r\nScreen Size\t:\t14" FHD Non-Touch\r\nOperating System\t:\tUbuntu\r\nBattery\t:\t4 Cell 63Whr\r\nWireless\t:\tIntel Wi-Fi 6 AX201 2x2 802.11ax 160MHz + Bluetooth 5.1\r\nGraphic/VGA/GPU\t:\tIntel Iris XE Graphics\r\nOther\t:\tNone',
          description:
            '486-61319 Dell Latitude 7420\r\n\r\n338-BYEX i5-1135G7 non-vPro, Intel Iris XE Graphics, 8GB Memory 1\r\n\r\n379-BEGU 11th Generation Intel Core i5-1135G7 (4 Core, 8M cache, base 2.4GHz, up to 4.2GHz) 1\r\n\r\n379-BDZB EPEAT 2018 Registered (Gold) 1\r\n\r\n391-BFRL Laptop 14.0" FHD Anti-glare, Non-Touch, WVA, 250 nits, HD RGB Cam,Mic, WLAN Only, Carbon Fiber 1\r\n\r\n370-AFMG 8GB, 2666 MHz, DDR4 Non-ECC, Integrated 1\r\n\r\n400-BIOJ M.2 256GB PCIe NVMe Class 35 Solid State Drive 1\r\n\r\n450-ABBR Power Cord for 3-pin Adapter (Cambodia) 1\r\n\r\n451-BCSM 4 Cell 63Whr ExpressChargeTM Capable Battery 1\r\n\r\n492-BCXP 65W Type-C Epeat Adapter 1\r\n\r\n555-BFVZ Intel Wi-Fi 6 AX201 2x2 802.11ax 160MHz + Bluetooth 5.1 1\r\n\r\n555-BGHO Wireless Intel AX201 WLAN Driver 1\r\n\r\n583-BHFD Single Point keyboard English US with backlit 1\r\n\r\n605-BBNY Ubuntu Linux 20.04 1\r\n\r\n709-17876 39M SADMG Rapid Parts Exchange Service-Channel 1\r\n\r\n883-10171 Battery Carries 1 Year Warranty from Invoice Date 1',
          price: "1200.00",
          discount: null,
          warranty: null,
          subCategoryId: 1,
          brand: 1,
          created_at: "2024-03-04T12:50:06.000000Z",
          updated_at: "2024-03-04T12:50:06.000000Z",
          header_img:
            "https://www.evetech.co.za/repository/mobilev1/Laptop/ProImages/asus-tuf-gaming-a15-ryzen-7-rtx-2050-gaming-laptop-1000px-v1-0003.webp",
        },
        {
          id: 85,
          barcode: "34343434343ee",
          productName:
            'Dell Latitude 7420 Core i5-1135G7 8GB (1x8GB) DDR4 256GB SSD M.2 PCIe NoDVDRW 14" FHD Non-Touch Ubuntu WLAN BT BL WC 4C (Grey+Black)',
          partNumber: "SNS21772726.2/21671556.2",
          specifications:
            'Model/SKU/Description\t:\tDell Latitude 7420\r\nProcessor/CPU\t:\tIntel Core i5-1135G7\r\nMemory/RAM\t:\t8GB, 2666 MHz, DDR4 Non-ECC\r\nHard Drive\t:\tM.2 256GB PCIe NVMe Class 35 Solid State Drive\r\nOptical Drive\t:\tNoDVDRW\r\nScreen Size\t:\t14" FHD Non-Touch\r\nOperating System\t:\tUbuntu\r\nBattery\t:\t4 Cell 63Whr\r\nWireless\t:\tIntel Wi-Fi 6 AX201 2x2 802.11ax 160MHz + Bluetooth 5.1\r\nGraphic/VGA/GPU\t:\tIntel Iris XE Graphics\r\nOther\t:\tNone',
          description:
            '486-61319 Dell Latitude 7420\r\n\r\n338-BYEX i5-1135G7 non-vPro, Intel Iris XE Graphics, 8GB Memory 1\r\n\r\n379-BEGU 11th Generation Intel Core i5-1135G7 (4 Core, 8M cache, base 2.4GHz, up to 4.2GHz) 1\r\n\r\n379-BDZB EPEAT 2018 Registered (Gold) 1\r\n\r\n391-BFRL Laptop 14.0" FHD Anti-glare, Non-Touch, WVA, 250 nits, HD RGB Cam,Mic, WLAN Only, Carbon Fiber 1\r\n\r\n370-AFMG 8GB, 2666 MHz, DDR4 Non-ECC, Integrated 1\r\n\r\n400-BIOJ M.2 256GB PCIe NVMe Class 35 Solid State Drive 1\r\n\r\n450-ABBR Power Cord for 3-pin Adapter (Cambodia) 1\r\n\r\n451-BCSM 4 Cell 63Whr ExpressChargeTM Capable Battery 1\r\n\r\n492-BCXP 65W Type-C Epeat Adapter 1\r\n\r\n555-BFVZ Intel Wi-Fi 6 AX201 2x2 802.11ax 160MHz + Bluetooth 5.1 1\r\n\r\n555-BGHO Wireless Intel AX201 WLAN Driver 1\r\n\r\n583-BHFD Single Point keyboard English US with backlit 1\r\n\r\n605-BBNY Ubuntu Linux 20.04 1\r\n\r\n709-17876 39M SADMG Rapid Parts Exchange Service-Channel 1\r\n\r\n883-10171 Battery Carries 1 Year Warranty from Invoice Date 1',
          price: "1200.00",
          discount: null,
          warranty: null,
          subCategoryId: 5,
          brand: 1,
          created_at: "2024-03-04T13:15:11.000000Z",
          updated_at: "2024-03-04T13:15:11.000000Z",
          header_img:
            "https://storage.iserp.cloud/eci/inventory/item/media/1621588134181-latitude-7420.jpeg",
        },
        {
          id: 87,
          barcode: "34343434343",
          productName: "43434",
          partNumber: "SNS21772726.2/21671556.2",
          specifications: "",
          description: "Hello, World!",
          price: "55554.00",
          discount: "4.00",
          warranty: "4343",
          subCategoryId: 1,
          brand: 2,
          created_at: "2024-03-05T04:44:23.000000Z",
          updated_at: "2024-03-05T04:44:23.000000Z",
          header_img:
            "https://media.wired.com/photos/64daad6b4a854832b16fd3bc/4:3/w_1787,h_1340,c_limit/How-to-Choose-a-Laptop-August-2023-Gear.jpg",
        },
        {
          id: 90,
          barcode: "34343434343",
          productName:
            'Dell Latitude 7420 Core i5-1135G7 8GB (1x8GB) DDR4 256GB SSD M.2 PCIe NoDVDRW 14" FHD Non-Touch Ubuntu WLAN BT BL WC 4C (Grey+Black)',
          partNumber: "SNS21772726.2/21671556.2",
          specifications: "",
          description: "Hello, World!",
          price: "55554.00",
          discount: "4.00",
          warranty: "4343",
          subCategoryId: 1,
          brand: 1,
          created_at: "2024-03-05T05:06:03.000000Z",
          updated_at: "2024-03-18T17:31:08.000000Z",
          header_img:
            "https://cdn.thewirecutter.com/wp-content/media/2023/06/businesslaptops-2048px-0943.jpg",
        },
        {
          id: 91,
          barcode: "34343434343",
          productName:
            'Dell Latitude 7420 Core i5-1135G7 8GB (1x8GB) DDR4 256GB SSD M.2 PCIe NoDVDRW 14" FHD Non-Touch Ubuntu WLAN BT BL WC 4C (Grey+Black)',
          partNumber: "SNS21772726.2/21671556.2",
          specifications: "",
          description: "Hello, World!",
          price: "55554.00",
          discount: "4.00",
          warranty: "4343",
          subCategoryId: 1,
          brand: 2,
          created_at: "2024-03-05T05:08:53.000000Z",
          updated_at: "2024-03-05T05:08:53.000000Z",
          header_img:
            "https://www.evetech.co.za/repository/mobilev1/Laptop/ProImages/asus-tuf-gaming-a15-ryzen-7-rtx-2050-gaming-laptop-1000px-v1-0003.webp",
        },
        {
          id: 92,
          barcode: "34343434343",
          productName:
            'Dell Latitude 7420 Core i5-1135G7 8GB (1x8GB) DDR4 256GB SSD M.2 PCIe NoDVDRW 14" FHD Non-Touch Ubuntu WLAN BT BL WC 4C (Grey+Black)',
          partNumber: "SNS21772726.2/21671556.2",
          specifications: "",
          description: "Hello, World!",
          price: "55554.00",
          discount: "4.00",
          warranty: null,
          subCategoryId: 1,
          brand: 1,
          created_at: "2024-03-05T05:10:36.000000Z",
          updated_at: "2024-03-05T05:10:36.000000Z",
          header_img:
            "https://www.evetech.co.za/repository/mobilev1/Laptop/ProImages/asus-tuf-gaming-a15-ryzen-7-rtx-2050-gaming-laptop-1000px-v1-0003.webp",
        },
        {
          id: 93,
          barcode: "34343434343xx",
          productName:
            'Dell Latitude 7420 Core i5-1135G7 8GB (1x8GB) DDR4 256GB SSD M.2 PCIe NoDVDRW 14" FHD Non-Touch Ubuntu WLAN BT BL WC 4C (Grey+Black)',
          partNumber: "SNS21772726.2/21671556.2",
          specifications: "",
          description: "Hello, World!",
          price: "55554.00",
          discount: "4.00",
          warranty: null,
          subCategoryId: 1,
          brand: 1,
          created_at: "2024-03-05T05:12:07.000000Z",
          updated_at: "2024-03-05T05:12:07.000000Z",
          header_img:
            "https://www.evetech.co.za/repository/mobilev1/Laptop/ProImages/asus-tuf-gaming-a15-ryzen-7-rtx-2050-gaming-laptop-1000px-v1-0003.webp",
        },
        {
          id: 94,
          barcode: "34343434343xx",
          productName:
            'Dell Latitude 7420 Core i5-1135G7 8GB (1x8GB) DDR4 256GB SSD M.2 PCIe NoDVDRW 14" FHD Non-Touch Ubuntu WLAN BT BL WC 4C (Grey+Black)',
          partNumber: "SNS21772726.2/21671556.2",
          specifications: "",
          description: "Hello, World!",
          price: "55554.00",
          discount: null,
          warranty: null,
          subCategoryId: 1,
          brand: 1,
          created_at: "2024-03-05T05:14:18.000000Z",
          updated_at: "2024-03-05T05:14:18.000000Z",
          header_img:
            "https://www.evetech.co.za/repository/mobilev1/Laptop/ProImages/asus-tuf-gaming-a15-ryzen-7-rtx-2050-gaming-laptop-1000px-v1-0003.webp",
        },
        {
          id: 95,
          barcode: "34343434343",
          productName:
            'Dell Latitude 7420 Core i5-1135G7 8GB (1x8GB) DDR4 256GB SSD M.2 PCIe NoDVDRW 14" FHD Non-Touch Ubuntu WLAN BT BL WC 4C (Grey+Black)',
          partNumber: "SNS21772726.2/21671556.2",
          specifications: "",
          description: "Hello, World!",
          price: "55554.00",
          discount: "4.00",
          warranty: "4343",
          subCategoryId: 1,
          brand: 1,
          created_at: "2024-03-05T05:16:12.000000Z",
          updated_at: "2024-03-05T05:16:12.000000Z",
          header_img:
            "https://www.evetech.co.za/repository/mobilev1/Laptop/ProImages/asus-tuf-gaming-a15-ryzen-7-rtx-2050-gaming-laptop-1000px-v1-0003.webp",
        },
        {
          id: 96,
          barcode: "34343434343",
          productName:
            'Dell Latitude 7420 Core i5-1135G7 8GB (1x8GB) DDR4 256GB SSD M.2 PCIe NoDVDRW 14" FHD Non-Touch Ubuntu WLAN BT BL WC 4C (Grey+Black)',
          partNumber: "SNS21772726.2/21671556.2",
          specifications: "",
          description: "Hello, World!",
          price: "55554.00",
          discount: "4.00",
          warranty: "4343",
          subCategoryId: 1,
          brand: 1,
          created_at: "2024-03-05T13:07:50.000000Z",
          updated_at: "2024-03-05T13:07:50.000000Z",
          header_img:
            "https://www.evetech.co.za/repository/mobilev1/Laptop/ProImages/asus-tuf-gaming-a15-ryzen-7-rtx-2050-gaming-laptop-1000px-v1-0003.webp",
        },
        {
          id: 97,
          barcode: "34343434343xx",
          productName:
            'Dell Latitude 7420 Core i5-1135G7 8GB (1x8GB) DDR4 256GB SSD M.2 PCIe NoDVDRW 14" FHD Non-Touch Ubuntu WLAN BT BL WC 4C (Grey+Black)',
          partNumber: "SNS21772726.2/21671556.2",
          specifications: "",
          description: "Hello, World!",
          price: "55554.00",
          discount: "4.00",
          warranty: "4343",
          subCategoryId: 1,
          brand: 1,
          created_at: "2024-03-05T13:08:14.000000Z",
          updated_at: "2024-03-05T13:08:14.000000Z",
          header_img:
            "https://www.evetech.co.za/repository/mobilev1/Laptop/ProImages/asus-tuf-gaming-a15-ryzen-7-rtx-2050-gaming-laptop-1000px-v1-0003.webp",
        },
        {
          id: 98,
          barcode: "34343434343",
          productName:
            'Dell Latitude 7420 Core i5-1135G7 8GB (1x8GB) DDR4 256GB SSD M.2 PCIe NoDVDRW 14" FHD Non-Touch Ubuntu WLAN BT BL WC 4C (Grey+Black)',
          partNumber: "SNS21772726.2/21671556.2",
          specifications: "",
          description: "Hello, World!",
          price: "55554.00",
          discount: "4.00",
          warranty: "4343",
          subCategoryId: 1,
          brand: 1,
          created_at: "2024-03-05T13:08:42.000000Z",
          updated_at: "2024-03-05T13:08:42.000000Z",
          header_img:
            "https://www.evetech.co.za/repository/mobilev1/Laptop/ProImages/asus-tuf-gaming-a15-ryzen-7-rtx-2050-gaming-laptop-1000px-v1-0003.webp",
        },
        {
          id: 100,
          barcode: "34343434343",
          productName:
            'Dell Latitude 7420 Core i5-1135G7 8GB (1x8GB) DDR4 256GB SSD M.2 PCIe NoDVDRW 14" FHD Non-Touch Ubuntu WLAN BT BL WC 4C (Grey+Black)',
          partNumber: "SNS21772726.2/21671556.2",
          specifications: "",
          description: "Hello, World!",
          price: "55554.00",
          discount: "4.00",
          warranty: "4343",
          subCategoryId: 15,
          brand: 1,
          created_at: "2024-03-18T14:51:19.000000Z",
          updated_at: "2024-03-18T14:51:19.000000Z",
          header_img:
            "https://www.evetech.co.za/repository/mobilev1/Laptop/ProImages/asus-tuf-gaming-a15-ryzen-7-rtx-2050-gaming-laptop-1000px-v1-0003.webp",
        },
      ],
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full bg-white text-slate-950">
      <div className="max-sm:w-11/12 w-10/12 m-auto px-4 sm:px-2 md:px-2 lg:px-4 xl:px-0">
        <div className="flex top-[80px] pt-1 bg-white  max-sm:flex-col border-b pb-2" style={{ zIndex: "1000" }}>
          <article className="w-full max-lg:w-1/2 max-sm:w-full py-2 pr-2 flex flex-col">
            <div className="flex items-center justify-between pb-3 pr-4">
              <p className="text-black font-semibold text-base uppercase">
                CheckOut
              </p>
            </div>
            <div className="w-full border p-2 flex max-lg:flex-col rounded-sm">
              <div className="w-2/3 max-lg:w-full h-56 bg-slate-200 rounded-sm">
                <CusLoaction/>
              </div>
              <div className="w-1/3 max-lg:w-full max-lg:mt-2 pr-2 ml-2">
                <div className="w-full flex items-center justify-between mb-2">
                  <p className="text-black font-semibold text-sm ">
                    Delivery Address
                  </p>
                  <button
                    onClick={() => setIsOpen(true)}
                    className=" top-0 right-0 text-black font-semibold underline text-xs"
                  >
                    Edits
                  </button>
                  <Dialog
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    className="relative z-50"
                  >
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                      <DialogPanel className="w-2/3 max-sm:w-full space-y-4 border rounded-sm bg-white p-12 shadow-[0px_0px_150px_rgba(0,0,0,0.0)] shadow-gray-700 ">
                        <DialogTitle className="font-bold flex items-center justify-between">
                          <h1>Delivery Address</h1>
                          <button onClick={() => setIsOpen(false)}>
                            <XMarkIcon className="size-6" />
                          </button>
                        </DialogTitle>
                        <div className="w-full grid grid-cols-2 max-lg:grid-cols-1 gap-1">
                          <div className=" border rounded-sm p-2 mr-1 mb-2 flex items-center">
                            <MapPinIcon className="size-9 mx-2" />
                            <div>
                              <h1 className="text-base font-semibold mb-1">
                                Vanchay
                              </h1>
                              <h2 className="text-sm font-semibold mb-1">
                                Address:
                                <span className="text-xs font-normal ml-2">
                                  WW9V+QG7, Kampong Rou, Cambodia
                                </span>
                              </h2>
                              <h2 className="text-sm font-semibold mb-1">
                                Note:
                                <span className="text-xs font-normal ml-2">
                                  For my PC
                                </span>
                              </h2>
                            </div>
                          </div>
                          <div className=" border rounded-sm p-2 mr-1 mb-2 flex items-center">
                            <MapPinIcon className="size-9 mx-2" />
                            <div>
                              <h1 className="text-base font-semibold mb-1">
                                Vanchay
                              </h1>
                              <h2 className="text-sm font-semibold mb-1">
                                Address:
                                <span className="text-xs font-normal ml-2">
                                  WW9V+QG7, Kampong Rou, Cambodia
                                </span>
                              </h2>
                              <h2 className="text-sm font-semibold mb-1">
                                Note:
                                <span className="text-xs font-normal ml-2">
                                  For my PC
                                </span>
                              </h2>
                            </div>
                          </div>
                          <button className=" border rounded-sm p-2 mr-1 mb-2 flex items-center justify-center">
                          <PlusCircleIcon className="size-9 mr-1 "/>
                            <h1 className="text-base font-semibold ">
                              Create New
                            </h1>
                          </button>
                        </div>
                      </DialogPanel>
                    </div>
                  </Dialog>
                </div>
                <div className="flex items-center mb-2">
                  <MapPinIcon className="size-5 font-medium mr-1" />
                  <h1 className="w-[80%] text-base font-semibold">Vanchay</h1>
                </div>
                <h2 className="text-sm font-semibold mb-1">
                  Address:
                  <span className="text-xs font-normal ml-2">
                    WW9V+QG7, Kampong Rou, Cambodia
                  </span>
                </h2>
                <h2 className="text-sm font-semibold mb-1">
                  Note:
                  <span className="text-xs font-normal ml-2">For my PC</span>
                </h2>
              </div>
            </div>
            <div className="w-full h-20 py-1 mt-2 flex">
              {/* <div className="w-1/2 max-lg:w-full h-full border rounded-sm flex items-center p-2">
                <img
                  src="https://i.pinimg.com/originals/a5/53/5d/a5535ddefd7f764a991b91cb84e87758.png"
                  alt=""
                  className="w-1/4 items-center"
                />
                <div className="ml-2">
                  <h1 className="text-sm font-medium">ABA KHQR</h1>
                  <p className="text-xs ">Scan to pay with any banking app</p>
                </div>
              </div> */}
            </div>
          </article>
        </div>
        <div className="w-full max-lg:w-full mt-5">
          <div className="w-full flex flex-wrap justify-items-start">
            {
              error ? (<>{error}</>) : (
                loading ? (<>Loading</>) : (
                  product && (
                    product.products.map((data) => (
                      <article key={data.id} className="relative w-1/5 max-lg:w-1/3 max-sm:w-2/4 pb text-sm max-sm:text-xs mb-10 pr-3">
                        <img
                          style={{ maxHeight: '120px',minHeight: "120px" }}
                          src={data.header_img}
                          alt=""
                          className="w-full m-auto object-cover object-center"
                        />
                        <h1 className="mt-4 text-black line-clamp-2">
                          {data.productName}
                        </h1>
                        <h1 className="mt-1 bottom-0 left-0 font-bold">
                          ${data.price}
                        </h1>
                      </article>
                    ))
                  )
                )
              )
              
            }
            {/* {KK[0].data.map((data) => (
              <article key={data.id} className="relative w-1/5 max-lg:w-1/3 max-sm:w-2/4 pb text-sm max-sm:text-xs mb-10 pr-3 overflow-hidden">
                <img
                  src="https://store-images.s-microsoft.com/image/apps.4720.14416131676512756.84314783-1c86-4403-b991-2e1da8525703.bf78340f-7059-4641-8d3f-8a7f740be8c0"
                  alt=""
                  className="w-full m-auto object-cover object-center"
                />
                <h1 className="mt-4 text-black line-clamp-2">
                  {data.productName}
                </h1>
                <h1 className="mt-1 mb-4 text-slate-600">{data.brand}</h1>
                <h1 className="absolute bottom-0 left-0 font-bold">
                  ${data.price}
                </h1>
              </article>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
