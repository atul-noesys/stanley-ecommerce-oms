import { makeAutoObservable } from "mobx";
import { RootStore } from "./root-store";

export type Product = {
  id: number;
  sku: string;
  name: string;
  description: string;
  features: string[];
  category: string;
  subCategory: string[];
  price: number;
  image: string;
  images: string[];
  soh: number;
  moq: number;
};

export type userInfo = {
    code: number;
    name: string;
    contact: number;
    creditLimit: number;
    availableLimit: number;
    overdue: number;
}

type FindUploadedProducts = Product & {
  quantity: number;
};

export type Cart = Pick<Product, 'sku' | 'name' | 'price' | 'image' | 'soh' | 'moq'> & {
    quantity: number;
    backOrder: number;
};

type UploadData = Pick<Product, 'sku'> & {
    quantity: number;
};

export type ProductListType = 'accessories' | 'focusProducts' | 'handTools' | 'outdoor' | 'powerTools' | 'storage' | 'workspace';
type SortKey = "name:asc" | "name:desc" | "price:asc" | "price:desc";

export const accessoriesList: Product[] = [
    {
        id: 1,
        sku: "TRA709T",
        name: "Heavy Duty Staples - Type G 4/11/140",
        description: "Used for heavy-duty stapling jobs such as insulation carpet underlayment, these staples come in sturdy plastic packaging.",
        features: [
        "Sturdy plastic packaging reduces staple breakage.",
        "For heavy duty stapling jobs such as insulation.",
        ],
        category: "Accessories",
        subCategory: ["Fastening Accessories", "All Tools"],
        price: 8.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/TRA709T/TRA709T_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/TRA709T/TRA709T_1.jpg?resize=530x530",
        ],
        soh: 500000,
        moq: 2000
    },
    {
        id: 2,
        sku: "TRA705-5C",
        name: "5/16 in Heavy Duty Staples (5000 PK)",
        description: "The 5/16' Heavy Duty Staples work with a variety of staples.",
        features: [
        "Color-coded packaging makes size and product selection a cinch",
        "Sturdy plastic packaging reduces staple breakage"
        ],
        category: "Accessories",
        subCategory: ["Fastening Accessories", "All Tools"],
        price: 19.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/TRA705-5C/TRA705-5C_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/TRA705-5C/TRA705-5C_1.jpg?resize=530x530",
        ],
        soh: -1,
        moq: 5000
    },
    {
        id: 3,
        sku: "NDS62-541",
        name: "Nut Driver Set (6 pc)",
        description: "Designed for use with 1/4 in, 5/16 in, 3/8 in, 7/16 in, 1/2 in, and 9/16 in fasteners.",
        features: [
        "Long-lasting, solid one-piece construction",
        "Rust-resistant, nickel-plated bar"
        ],
        category: "Accessories",
        subCategory: ["Accessories", "All Tools"],
        price: 24.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/62-541/62-541_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/62-541/62-541_1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/62-541/62-541_P1.jpg?resize=530x530",
        ],
        soh: 0,
        moq: 500
    },
    {
        id: 4,
        sku: "TRA706SST",
        name: "3/8 in Stainless Steel Heavy Duty Staples (1000 pc)",
        description: "Stanley's Heavy-Duty Stainless steel narrow crown staples are ideal for corrosive or marine environments.",
        features: [
        "Color-coded packaging makes size and product selection a cinch",
        "Sturdy plastic packaging reduces staple breakage"
        ],
         category: "Accessories",
        subCategory: ["Fastening Accessories", "All Tools"],
        price: 12.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/TRA706SST/TRA706SST_P1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/TRA706SST/TRA706SST_P1.jpg?resize=530x530",
        ],
        soh: 200000,
        moq: 1000
    },
    {
        id: 5,
        sku: "SS33-212",
        name: "PowerLock® 1/2 in x 12 in Tape Rule II",
        description: "PowerLock® 1/2 in. x 12 in. tape rule II",
        features: [
        "Mylar polyester film extends life of entire blade",
        "Secure blade lock won't creep during measurement"
        ],
         category: "Accessories",
        subCategory: ["Accessories", "All Tools"],
        price: 15.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/33-212/33-212_2.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/33-212/33-212_2.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/33-212/33-212_1.jpg?resize=530x530",
        ],
        soh: 75000,
        moq: 100
    },
    {
        id: 6,
        sku: "TRA706TCS",
        name: "1,500 pc 3/8 in Heavy Duty Staples",
        description: "This 1500-pack of 3/8 heavy-duty narrow crown staples are convenient and reliable.",
        features: [
        "Color-coded packaging for easy selection of correct staples",
        "Sturdy plastic packaging helps reduce staple breakage"
        ],
         category: "Accessories",
        subCategory: ["Accessories", "All Tools"],
        price: 21.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/TRA706TCS/TRA706TCS_P1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/TRA706TCS/TRA706TCS_P1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/TRA706TCS/TRA706TCS_P2.jpg?resize=530x530",
        ],
        soh: 300000,
        moq: 500
    },
    {
        id: 7,
        sku: "TRA704T",
        name: "Heavy Duty Staples - Type G 4/11/140",
        description: "Heavy-duty narrow crown staples are convenient and reliable.",
        features: [
        "Color-coded packaging for easy selection of correct staples",
        "Sturdy plastic packaging helps reduce staple breakage"
        ],
         category: "Accessories",
        subCategory: ["Fastening Accessories", "All Tools"],
        price: 17.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/TRA704T/TRA704T_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/TRA704T/TRA704T_1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/TRA704T/TRA704T_P1.jpg?resize=530x530",
        ],
        soh: 800000,
        moq: 20000
    },
    {
        id: 8,
        sku: "TRA205T",
        name: "8mm Light Duty Staples",
        description: "For light-duty household and crafting jobs, the Stanley light-duty wide crown staples.",
        features: [
        "Color-coded packaging for easy selection of correct staples",
        "Sturdy plastic packaging helps reduce staple breakage"
        ],
         category: "Accessories",
        subCategory: ["Fastening Accessories", "All Tools"],
        price: 19.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/TRA205T/TRA205T_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/TRA205T/TRA205T_1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/TRA205T/TRA205T_P1.jpg?resize=530x530",
        ],
        soh: 500000,
        moq: 10000
    },
    {
        id: 9,
        sku: "TRA708-5C",
        name: "1/2 in Heavy Duty Staples (5000 pc)",
        description: "Stanley's Heavy-duty narrow crown staples are sure to get the job done right.",
        features: [
        "Color-coded packaging for easy selection of correct staples",
        "Sturdy plastic packaging helps reduce staple breakage"
        ],
         category: "Accessories",
        subCategory: ["Fastening Accessories", "All Tools"],
        price: 29.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/TRA708-5C/TRA708-5C_P1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/TRA708-5C/TRA708-5C_P1.jpg?resize=530x530",
        ],
        soh: 250000,
        moq: 5000
    },
    {
        id: 10,
        sku: "SWKBN1260",
        name: "1,000 pc 1-1/4 in Brad Nails",
        description: "The 1 1/4 Brand Nails fit the TRE650 Electric Brad Nailer.",
        features: [
        "Color-coded packaging for easy selection of correct staples",
        "Sturdy plastic packaging helps reduce staple breakage"
        ],
         category: "Accessories",
        subCategory: ["Fastening Accessories", "All Tools"],
        price: 26.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/SWKBN1250/SWKBN1250_P1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/SWKBN1250/SWKBN1250_P1.jpg?resize=530x530",
        ],
        soh: 100000,
        moq: 1000
    },
];

export const focusProductsList: Product[] = [
    {
        id: 1,
        sku: "SWKBN1250",
        name: "STANLEY® FATMAX® 16 ft. x 1-1/4 in. Premium Tape",
        price: 99.99,
        subCategory: ["Measuring and Layout Tools", "All Tools"],
        description: "Introducing the STANLEY® FATMAX® PREMIUM™ 16’ Tape: the single answer to all your measuring needs.",
        features: [
            "16' Max Reach",
            "FINGER BRAKE FOR ULTIMATE BLADE CONTROL"
        ],
        category: "Focus Products",
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/FMHT38316S/FMHT38316S_2.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/FMHT38316S/FMHT38316S_2.jpg?resize=530x530",
        ],
        soh: 10000,
        moq: 50
    },
    {
        id: 2,
        sku: "51-124X",
        name: "FatMax® Welded Hammer (14 oz)",
        price: 79.99,
        category: "Focus Products",
        subCategory: ["Hammers", "All Tools"],
        description: "Stanley 15oz FatMax Framing Hammer 51-124",
        features: [
            "The Stanley FatMax Xtreme 51-124 15oz Framing Hammer has an oversized strike face",
        ],
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/51-124X/51-124_2.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/51-124X/51-124_2.jpg?resize=530x530",
        ],
        soh: 20000,
        moq: 100
    },
    {
        id: 3,
        sku: "SF44-356H",
        name: "STANLEY® FATMAX® 380mm x 11TPI Blade Armour Saw",
        price: 59.99,
        category: "Focus Products",
        subCategory: ["Hand Saws", "All Tools"],
        description: "This heavy-duty FATMAX® 15' saw is designed to deliver smooth, sharp cuts.",
        features: [
            "Tri-material handle for comfort and durability",
            "New handle design improves ease of cut by 25%",
            "Triple ground tooth technology is 4X sharper for fast cuts"
        ],
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/20-046/20-046_1.jpg?resize=530x530",
        images: [
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/20-046/20-046_1.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/20-046/20-046_3.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/20-046/20-046_4.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/20-046/20-046_F1.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/20-046/20-046_F2.jpg?resize=530x530"
        ],
        soh: 6000,
        moq: 250
    },
    {
        id: 4,
        sku: "SF56-001",
        name: "STANLEY® FATMAX® Anti-Vibe® Drilling Hammer",
        price: 49.99,
        category: "Focus Products",
        subCategory: ["Hammers", "All Tools"],
        description: "Ideal for striking chisels, punches, start drills and unhardened metals & Anti-Vibe® technology minimizes vibration and shock at impact.",
        features: [
            "Ideal for striking chisels, punches, start drills and unhardened metals.",
            "AntiVibe® technology minimizes vibration and shock at impact."
        ],
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/56-001/56-001_1.jpg?resize=530x530",
        images: [
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/56-001/56-001_1.jpg?resize=530x530"
        ],
        soh: 10000,
        moq: 200
    },
    {
        id: 5,
        sku: "STHT10432",
        name: "CONTROL-GRIP™ Retractable Utility Knife",
        price: 29.99,
        category: "Focus Products",
        subCategory: ["Knives and Blades", "All Tools"],
        description: "The STANLEY® Control-Grip™ Retractable Utility Knife features an optimized shape for applications that need a precise grip.",
        features: [
            "Optimized shape for applications that need a precise grip",
            "Nose of the knife features an exposed blade step to speed"
        ],
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHT10432/STHT10432_1.jpg?resize=530x530",
        images: [
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHT10432/STHT10432_1.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHT10432/STHT10432_A1.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHT10432/STHT10432_A5.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHT10432/STHT10432_E1.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHT10432/STHT10432_A5.jpg?resize=530x530"
        ],
        soh: 5000,
        moq: 100
    },
    {
        id: 6,
        sku: "HD11-921A",
        name: "Heavy-Duty Utility Blades with Dispenser (100 PK)",
        price: 49.99,
        category: "Focus Products",
        subCategory: ["Knives and Blades", "All Tools"],
        description: "Have top-quality, high-performance on hand with this 100-pack of Heavy-Duty Utility Blades.",
        features: [
            "HIGH-PERFORMANCE BLADES: Engineered for general-purpose cutting",
            "LONG CUTTING LIFE: Precision-honed edge for consistent cuts"
        ],
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/11-921A/11-921A_1.jpg?resize=530x530",
        images: [
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/11-921A/11-921A_1.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/11-921A/11-921A_2.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/11-921A/11-921A_3.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/11-921A/11-921A_A1.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/11-921A/11-921A_IP01.jpg?resize=530x530"
        ],
        soh: 10000,
        moq: 100
    },
    {
        id: 7,
        sku: "MB68-010",
        name: "Multi-bit Ratchet Screwdriver with 10 bit",
        price: 39.99,
        category: "Focus Products",
        subCategory: ["Screwdrivers & Hex Keys", "All Tools"],
        description: "Complete a variety of fastening jobs quickly and easily with the Multi-Bit Ratcheting Screwdriver from STANLEY®.",
        features: [
            "Magnetic bit holder for secure storage of bits",
            "Internal bit storage for easy access and fast changeover of bits"
        ],
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/68-010/68-010_1.jpg?resize=530x530",
        images: [
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/68-010/68-010_1.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/68-010/68-010_2.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/68-010/68-010_F1.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/68-010/68-010_F2.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/68-010/68-010_F7.jpg?resize=530x530"
        ],
        soh: 70000,
        moq: 500
    },
    {
        id: 8,
        sku: "AW90-947",
        name: "150mm/6 in MAXSTEEL™ Adjustable Wrench",
        price: 59.99,
        category: "Focus Products",
        subCategory: ["Wrenches", "All Tools"],
        description: "The STANLEY Bi-material handled adjustable wrench has a tapered jaw design allowing for work in tight spaces, wide capacity jaw, the forged chrome.",
        features: [
            "Tapered jaw design allows for work in limited space applications",
            "Slip-resistant bi-material handle for a comfortable grip"
        ],
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/90-947/90-947_1.jpg?resize=530x530",
        images: [
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/90-947/90-947_1.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/90-947/90-947_2.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/90-947/STMT25144_F2.jpg?resize=530x530",
        ],
        soh: 50000,
        moq: 1000
    },
    {
        id: 9,
        sku: "STHT81195",
        name: "8 in Compound Action Long Nose Pliers",
        price: 45.99,
        category: "Focus Products",
        subCategory: ["Pliers & Snips", "All Tools"],
        description: "The STANLEY® 8 in. Compound Action Long Nose Pliers offer increased cutting force when compared to standard long nose pliers.",
        features: [
            "3-zone bi-material grips for comfort and control",
            "Black oxide finish helps resist corrosion",
            "Drop-forged steel for strength and durability"
        ],
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHT81195/STHT81195_1.jpg?resize=530x530",
        images: [
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHT81195/STHT81195_1.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHT81195/STHT81195_2.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHT81195/STHT81195_3.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHT81195/STHT81195_P1.jpg?resize=530x530"
        ],
        soh: 12000,
        moq: 500
    },
    {
        id: 10,
        sku: "PPRH5",
        name: "1000 PEAK Battery Amp Professional Power Station",
        price: 259.99,
        category: "Focus Products",
        subCategory: ["Automotive Tools", "All Tools"],
        description: "The Professional Power Station combines a portable household AC power supply with a jump-starter and 120 PSI air-compressor.",
        features: [
            "500 Watts Portable Household Power (2) AC Power Outlets",
            "Offers both 12-volt and USB outlets to charge personal electronics"
        ],
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/PPRH5/PPRH5_1.jpg?resize=530x530",
        images: [
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/PPRH5/PPRH5_1.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/PPRH5/PPRH5_A1.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/PPRH5/PPRH5_A2.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/PPRH5/PPRH5_A3.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/PPRH5/PPRH5_A4.jpg?resize=530x530"
        ],
        soh: 1000,
        moq: 20
    },
];

export const handToolsList: Product[] = [
    {
        id: 1,
        sku: "SWKBN1250",
        name: "STANLEY® FATMAX® 16 ft. x 1-1/4 in. Premium Tape",
        price: 99.99,
        category: "Hand Tools",
        subCategory: ["Measuring and Layout Tools", "All Tools"],
        description: "Introducing the STANLEY® FATMAX® PREMIUM™ 16’ Tape: the single answer to all your measuring needs.",
        features: [
            "16' Max Reach",
            "FINGER BRAKE FOR ULTIMATE BLADE CONTROL"
        ],
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/FMHT38316S/FMHT38316S_2.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/FMHT38316S/FMHT38316S_2.jpg?resize=530x530",
        ],
        soh: 10000,
        moq: 50
    },
    {
        id: 2,
        sku: "51-124X",
        name: "FatMax® Welded Hammer (14 oz)",
        price: 79.99,
        category: "Hand Tools",
        subCategory: ["Hammers", "All Tools"],
        description: "Stanley 15oz FatMax Framing Hammer 51-124",
        features: [
            "The Stanley FatMax Xtreme 51-124 15oz Framing Hammer has an oversized strike face",
        ],
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/51-124X/51-124_2.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/51-124X/51-124_2.jpg?resize=530x530",
        ],
        soh: -1,
        moq: 100
    },
    {
        id: 3,
        sku: "SF44-356H",
        name: "STANLEY® FATMAX® 380mm x 11TPI Blade Armour Saw",
        price: 59.99,
        category: "Hand Tools",
        subCategory: ["Hand Saws", "All Tools"],
        description: "This heavy-duty FATMAX® 15' saw is designed to deliver smooth, sharp cuts.",
        features: [
            "Tri-material handle for comfort and durability",
            "New handle design improves ease of cut by 25%",
            "Triple ground tooth technology is 4X sharper for fast cuts"
        ],
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/20-046/20-046_1.jpg?resize=530x530",
        images: [
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/20-046/20-046_1.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/20-046/20-046_3.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/20-046/20-046_4.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/20-046/20-046_F1.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/20-046/20-046_F2.jpg?resize=530x530"
        ],
        soh: 6000,
        moq: 250
    },
    {
        id: 4,
        sku: "SF56-001",
        name: "STANLEY® FATMAX® Anti-Vibe® Drilling Hammer",
        price: 49.99,
        category: "Hand Tools",
        subCategory: ["Hammers", "All Tools"],
        description: "Ideal for striking chisels, punches, start drills and unhardened metals & Anti-Vibe® technology minimizes vibration and shock at impact.",
        features: [
            "Ideal for striking chisels, punches, start drills and unhardened metals.",
            "AntiVibe® technology minimizes vibration and shock at impact."
        ],
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/56-001/56-001_1.jpg?resize=530x530",
        images: [
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/56-001/56-001_1.jpg?resize=530x530"
        ],
        soh: 0,
        moq: 200
    },
    {
        id: 5,
        sku: "STHT10432",
        name: "CONTROL-GRIP™ Retractable Utility Knife",
        price: 29.99,
        category: "Hand Tools",
        subCategory: ["Knives and Blades", "All Tools"],
        description: "The STANLEY® Control-Grip™ Retractable Utility Knife features an optimized shape for applications that need a precise grip.",
        features: [
            "Optimized shape for applications that need a precise grip",
            "Nose of the knife features an exposed blade step to speed"
        ],
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHT10432/STHT10432_1.jpg?resize=530x530",
        images: [
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHT10432/STHT10432_1.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHT10432/STHT10432_A1.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHT10432/STHT10432_A5.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHT10432/STHT10432_E1.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHT10432/STHT10432_A5.jpg?resize=530x530"
        ],
        soh: 5000,
        moq: 100
    },
    {
        id: 6,
        sku: "HD11-921A",
        name: "Heavy-Duty Utility Blades with Dispenser (100 PK)",
        price: 49.99,
        category: "Hand Tools",
        subCategory: ["Knives and Blades", "All Tools"],
        description: "Have top-quality, high-performance on hand with this 100-pack of Heavy-Duty Utility Blades.",
        features: [
            "HIGH-PERFORMANCE BLADES: Engineered for general-purpose cutting",
            "LONG CUTTING LIFE: Precision-honed edge for consistent cuts"
        ],
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/11-921A/11-921A_1.jpg?resize=530x530",
        images: [
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/11-921A/11-921A_1.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/11-921A/11-921A_2.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/11-921A/11-921A_3.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/11-921A/11-921A_A1.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/11-921A/11-921A_IP01.jpg?resize=530x530"
        ],
        soh: 10000,
        moq: 100
    },
    {
        id: 7,
        sku: "MB68-010",
        name: "Multi-bit Ratchet Screwdriver with 10 bit",
        price: 39.99,
        category: "Hand Tools",
        subCategory: ["Screwdrivers & Hex Keys", "All Tools"],
        description: "Complete a variety of fastening jobs quickly and easily with the Multi-Bit Ratcheting Screwdriver from STANLEY®.",
        features: [
            "Magnetic bit holder for secure storage of bits",
            "Internal bit storage for easy access and fast changeover of bits"
        ],
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/68-010/68-010_1.jpg?resize=530x530",
        images: [
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/68-010/68-010_1.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/68-010/68-010_2.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/68-010/68-010_F1.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/68-010/68-010_F2.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/68-010/68-010_F7.jpg?resize=530x530"
        ],
        soh: 70000,
        moq: 500
    },
    {
        id: 8,
        sku: "AW90-947",
        name: "150mm/6 in MAXSTEEL™ Adjustable Wrench",
        price: 59.99,
        category: "Hand Tools",
        subCategory: ["Wrenches", "All Tools"],
        description: "The STANLEY Bi-material handled adjustable wrench has a tapered jaw design allowing for work in tight spaces, wide capacity jaw, the forged chrome.",
        features: [
            "Tapered jaw design allows for work in limited space applications",
            "Slip-resistant bi-material handle for a comfortable grip"
        ],
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/90-947/90-947_1.jpg?resize=530x530",
        images: [
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/90-947/90-947_1.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/90-947/90-947_2.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/90-947/STMT25144_F2.jpg?resize=530x530",
        ],
        soh: 50000,
        moq: 1000
    },
    {
        id: 9,
        sku: "STHT81195",
        name: "8 in Compound Action Long Nose Pliers",
        price: 45.99,
        category: "Hand Tools",
        subCategory: ["Pliers & Snips", "All Tools"],
        description: "The STANLEY® 8 in. Compound Action Long Nose Pliers offer increased cutting force when compared to standard long nose pliers.",
        features: [
            "3-zone bi-material grips for comfort and control",
            "Black oxide finish helps resist corrosion",
            "Drop-forged steel for strength and durability"
        ],
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHT81195/STHT81195_1.jpg?resize=530x530",
        images: [
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHT81195/STHT81195_1.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHT81195/STHT81195_2.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHT81195/STHT81195_3.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHT81195/STHT81195_P1.jpg?resize=530x530"
        ],
        soh: 12000,
        moq: 500
    },
    {
        id: 10,
        sku: "PPRH5",
        name: "1000 PEAK Battery Amp Professional Power Station",
        price: 259.99,
        category: "Hand Tools",
        subCategory: ["Automotive Tools", "All Tools"],
        description: "The Professional Power Station combines a portable household AC power supply with a jump-starter and 120 PSI air-compressor.",
        features: [
            "500 Watts Portable Household Power (2) AC Power Outlets",
            "Offers both 12-volt and USB outlets to charge personal electronics"
        ],
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/PPRH5/PPRH5_1.jpg?resize=530x530",
        images: [
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/PPRH5/PPRH5_1.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/PPRH5/PPRH5_A1.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/PPRH5/PPRH5_A2.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/PPRH5/PPRH5_A3.jpg?resize=530x530",
            "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/PPRH5/PPRH5_A4.jpg?resize=530x530"
        ],
        soh: 1000,
        moq: 20
    },
];

export const outdoorList: Product[] = [
    {
        id: 1,
        sku: "BDS91929",
        name: "FATMAX 7-Pattern Front Trigger Nozzle",
        description: "Designed for superior performance, this nozzle features a durable cast metal body with non-slip grip.",
        features: [
            "7 spray patterns for a variety of watering needs",
        ],
        category: "Outdoor",
        subCategory: ["Accessories and Attachments", "All Tools"],
        price: 49.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/BDS91929/BDS91929_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/BDS91929/BDS91929_E1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/BDS91929/BDS91929_1.jpg?resize=530x530"
        ],
        soh: 20000,
        moq: 500
    },
    {
        id: 2,
        sku: "BDS91931",
        name: "FATMAX Adjustable Front Trigger Nozzle",
        description: "Designed for superior performance, this nozzle features a durable cast metal body with non-slip grip.",
        features: [
            "Adjustable spray patters quickly changes from a powerful jet to a wide cone",
        ],
        category: "Outdoor",
        subCategory: ["Accessories and Attachments", "All Tools"],
        price: 39.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/BDS91931/BDS91931_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/BDS91931/BDS91931_1.jpg?resize=530x530",
        ],
        soh: 30000,
        moq: 1000
    },
    {
        id: 3,
        sku: "BDS7497",
        name: "Heavy Duty Adjustable Rear Trigger Nozzle",
        description: "Applications are limitless with the STANLEY FATMAX Heavy Duty Adjustable Trigger Nozzle.",
        features: [
        "Take full control over watering jobs by utilizing the jet, stream and fine mist spray settings",
        "Aluminum head and zinc alloy metal body"
        ],
        category: "Outdoor",
        subCategory: ["Accessories and Attachments", "All Tools"],
        price: 45.00,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/BDS7497/BDS7497_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/BDS7497/BDS7497_1.jpg?resize=530x530",
        ],
        soh: 0,
        moq: 500
    },
    {
        id: 4,
        sku: "SHP1600",
        name: "1600 PSI Electric Pressure Washer",
        description: "The STANLEY® 1600 PSI Pressure Washer is the most portable electric pressure washer we make.",
        features: [
        "Light and easy to carry for cleaning projects of all kinds around the house",
        "Power clean siding, decks, cement, Pavement, pools, outdoor furniture, cars, trucks, RVs, ATVs and more"
        ],
        category: "Outdoor",
        subCategory: ["Pressure Washer", "All Tools"],
        price: 99.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/SHP1600/SHP1600_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/SHP1600/SHP1600_1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/SHP1600/SHP1600_2.jpg?resize=530x530"
        ],
        soh: -1,
        moq: 50
    },
    {
        id: 5,
        sku: "SLP2050",
        name: "2050 PSI 2-in-1 Electric Pressure Washer",
        description: "The STANLEY® SLP2050 2-In-1 is the most versatile and innovative electric pressure washer.",
        features: [
        "Mobile car to the cleaning job or detach and carry it as a stand alone pressure washer anywhere",
        "Save water with up to 80% over a standard garden hose with 40% more water pressure"
        ],
        category: "Outdoor",
        subCategory: ["Pressure Washer", "All Tools"],
        price: 119.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/SLP2050/SLP2050_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/SLP2050/SLP2050_1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/SLP2050/SLP2050_2.jpg?resize=530x530",
        ],
        soh: 4000,
        moq: 50
    },
    {
        id: 6,
        sku: "BDS6652",
        name: "100 ft x 5/8' Professional Grade Hose",
        description: "The Stanley FATMAX Professional Grade Water Hose features advanced technologies to make your work outdoors stress-free.",
        features: [
        "AntiKink™ Technolgy",
        "500 PSI"
        ],
        category: "Outdoor",
        subCategory: ["Water Hoses", "All Tools"],
        price: 29.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/BDS6652/BDS6652_P1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/BDS6652/BDS6652_P1.jpg?resize=530x530",
        ],
        soh: -1,
        moq: 500
    },
    {
        id: 7,
        sku: "BDS7288",
        name: "ACCUSCAPE™ Bulb Planter",
        description: "With the STANLEY® ACCUSCAPE® Bulb Planter, planting bulbs in your garden has never been easier.",
        features: [
        "Powder coated steel body resists rust",
        "Solid hardwood handle is naturally durable",
        "Attractive hammertone finish"
        ],
        category: "Outdoor",
        subCategory: ["Cultivators", "All Tools"],
        price: 24.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/BDS7288/BDS7288_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/BDS7288/BDS7288_1.jpg?resize=530x530",
        ],
        soh: 12000,
        moq: 500
    },
    {
        id: 8,
        sku: "BDS8317",
        name: "1200 lb Poly Cart",
        description: "The STANLEY® 1200 lbs. Poly Cart is just the thing any you need for any heavy-duty outdoor job.",
        features: [
        "Heavy duty steel frame is powder coated to resist rust",
        "1200 lbs. load capacity and pneumatic wheels"
        ],
        category: "Outdoor",
        subCategory: ["Cultivators", "All Tools"],
        price: 38.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/BDS8317/BDS8317_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/BDS8317/BDS8317_1.jpg?resize=530x530",
        ],
        soh: 3000,
        moq: 100
    },
    {
        id: 9,
        sku: "BDS7675",
        name: "FIBERGLASS D-HANDLE GARDEN FORK",
        description: "Built from heat treated steel and durable fiberglass, the STANLEY® Fiberglass D-Handle Garden Fork is strong enough to stand up to any job.",
        features: [
        "Super-durable heat treated steel head holds up to heavy duty jobs",
        "Long fiberglass handle reinforced with steel to maintain its integrity over time"
        ],
        category: "Outdoor",
        subCategory: ["Fork", "All Tools"],
        price: 49.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/BDS7675/BDS7675_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/BDS7675/BDS7675_1.jpg?resize=530x530",
        ],
        soh: 15000,
        moq: 500
    },
    {
        id: 10,
        sku: "BDS6498",
        name: "ACCUSCAPE™ FIBERGLASS LONG HANDLE ROUND POINT SHOVEL",
        description: "Durable and versatile, the STANLEY® ACCUSCAPE® Fiberglass Round Point Shovel is perfect for any digging or transplanting task.",
        features: [
        "Tempered, heat-treated steel offers greater strength and longer life",
        "Fiberglass handle for greater durability; won't crack, rot, or splinter"
        ],
        category: "Outdoor",
        subCategory: ["Fastening Accessories", "All Tools"],
        price: 59.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/BDS6498/BDS6498_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/BDS6498/BDS6498_1.jpg?resize=530x530",
        ],
        soh: 18000,
        moq: 500
    },
];

export const powerToolsList: Product[] = [
    {
        id: 1,
        sku: "PP1DCS",
        name: "1200 Peak Amp Power Station",
        description: "The Stanley Professional Power Station is an all in one solution, a 120 PSI air compressor and portable USB power.",
        features: [
        "500 Amp/1200 peak amp jump-starter",
        "Includes heavy-duty 24 in. powder-coated jumper clamps",
        ],
        category: "Power Tools",
        subCategory: ["Car battery Chargers", "All Tools"],
        price: 149.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/PP1DCS/PP1DCS_2.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/PP1DCS/PP1DCS_2.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/PP1DCS/PP1DCS_E2.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/PP1DCS/PP1DCS_E1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/PP1DCS/PP1DCS_A1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/PP1DCS/PP1DCS_1.jpg?resize=530x530",
        ],
        soh: 2000,
        moq: 100
    },
    {
        id: 2,
        sku: "STHV215BW",
        name: "Cordless Handheld Wet/Dry Vacuum",
        description: "The Cordless Handheld Wet/Dry Vacuum is perfect for easy clean-up of wet and dry debris.",
        features: [
        "Cordless Lithium Ion technology for strong suction",
        "Designed to pick up both wet and dry debris"
        ],
        category: "Power Tools",
        subCategory: ["Vacuum", "All Tools"],
        price: 79.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHV215BW/STHV215BW_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHV215BW/STHV215BW_1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHV215BW/STHV215BW_2.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHV215BW/STHV215BW_A1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHV215BW/STHV215BW_A4.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHV215BW/STHV215BW_P1.jpg?resize=530x530",
        ],
        soh: 0,
        moq: 500
    },
    {
        id: 3,
        sku: "SL18115",
        name: "5 gal 4 Peak MAX HP Horsepower Vacuum",
        description: "The STANLEY stainless steel 5 gallon wet/dry vacuum features a powerful heavy duty motor for industry leading performance.",
        features: [
        "The powerful blower port instantly converts vacuum to power blower",
        "Strong handle for easy carrying"
        ],
        category: "Power Tools",
        subCategory: ["Vacuum", "All Tools"],
        price: 124.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/SL18115/SL18115_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/SL18115/SL18115_1.jpg?resize=530x530",
        ],
        soh: 2500,
        moq: 50
    },
    {
        id: 4,
        sku: "SL18115P",
        name: "5 gal 4 Peak MAX HP Pro Wet/Dry Vacuum",
        description: "STANLEY Wet/Dry Vacuums are ideal for wet and dry pick ups in your home, garage, workshop or vehicle.",
        features: [
        "Powerful blower port instantly converts vacuum to power blower",
        "Strong handle for easy carrying"
        ],
        category: "Power Tools",
        subCategory: ["Vacuum", "All Tools"],
        price: 149.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/SL18115P/SL18115P_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/SL18115P/SL18115P_1.jpg?resize=530x530",
        ],
        soh: -1,
        moq: 100
    },
    {
        id: 5,
        sku: "SL18127P",
        name: "2 gal 2 Peak MAX HP Portable Vacuum",
        description: "The STANLEY SL18127P Portable Poly Series 2 gallon, 2 peak MAX HP wall mounted wet/dry vacuum.",
        features: [
        "Wall-mount storage design",
        "Power: 2 peak MAX HP",
        "Voltage: 120V AC/60Hz"
        ],
        category: "Power Tools",
        subCategory: ["Vacuum", "All Tools"],
        price: 85.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/SL18127P/SL18127P_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/SL18127P/SL18127P_1.jpg?resize=530x530",
        ],
        soh: 8000,
        moq: 200
    },
    {
        id: 6,
        sku: "SL18117",
        name: "8 gal 4 Peak MAX HP Stainless Steel Vacuum",
        description: "The STANLEY stainless steel 8 gallon wet/dry vacuum features a powerful motor for industry leading performance.",
        features: [
        "4 peak MAX HP motor",
        "8 gallon container",
        "Airflow: 85 CFM",
        ],
        category: "Power Tools",
        subCategory: ["Vacuum", "All Tools"],
        price: 199.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/SL18117/SL18117_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/SL18117/SL18117_1.jpg?resize=530x530",
        ],
        soh: 2500,
        moq: 50
    },
    {
        id: 7,
        sku: "SL18134P",
        name: "2.5 gal 3 MAX HP Portable Vacuum",
        description: "STANLEY Wet/Dry Vacuums are ideal for wet and dry pick ups in your home, garage, workshop or vehicle.",
        features: [
        "Lightweight & compact",
        "3 peak MAX HP",
        "2.5 gallon poly container"
        ],
        category: "Power Tools",
        subCategory: ["Vacuum", "All Tools"],
        price: 90.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/SL18134P/SL18134P_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/SL18134P/SL18134P_1.jpg?resize=530x530",
        ],
        soh: 5000,
        moq: 100
    },
    {
        id: 8,
        sku: "SL18123P",
        name: "3 gal 3 MAX HP Portable Vacuum",
        description: "STANLEY SL18123P 3 gallon, 3 peak MAX HP wet/dry vacuum is lightweight.",
        features: [
        "Sealed pressure (Inches of water): 52-inches",
        "Electrical rating: 120-volts/60-Hz/ 7-amps"
        ],
        category: "Power Tools",
        subCategory: ["Vacuum", "All Tools"],
        price: 65.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/SL18123P/SL18123P_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/SL18123P/SL18123P_1.jpg?resize=530x530",
        ],
        soh: 6000,
        moq: 100
    },
    {
        id: 9,
        sku: "SL18129",
        name: "4 gal 4 MAX HP Vacuum",
        description: "STANLEY Wet/Dry vacuums are ideal for wet and dry pick ups in your home, garage, workshop or vehicle.",
        features: [
        "On-board accessories storage",
        "Large switch button with waterproof design for safe and easy operation"
        ],
        category: "Power Tools",
        subCategory: ["Vacuum", "All Tools"],
        price: 89.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/SL18129/SL18129_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/SL18129/SL18129_1.jpg?resize=530x530",
        ],
        soh: 250000,
        moq: 5000
    },
    {
        id: 10,
        sku: "SL18199P",
        name: "12 gal 5.5 Peak MAX HP Pro Vacuum",
        description: "STANLEY 5.5 peak MAX HP 12 gallon wet/dry vacuum, with a powerful motor for industry leading performance.",
        features: [
        "Powerful, ideal for heavy-duty pickup",
        "5.5 peak MAX HP",
        "12 gallon poly container"
        ],
        category: "Power Tools",
        subCategory: ["Vacuum", "All Tools"],
        price: 249.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/SL18199P/SL18199P_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/SL18199P/SL18199P_1.jpg?resize=530x530",
        ],
        soh: 100000,
        moq: 1000
    },
];

export const storageList: Product[] = [
    {
        id: 1,
        sku: "STST26331",
        name: "26 in ESSENTIAL™ Tool Box",
        description: "Pros like you know that organization and convenient access to tools can be very advantageous.",
        features: [
        "ORGANIZE SMALL PARTS with the help of top-level arrangers",
        "SMOOTH OPENING AND CLOSING: Geometric lock latches safely secure your tools",
        ],
        category: "Storage",
        subCategory: ["Toolboxes", "All Tools"],
        price: 49.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST26331/STST26331_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST26331/STST26331_1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST26331/STST26331_2.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST26331/STST26331_3.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST26331/STST26331_4.jpg?resize=530x530"
        ],
        soh: 0,
        moq: 500
    },
    {
        id: 2,
        sku: "FMST26322",
        name: "26 in STANLEY® FATMAX® PRO Toolbox",
        description: "This STANLEY® 26 in. FATMAX® PRO Toolbox features an integrated IP54 seal.",
        features: [
        "Two removable screwdriver bit holders for organization and storage",
        "Long, aluminum handle for easy carrying and durability"
        ],
        category: "Storage",
        subCategory: ["Toolboxes", "All Tools"],
        price: 59.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/FMST26322/FMST26322_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/FMST26322/FMST26322_1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/FMST26322/FMST26322_2.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/FMST26322/FMST26322_3.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/FMST26322/FMST26322_A1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/FMST26322/FMST26322_A2.jpg?resize=530x530"
        ],
        soh: 8000,
        moq: 250
    },
    {
        id: 3,
        sku: "FMST14520",
        name: "STANLEY® FATMAX® XL Deep Tool Organizer",
        description: "This STANLEY® FATMAX® XL Deep Tool Organizer includes 3 large and 9 medium cups for organization of small tools and parts.",
        features: [
        "Integrated water seal helps protect contents.",
        "IP53 ratedAnti-rust metal latches for long life"
        ],
        category: "Storage",
        subCategory: ["Toolboxes", "All Tools"],
        price: 65.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/FMST14520/FMST14520_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/FMST14520/FMST14520_1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/FMST14520/FMST14520_2.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/FMST14520/FMST14520_A1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/FMST14520/FMST14520_A2.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/FMST14520/FMST14520_A3.jpg?resize=530x530"
        ],
        soh: -1,
        moq: 500
    },
    {
        id: 4,
        sku: "STST14022",
        name: "SORTMASTER® Junior",
        description: "Secure your tools and supplies with the Stanley® SortMaster Junior.",
        features: [
        "Innovative locking latches and carriage of 3 at once saves time",
        "Removable dividers provide high customization for small parts and larger hand tools"
        ],
         category: "Storage",
        subCategory: ["Tool Organizers & Bins", "All Tools"],
        price: 55.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST14022/STST14022_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST14022/STST14022_1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST14022/STST14022_F1.jpg?resize=530x530"
        ],
        soh: 9000,
        moq: 500
    },
    {
        id: 5,
        sku: "STST55204",
        name: "6-1/2 in Bin Organizer",
        description: "The STANLEY® 6-1/2 in. Bin Organizer brings organization to any workspace.",
        features: [
        "Bins can be stacked or nested",
        "Wide mouth design for easy access to contents",
        "Includes wall mounting brackets"
        ],
         category: "Storage",
        subCategory: ["Tool Organizers & Bins", "All Tools"],
        price: 15.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST55204/STST55204_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST55204/STST55204_1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST55204/STST55204_2.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST55204/STST55204_3.jpg?resize=530x530"
        ],
        soh: 20000,
        moq: 500
    },
    {
        id: 6,
        sku: "511150M",
        name: "STANLEY® FATMAX® Technician Tool Bag",
        description: "STANLEY® FATMAX® Technician Tool Bag. Multiple easy access pockets & compartments, tape chain & tape holder.",
        features: [
        "Round bucket with rigid walls",
        "Removable rubber grip handle & padded shoulder strap provide easy access and extra comfort"
        ],
         category: "Storage",
        subCategory: ["Tool Bags", "All Tools"],
        price: 35.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/511150M/511150M_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/511150M/511150M_1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/TRA706TCS/TRA706TCS_P2.jpg?resize=530x530",
        ],
        soh: 7000,
        moq: 200
    },
    {
        id: 7,
        sku: "FMST514150",
        name: "STANLEY® FATMAX® 14 in Open Mouth Tool Bag",
        description: "STANLEY® FATMAX® 14 in Open Mouth Tool Bag is convenient and reliable.",
        features: [
        "Multiple pockets for organization",
        "Strong reinforce plastic base",
        "Covered Front Pocket"
        ],
         category: "Storage",
        subCategory: ["Tool Bags", "All Tools"],
        price: 59.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/FMST514150/FMST514150_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/FMST514150/FMST514150_1.jpg?resize=530x530",
        ],
        soh: 5000,
        moq: 100
    },
    {
        id: 8,
        sku: "STST22742BK",
        name: "100 Series 4-Drawer Rolling Tool Cabinet",
        description: "This 26-inch wide 4-Drawer Rolling Tool Cabinet is constructed of all-steel for strength and durability.",
        features: [
        "Four 50 lb. load capacity drawers",
        "500 lb. load rating with four 4 in. x 2 in. casters, two lock and swivel"
        ],
         category: "Storage",
        subCategory: ["Workshop Storage", "All Tools"],
        price: 119.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST22742BK/STST22742BK_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST22742BK/STST22742BK_1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST22742BK/STST22742BK_2.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST22742BK/STST22742BK_G1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST22742BK/STST22742BK_G11.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST22742BK/STST22742BK_G4.jpg?resize=530x530",
        ],
        soh: 1500,
        moq: 50
    },
    {
        id: 9,
        sku: "STST33031",
        name: "ESSENTIAL™ Mobile Chest",
        description: "With a large capacity, and robust 7' wheels, the Essential™ Mobile Chest is a jobsite go-to.",
        features: [
        "Large capacity storage - 13 Gallon",
        "7'coated wheel and metal handle for convenient maneuverability"
        ],
         category: "Storage",
        subCategory: ["Mobile Tool Storage", "All Tools"],
        price: 129.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST33031/STST33031_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST33031/STST33031_1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST33031/STST33031_2.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST33031/STST33031_3.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST33031/STST33031_4.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST33031/STST33031_5.jpg?resize=530x530",
        ],
        soh: 1000,
        moq: 50
    },
    {
        id: 10,
        sku: "FMST21065",
        name: "20 in STANLEY® FATMAX® Rolling Tool Case",
        description: "The STANLEY FATMAX® Rolling Tool Case  features a unique accordion structure, with various inner organization storage.",
        features: [
        "Removable horizontal and vertical dividers",
        "Thick rubber coated handle for superior grip"
        ],
         category: "Storage",
        subCategory: ["Mobile Tool Storage", "All Tools"],
        price: 99.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/FMST21065/FMST21065_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/FMST21065/FMST21065_1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/FMST21065/FMST21065_2.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/FMST21065/FMST21065_3.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/FMST21065/FMST21065_P1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/FMST21065/FMST21065_P2.jpg?resize=530x530",
        ],
        soh: 4000,
        moq: 100
    },
];

export const workspaceList: Product[] = [
    {
        id: 1,
        sku: "STST60626",
        name: "2 Way Adjustable Saw Horse (2 Pk)",
        description: "The STANLEY® Folding Adjustable Height and Width Sawhorse (Pair) provides a quick and convenient makeshift workbench.",
        features: [
        "ADJUSTABLE HEIGHT & WIDTH: With smooth adjustment mechanism, for convenience and versatility, whatever the job.",
        "FOLDING DESIGN: For convenient storage and transportation.",
        ],
         category: "Workspace",
        subCategory: ["Sawhorses", "All Tools"],
        price: 88.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST60626/STST60626_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST60626/STST60626_1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST60626/STST60626_A1.jpg?resize=530x530"
        ],
        soh: 5000,
        moq: 200
    },
    {
        id: 2,
        sku: "STST11552",
        name: "33-1/2 in x 23-1/2 in Fold-Up Workbench",
        description: "Made for trade workers who require a versatile, portable working surface.",
        features: [
        "EASILY DEPLOY AND GET RIGHT TO WORK: Quick-folding feature designed for easy use",
        "HELPS PREVENT UNINTENDED FOLDING with automatic safety plate lock mechanism"
        ],
        category: "Workspace",
        subCategory: ["Workbench", "All Tools"],
        price: 49.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST11552/STST11552_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST11552/STST11552_1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST11552/STST11552_3.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST11552/STST11552_A2.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST11552/STST11552_A9.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST11552/STST11552_A7.jpg?resize=530x530"
        ],
        soh: -1,
        moq: 250
    },
    {
        id: 3,
        sku: "TT003-SY",
        name: "Take Apart Cement Truck Toy Kit",
        description: "Help your future construction expert develop their hand-eye coordination, fine motor skills, and problem-solving skills with the Take Apart Cement Truck Toy Kit.",
        features: [
        "MADE OF HIGH-GRADE, NON-TOXIC ABS: Quality craftsmanship featuring rubberized wheels and an extra bolt— the 11 bolts are easy to handle by little hands using the plastic Phillips head screwdriver with built-in wrench",
        ],
        category: "Workspace",
        subCategory: ["Toys", "All Tools"],
        price: 39.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/TT003-SY/TT003-SY_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/TT003-SY/TT003-SY_1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/TT003-SY/TT003-SY_A1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/TT003-SY/TT003-SY_A2.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/TT003-SY/TT003-SY_P1.jpg?resize=530x530",
        ],
        soh: 0,
        moq: 200
    },
    {
        id: 4,
        sku: "TT002-SY",
        name: "Take Apart Front Loader Toy Kit",
        description: "Ideal for children who like to take apart and put back together toys, this 25-piece Take Apart Front Loader Toy Kit",
        features: [
        "MADE OF HIGH-GRADE, NON-TOXIC ABS: Quality craftsmanship featuring rubberized wheels and an extra bolt— the 12 bolts are easy to handle by little hands using the plastic Phillips head screwdriver with built-in wrench",
        ],
        category: "Workspace",
        subCategory: ["Toys", "All Tools"],
        price: 35.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/TT002-SY/TT002-SY_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/TT002-SY/TT002-SY_1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/TT002-SY/TT002-SY_A1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/TT002-SY/TT002-SY_A2.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/TT002-SY/TT002-SY_P1.jpg?resize=530x530",
        ],
        soh: 5000,
        moq: 250
    },
    {
        id: 5,
        sku: "HLWAKS",
        name: "Waterproof LED Headlamp",
        description: "The STANLEY® Waterproof LED Headlamp has up to 22 hours of runtime making it ideal for indoor and outdoor projects.",
        features: [
        "3 Ultra-bright LEDs reaching up to 193 lumens",
        "6 Auxiliary LEDs for wide angle viewing",
        "Up to 22 hours of runtime"
        ],
        category: "Workspace",
        subCategory: ["Work lights", "All Tools"],
        price: 15.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/HLWAKS/HLWAKS_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/HLWAKS/HLWAKS_1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/HLWAKS/HLWAKS_A2.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/HLWAKS/HLWAKS_A1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/HLWAKS/HLWAKS_A3.jpg?resize=530x530",
        ],
        soh: 15000,
        moq: 500
    },
    {
        id: 6,
        sku: "2075",
        name: "128 oz Hand Sanitizer Gel",
        description: "Reduce bacteria on the skin with the STANLEY® Earth Hand Sanitizer Gel.",
        features: [
        "Active Ingredients: Ethyl Alcohol 72%",
        "Eliminates 99.99% of common harmful germs* with moisturizers and Vitamin E"
        ],
        category: "Workspace",
        subCategory: ["Hand Sanitizers", "All Tools"],
        price: 79.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/2075/2075_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/2075/2075_1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/2075/2075_2.jpg?resize=530x530",
        ],
        soh: 16000,
        moq: 500
    },
    {
        id: 7,
        sku: "31610",
        name: "SurgeMAX Pro 9 Surge Protector",
        description: "The STANLEY® SurgeMax pro features 400-J surge protection ion. Its spaced outlet design provides ample room for adapters and other large plugs.",
        features: [
        "Long power bar provides ample room for adapters and other large plugs",
        "9 outlets",
        "400 joule surge suppression"
        ],
        category: "Workspace",
        subCategory: ["Power Strips & Adapters", "All Tools"],
        price: 24.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/31610/ST31610_F1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/31610/ST31610_F1.jpg?resize=530x530",
        ],
        soh: 10000,
        moq: 1000
    },
    {
        id: 8,
        sku: "S1007",
        name: "2 pc Ratchet Straps",
        description: "These 1.5 in. by 16 ft. heavy-duty and weather-resistant premium 2 pc.",
        features: [
        "Safe working load limit of 1,100 lbs. and best-in-class break strength of 3,300 lbs.",
        "Black-coated components",
        "1.5 in. wide webbing with reinforced edges"
        ],
        category: "Workspace",
        subCategory: ["Cargo Management", "All Tools"],
        price: 29.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/S1007/S1007_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/S1007/S1007_1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/S1007/S1007_A1.jpg?resize=530x530",
        ],
        soh: 30000,
        moq: 2000
    },
    {
        id: 9,
        sku: "33202",
        name: "SurgeQuad USB",
        description: "Introducing the STANLEY SurgeQuad and USB Wall Tap, the ultimate solution to your power needs.",
        features: [
        "Converts duplex wall outlet into 4 grounded outlets",
        "1080 joules of surge protection",
        "2 USB-A charging ports"
        ],
        category: "Workspace",
        subCategory: ["Power Strips & Adapters", "All Tools"],
        price: 19.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/33202/ST33202_2.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/33202/ST33202_2.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/33202/ST33202_1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/33202/ST33202_F1.jpg?resize=530x530",
        ],
        soh: 25000,
        moq: 2500
    },
    {
        id: 10,
        sku: "S4004",
        name: "Heavy-Duty Vacuum Mount Suction Cup",
        description: "This powerful Heavy-Duty Vacuum Mount Suction Cup attaches to any smooth, flat surface, and can be used for many purposes.",
        features: [
        "Supports cargo loads up to 200 lbs.",
        "Fast, easy, tool-free installation."
        ],
        category: "Workspace",
        subCategory: ["Cargo Management", "All Tools"],
        price: 26.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/S4004/S4004_1.jpg?resize=530x530",
        images: [
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/S4004/S4004_1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/S4004/S4004_2.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/S4004/S4004_4.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/S4004/S4004_A1.jpg?resize=530x530",
        "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/S4004/S4004_A2.jpg?resize=530x530",
        ],
        soh: 15000,
        moq: 1000
    },
];

const cartList : Cart[] = [
    {
        sku: "SWKBN1250",
        name: "STANLEY® FATMAX® 16 ft. x 1-1/4 in. Premium Tape",
        price: 99.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/FMHT38316S/FMHT38316S_2.jpg?resize=530x530",
        quantity: 50,
        soh: 10000,
        backOrder: 0,
        moq: 50
    },
    {
        sku: "51-124X",
        name: "FatMax® Welded Hammer (14 oz)",
        price: 79.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/51-124X/51-124_2.jpg?resize=530x530",
        quantity: 100,
        soh: 20000,
        backOrder: 0,
        moq: 100
    },
    {
        sku: "SF44-356H",
        name: "STANLEY® FATMAX® 380mm x 11TPI Blade Armour Saw",
        price: 59.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/20-046/20-046_1.jpg?resize=530x530",
        quantity: 500,
        soh: 6000,
        backOrder: 0,
        moq: 250
    },
    {
        sku: "STHT10432",
        name: "CONTROL-GRIP™ Retractable Utility Knife",
        price: 29.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHT10432/STHT10432_1.jpg?resize=530x530",
        quantity: 100,
        soh: 5000,
        backOrder: 0,
        moq: 100
    },
    {
        sku: "AW90-947",
        name: "150mm/6 in MAXSTEEL™ Adjustable Wrench",
        price: 59.99,
        image: "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/90-947/90-947_1.jpg?resize=530x530",
        quantity: 2000,
        soh: 50000,
        backOrder: 0,
        moq: 1000
    },
];

export class ProductStore {
    count = 0;
    focusProducts: Product[] = [...focusProductsList];
    accessories: Product[] = [...accessoriesList];
    handTools: Product[] = [...handToolsList];
    outdoor: Product[] = [...outdoorList];
    powerTools: Product[] = [...powerToolsList];
    storage: Product[] = [...storageList];
    workspace: Product[] = [...workspaceList];
    skuSearchList: Product[] = [...accessoriesList, ...handToolsList, ...outdoorList, ...powerToolsList, ...storageList, ...workspaceList];
    currentFilter: string | null = null;
    cart: Cart[] = [...cartList];
    uploadData: UploadData[] = [];
    userInfo: userInfo = {
        code: 1305431,
        name: "Ethan Carter",
        contact: 7458962879, 
        creditLimit: 12100,
        availableLimit: 0,
        overdue: 0
    };

    openChangeCustomerModal: boolean = false;

    constructor(private rootStore : RootStore) {
        makeAutoObservable(this);
    }

    //Change customer Modal
    closeModal() {
        this.openChangeCustomerModal = false;
    }

    openModal() {
        this.openChangeCustomerModal = true;
    }

    //User Info
    get UserInfo() : userInfo {
        return this.userInfo;   
    }

    set UserInfo(user: userInfo) {
        this.userInfo = user;
    }

    // New sorting function
    sortProducts(listType: ProductListType, sortKey: SortKey) {
        const [field, direction] = sortKey.split(':') as [keyof Product, 'asc' | 'desc'];
        
        this[listType].sort((a, b) => {
            // Name Sorting
            if (typeof a[field] === 'string' && typeof b[field] === 'string') {
                const valA = String(a[field]).toLowerCase();
                const valB = String(b[field]).toLowerCase();
                return direction === 'asc' 
                    ? valA.localeCompare(valB)
                    : valB.localeCompare(valA);
            }
            // Price Sorting
            else if (typeof a[field] === 'number' && typeof b[field] === 'number') {
                return direction === 'asc'
                    ? Number(a[field]) - Number(b[field])
                    : Number(b[field]) - Number(a[field]);
            }
            // Fallback for other types
            return 0;
        });
    }

    // Simple filter function
    filterProducts(listType: ProductListType, filterKey: string) {
        // Extract category from filterKey (format "category:categoryname")
        const category = filterKey.split(':')[1];
        this.currentFilter = category === "all tools" ? null : (category ?? null);
        
        // Reset to original list if no filter
        if (!this.currentFilter) {
            this[listType] = listType === 'accessories' 
                ? [...accessoriesList] 
                :  listType === 'handTools'
                ? [...handToolsList]
                : listType === 'outdoor'
                ? [...outdoorList]
                :  listType === 'powerTools'
                ? [...powerToolsList]
                : listType === 'storage'
                ? [...storageList]
                : listType === 'workspace'
                ? [...workspaceList]
                : [...focusProductsList];
            return;
        }

        // Apply filter
        this[listType] = (this[listType] = listType === 'accessories' 
                ? [...accessoriesList] 
                :  listType === 'handTools'
                ? [...handToolsList]
                : listType === 'outdoor'
                ? [...outdoorList]
                :  listType === 'powerTools'
                ? [...powerToolsList]
                : listType === 'storage'
                ? [...storageList]
                : listType === 'workspace'
                ? [...workspaceList]
                : [...focusProductsList])
            .filter(product => 
                product.subCategory?.some(cat => 
                    cat.toLowerCase() === this.currentFilter?.toLowerCase()
                )
            );
    }

    //Cart 

    handleIncrementOrDecrement = (sku: string, newQuantity: number) => {
        const product = this.cart.find(p => p.sku === sku);
        if (product) {
            if(newQuantity > (product.soh * 2)) {
                newQuantity = product.soh * 2
            }
            
            product.quantity = Math.max(1, newQuantity);
            if( newQuantity > product.soh) {
                product.backOrder = newQuantity - product.soh;
            }
        }
    }

    handleInputQuantityChange = (sku: string, e: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(e.target.value);
        const product = this.cart.find(p => p.sku === sku);
        if (!isNaN(value) && product && value >= product.moq) {
            value = Math.round(value / product.moq) * product.moq;
            if(value > (product.soh * 2)) {
                value = product.soh * 2
            }

            product.quantity = value;
            if( value > product.soh) {
                product.backOrder = value - product.soh;
            }else{
                product.backOrder = 0;
            }
        }
    };

    addProductInTheCart = (product : Cart) => {
        const existingProduct = this.cart.find(p => p.sku === product.sku);
        if(existingProduct){
            existingProduct.quantity = existingProduct.quantity + product.quantity;
        }else{
            this.cart.push(product);
        }
        this.rootStore.toastStore.success(`Product ${product.name} added to cart successfully`);
    }

    bulkAddProductsToCart = (products: Cart[]) => {
        products.forEach(product => {
            const existingProduct = this.cart.find(p => p.sku === product.sku);
            if (existingProduct) {
                //When quantity is maximum of twice the stock on hand (soh)
                if(existingProduct.quantity + product.quantity > (existingProduct.soh * 2)) {
                    existingProduct.quantity = existingProduct.soh * 2;
                    existingProduct.backOrder = existingProduct.soh;
                }
                const existingProductQuantity = existingProduct.quantity + product.quantity;
                existingProduct.quantity = existingProductQuantity;
                if(existingProduct.quantity - existingProduct.soh > 0){
                    existingProduct.backOrder = existingProduct.quantity - existingProduct.soh;
                }
            } else {
                this.cart.push(product);
            }
        });
        this.rootStore.toastStore.success(`Products uploaded to cart successfully`);
    }

    removeProductFromTheCart = (sku: string) => {
        const deletedProduct = this.cart.find(product => product.sku === sku);
        this.cart = this.cart.filter((product) => product.sku !== sku);
        this.rootStore.toastStore.success(`Product ${deletedProduct?.name ?? ""} Deleted Successfully from the Cart`);
    }

    get CartTotal(){
        return this.cart.reduce(
            (sum, product) => sum + product.price * (product.quantity),
            0
        );
    }

    get CartTotalItems(){
        return this.cart.reduce(
            (sum, product) => sum + (product.quantity),
            0
        );
    }

    //Upload Data
    set UploadedData(data: UploadData[]){
        this.uploadData = data;
    }

    get UploadedData(){
        return this.uploadData;
    }

    get getAllSKUs() : string[] {
        return this.skuSearchList.map(product => product.sku);
    }

    findUploadedProductsFromAllProducts(uploadData: UploadData[]): FindUploadedProducts[] {
        const uploadDataMap = new Map<string, number>();
        uploadData.forEach(item => {
            uploadDataMap.set(item.sku, item.quantity);
        });

        return this.skuSearchList
            .filter(product => uploadDataMap.has(product.sku))
            .map(product => ({
                ...product, // spread all product properties
                quantity: uploadDataMap.get(product.sku)! // add quantity
        }));
    }

    //Notify ME
    notifyMe(productName: string){
        this.rootStore.toastStore.info(`Thanks! We’ll notify you as soon as "${productName}" is back in stock.`);
    }
}