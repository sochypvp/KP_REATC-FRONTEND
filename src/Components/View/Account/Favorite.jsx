import { useState } from "react";
import BoxFav from "../SubViews/BoxAndLIst/BoxFav";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useUser } from "../context/userContext";


const Favorite = () => {
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
            "https://media.wired.com/photos/64daad6b4a854832b16fd3bc/4:3/w_1787,h_1340,c_limit/How-to-Choose-a-Laptop-August-2023-Gear.jpg",
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
            "https://storage.iserp.cloud/ice/undefined/1699241250873-123.PNG",
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

  // State variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // You can adjust the number of items per page

  // Logic to get current items based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = KK[0].data.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page changes
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to handle next page
  const nextPage = () => {
    if (currentPage < Math.ceil(KK[0].data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  const { userFav, error, loading } = useUser();

  return (
    <article>
      <div className="flex items-center justify-between pb-10 pr-4">
        <p className="text-black uppercase font-extrabold text-lg max-md:text-base pb-5">
          Favorite
        </p>

        <p className="text-black font-bold text-lg">
          {/* <button className="btn btn-danger mr-2 btn-sm">Remove</button> */}
          Total-
          {
            userFav && (
              userFav.total && (
                userFav.total
              )

            )
          }
        </p>
      </div>
      <div className="flex flex-wrap justify-items-startt">
        {
          error ? (<>{error}</>) : (
            loading ? (<>Loading...</>) : (
              userFav && (
                userFav.products.map((favData) => {
                  var shortName = "";
                  if (favData.productName.length > 60) {
                    shortName =
                      favData.productName.substring(0, 60).toUpperCase() + "...";
                  } else {
                    shortName = favData.productName;
                  }
                  return (
                    <BoxFav
                      key={favData.id}
                      id={favData.id}
                      profile={favData.header_img}
                      name={shortName}
                      price={favData.price}
                      brand={favData.get_brand && favData.get_brand}
                      barcode={favData.barcode}
                      favId={favData.favId}
                      discount={favData.discount}
                    />
                  );
                })
              )
            )
          )
        }
      </div>
      {/* Pagination */}
      {/* <ul className="flex justify-center mt-4">
        <li
          className={`cursor-pointer mx-1 px-3 py-1 rounded-full ${currentPage === 1 ? "bg-gray-100" : "bg-gray-200"
            }`}
          onClick={prevPage}
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </li>
        {Array.from({
          length: Math.ceil(KK[0].data.length / itemsPerPage),
        }).map((_, index) => (
          <li
            key={index}
            onClick={() => paginate(index + 1)}
            className={`cursor-pointer mx-1 px-3 py-1 rounded-full ${currentPage === index + 1
              ? "bg-gray-600 text-white"
              : "bg-gray-200"
              }`}
          >
            {index + 1}
          </li>
        ))}
        <li
          className={`cursor-pointer mx-1 px-3 py-1 rounded-full ${currentPage === Math.ceil(KK[0].data.length / itemsPerPage)
            ? "bg-gray-100"
            : "bg-gray-200"
            }`}
          onClick={nextPage}
        >
          <ChevronRightIcon className="w-6 h-6" />
        </li>
      </ul> */}
    </article>
  );
};

export default Favorite;
