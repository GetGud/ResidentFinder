import { Property, Tour, Application, Message, Stay, BuyProperty } from '../types';

export const MOCK_PROPERTIES: Property[] = [
    {
        id: '1',
        price: '$2,450 - $4,200',
        priceMin: 2450,
        priceMax: 4200,
        address: 'The Emerald Heights',
        cityStateZip: 'Downtown, Seattle, WA 98101',
        beds: 'Studio - 3 Beds',
        bedsMin: 0,
        baths: '1 - 2 Baths',
        sqft: '450 - 1,200 sqft',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1512918760532-3ed462f01807?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1484154218962-a1c00207099b?auto=format&fit=crop&w=800&q=80'
        ],
        isNew: true,
        isVerified: true,
        rating: 4.8,
        reviewCount: 124,
        availability: 'Available Now',
        tags: ['Rooftop Lounge', 'In-unit W/D', 'Gym'],
        petsAllowed: true,
        coordinates: { x: 30, y: 40 },
        floorPlans: [
            {
                id: 'fp1',
                name: 'Studio',
                beds: 0,
                baths: 1,
                sqftMin: 450,
                sqftMax: 520,
                priceMin: 2450,
                priceMax: 2650,
                units: [
                    { unitNumber: '101', sqft: 450, price: 2450, availableDate: 'Now', floor: 1 },
                    { unitNumber: '205', sqft: 480, price: 2550, availableDate: 'Jan 15', floor: 2 },
                    { unitNumber: '312', sqft: 520, price: 2650, availableDate: 'Feb 1', floor: 3 }
                ]
            },
            {
                id: 'fp2',
                name: '1 Bedroom',
                beds: 1,
                baths: 1,
                sqftMin: 650,
                sqftMax: 750,
                priceMin: 2850,
                priceMax: 3200,
                units: [
                    { unitNumber: '402', sqft: 680, price: 2850, availableDate: 'Now', floor: 4 },
                    { unitNumber: '508', sqft: 720, price: 3100, availableDate: 'Now', floor: 5 },
                    { unitNumber: '615', sqft: 750, price: 3200, availableDate: 'Mar 1', floor: 6 }
                ]
            },
            {
                id: 'fp3',
                name: '2 Bedroom',
                beds: 2,
                baths: 2,
                sqftMin: 950,
                sqftMax: 1100,
                priceMin: 3600,
                priceMax: 4200,
                units: [
                    { unitNumber: '701', sqft: 980, price: 3600, availableDate: 'Now', floor: 7 },
                    { unitNumber: '802', sqft: 1050, price: 3900, availableDate: 'Feb 15', floor: 8 },
                    { unitNumber: '905', sqft: 1100, price: 4200, availableDate: 'Apr 1', floor: 9 }
                ]
            }
        ],
        fees: [
            { name: 'Application Fee', amount: '$50', type: 'one-time' },
            { name: 'Admin Fee', amount: '$250', type: 'one-time' },
            { name: 'Security Deposit', amount: '1 Month Rent', type: 'one-time' },
            { name: 'Pet Deposit', amount: '$500', type: 'one-time' },
            { name: 'Parking (Covered)', amount: '$150/mo', type: 'monthly' },
            { name: 'Storage Unit', amount: '$75/mo', type: 'monthly' }
        ],
        petPolicy: {
            allowed: true,
            deposit: 500,
            monthlyRent: 50,
            restrictions: 'Dogs and cats welcome. Breed restrictions apply.',
            maxWeight: 75
        },
        reviews: [
            {
                id: 'r1',
                author: 'Sarah M.',
                rating: 5,
                date: 'November 2024',
                text: 'Absolutely love living here! The rooftop lounge has amazing views of the city and the gym is always clean. Management is super responsive.',
                helpful: 24
            },
            {
                id: 'r2',
                author: 'James K.',
                rating: 4,
                date: 'October 2024',
                text: 'Great location and amenities. Only minor complaint is that parking can be tight on weekends. Otherwise, highly recommend!',
                helpful: 18
            },
            {
                id: 'r3',
                author: 'Emily R.',
                rating: 5,
                date: 'September 2024',
                text: 'The in-unit washer/dryer is such a game changer. Building is well-maintained and neighbors are friendly.',
                helpful: 12
            }
        ]
    },
    {
        id: '2',
        price: '$1,850+',
        priceMin: 1850,
        priceMax: 2200,
        address: 'Pineview Lofts',
        cityStateZip: 'Capitol Hill, Seattle, WA 98102',
        beds: '1 - 2 Beds',
        bedsMin: 1,
        baths: '1 Bath',
        sqft: '650 - 900 sqft',
        image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
        ],
        isSpecial: true,
        rating: 4.5,
        reviewCount: 89,
        availability: 'Available Now',
        tags: ['Pet Friendly', 'Parking'],
        petsAllowed: true,
        coordinates: { x: 55, y: 25 }
    },
    {
        id: '3',
        price: '$3,100 - $5,500',
        priceMin: 3100,
        priceMax: 5500,
        address: 'Azure Waterfront',
        cityStateZip: 'Belltown, Seattle, WA 98121',
        beds: '1 - 3 Beds',
        bedsMin: 1,
        baths: '1.5 - 3 Baths',
        sqft: '800 - 1,800 sqft',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1502005229766-52835791e802?auto=format&fit=crop&w=800&q=80'
        ],
        isVerified: true,
        rating: 4.9,
        reviewCount: 210,
        availability: 'Apr 1',
        tags: ['Water View', 'Pool', 'Concierge'],
        petsAllowed: false,
        coordinates: { x: 20, y: 60 }
    },
    {
        id: '4',
        price: '$1,650',
        priceMin: 1650,
        priceMax: 1650,
        address: 'The Brickyard',
        cityStateZip: 'Ballard, Seattle, WA 98107',
        beds: 'Studio',
        bedsMin: 0,
        baths: '1 Bath',
        sqft: '480 sqft',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
        ],
        rating: 4.2,
        reviewCount: 45,
        availability: 'Available Now',
        tags: ['Historic', 'Walkable'],
        petsAllowed: false,
        coordinates: { x: 70, y: 35 }
    },
    {
        id: '5',
        price: '$2,800+',
        priceMin: 2800,
        priceMax: 3500,
        address: 'Canvas Apartments',
        cityStateZip: 'Queen Anne, Seattle, WA 98109',
        beds: '1 - 2 Beds',
        bedsMin: 1,
        baths: '1 - 2 Baths',
        sqft: '700 - 1,100 sqft',
        image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=800&q=80'
        ],
        isVerified: true,
        rating: 4.6,
        reviewCount: 156,
        availability: 'May 1',
        tags: ['Modern', 'Smart Home'],
        petsAllowed: true,
        coordinates: { x: 45, y: 55 }
    },
    {
        id: '6',
        price: '$5,200',
        priceMin: 5200,
        priceMax: 5200,
        address: 'Skyline Penthouse',
        cityStateZip: 'Downtown, Seattle, WA 98101',
        beds: '3 Beds',
        bedsMin: 3,
        baths: '3 Baths',
        sqft: '2,400 sqft',
        image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=800&q=80'
        ],
        isSpecial: true,
        isVerified: true,
        rating: 5.0,
        reviewCount: 12,
        availability: 'Available Now',
        tags: ['Luxury', 'Private Elevator'],
        petsAllowed: true,
        coordinates: { x: 40, y: 50 }
    }
];

// Saved properties (subset of MOCK_PROPERTIES)
export const MOCK_SAVED_PROPERTIES = MOCK_PROPERTIES.slice(0, 4).map((p, i) => ({
    ...p,
    savedDate: ['2 days ago', '1 week ago', '3 days ago', 'Yesterday'][i],
    priceChange: i === 2 ? { from: '$3,400', to: '$3,100', date: 'Price dropped 2 days ago' } : null
}));

// Tours data
export const MOCK_TOURS: Tour[] = [
    {
        id: '1',
        propertyId: '1',
        propertyName: 'The Emerald Heights',
        propertyImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
        propertyAddress: '2300 4th Ave, Seattle, WA 98121',
        date: 'Tomorrow, Dec 6',
        time: '10:00 AM',
        type: 'In-Person',
        status: 'upcoming',
        agent: 'Sarah Miller'
    },
    {
        id: '2',
        propertyId: '3',
        propertyName: 'Azure Waterfront',
        propertyImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
        propertyAddress: '1200 Western Ave, Seattle, WA 98101',
        date: 'Dec 10',
        time: '2:30 PM',
        type: 'Video',
        status: 'upcoming',
        agent: 'Michael Chen'
    },
    {
        id: '3',
        propertyId: '2',
        propertyName: 'Pineview Lofts',
        propertyImage: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
        propertyAddress: '1401 E Pine St, Seattle, WA 98122',
        date: 'Nov 28',
        time: '11:00 AM',
        type: 'In-Person',
        status: 'completed',
        agent: 'Emily Davis',
        notes: 'Great natural light, loved the rooftop!'
    },
    {
        id: '4',
        propertyId: '4',
        propertyName: 'The Brickyard',
        propertyImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
        propertyAddress: '2201 NW Market St, Seattle, WA 98107',
        date: 'Nov 20',
        time: '3:00 PM',
        type: 'Self-Guided',
        status: 'completed'
    }
];

// Applications data
export const MOCK_APPLICATIONS: Application[] = [
    {
        id: '1',
        propertyId: '1',
        propertyName: 'The Emerald Heights',
        propertyImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
        propertyAddress: '2300 4th Ave, Unit 10B, Seattle, WA 98121',
        submittedDate: 'Dec 3, 2024',
        status: 'under_review',
        monthlyRent: '$2,850',
        moveInDate: 'Jan 1, 2025',
        documents: [
            { name: 'ID Verification', uploaded: true },
            { name: 'Proof of Income', uploaded: true },
            { name: 'Bank Statements', uploaded: true },
            { name: 'References', uploaded: false }
        ]
    },
    {
        id: '2',
        propertyId: '5',
        propertyName: 'Canvas Apartments',
        propertyImage: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=800&q=80',
        propertyAddress: '500 Queen Anne Ave N, Unit 304, Seattle, WA 98109',
        submittedDate: '',
        status: 'draft',
        monthlyRent: '$2,800',
        moveInDate: 'May 1, 2025',
        documents: [
            { name: 'ID Verification', uploaded: true },
            { name: 'Proof of Income', uploaded: false },
            { name: 'Bank Statements', uploaded: false },
            { name: 'References', uploaded: false }
        ]
    }
];

// Messages data
export const MOCK_MESSAGES: Message[] = [
    {
        id: '1',
        propertyId: '1',
        propertyName: 'The Emerald Heights',
        propertyImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
        contactName: 'Sarah Miller',
        contactRole: 'Leasing Agent',
        lastMessage: 'Great! I\'ll see you tomorrow at 10 AM. The building entrance is on 4th Ave.',
        lastMessageTime: '2 hours ago',
        unread: 1,
        messages: [
            { sender: 'other', text: 'Hi Alex! Thanks for scheduling a tour of The Emerald Heights.', time: 'Dec 4, 10:30 AM' },
            { sender: 'user', text: 'Hi Sarah! Looking forward to it. Is parking available for the tour?', time: 'Dec 4, 11:15 AM' },
            { sender: 'other', text: 'Yes! You can park in the visitor spots in the garage. I\'ll validate your parking.', time: 'Dec 4, 11:45 AM' },
            { sender: 'user', text: 'Perfect, thank you!', time: 'Dec 4, 2:00 PM' },
            { sender: 'other', text: 'Great! I\'ll see you tomorrow at 10 AM. The building entrance is on 4th Ave.', time: 'Today, 9:30 AM' }
        ]
    },
    {
        id: '2',
        propertyId: '3',
        propertyName: 'Azure Waterfront',
        propertyImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
        contactName: 'Michael Chen',
        contactRole: 'Property Manager',
        lastMessage: 'The video tour link has been sent to your email. Let me know if you have any questions!',
        lastMessageTime: 'Yesterday',
        unread: 0,
        messages: [
            { sender: 'user', text: 'Hi, I\'m interested in scheduling a video tour for the 2BR unit.', time: 'Dec 3, 3:00 PM' },
            { sender: 'other', text: 'Hi Alex! I\'d be happy to arrange that. Does Dec 10 at 2:30 PM work for you?', time: 'Dec 3, 4:15 PM' },
            { sender: 'user', text: 'That works perfectly!', time: 'Dec 3, 5:00 PM' },
            { sender: 'other', text: 'The video tour link has been sent to your email. Let me know if you have any questions!', time: 'Yesterday, 10:00 AM' }
        ]
    },
    {
        id: '3',
        propertyId: '2',
        propertyName: 'Pineview Lofts',
        propertyImage: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
        contactName: 'Emily Davis',
        contactRole: 'Leasing Coordinator',
        lastMessage: 'Thanks for visiting Pineview Lofts! Let me know if you\'d like to move forward with an application.',
        lastMessageTime: 'Nov 28',
        unread: 0,
        messages: [
            { sender: 'other', text: 'Thanks for visiting Pineview Lofts! Let me know if you\'d like to move forward with an application.', time: 'Nov 28, 1:00 PM' }
        ]
    }
];

// Short-term stays (Airbnb-style)
export const MOCK_STAYS: Stay[] = [
    {
        id: '1',
        title: 'Cozy Capitol Hill Studio',
        location: 'Capitol Hill, Seattle',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'
        ],
        pricePerNight: 89,
        rating: 4.92,
        reviewCount: 156,
        type: 'Entire place',
        guests: 2,
        beds: 1,
        baths: 1,
        amenities: ['WiFi', 'Kitchen', 'Washer', 'Free parking'],
        host: { name: 'Jennifer', isSuperhost: true },
        coordinates: { x: 45, y: 30 }
    },
    {
        id: '2',
        title: 'Modern Downtown Loft with Views',
        location: 'Downtown Seattle',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
        ],
        pricePerNight: 175,
        rating: 4.88,
        reviewCount: 89,
        type: 'Entire place',
        guests: 4,
        beds: 2,
        baths: 1,
        amenities: ['WiFi', 'Kitchen', 'Gym', 'City view', 'Self check-in'],
        host: { name: 'Marcus', isSuperhost: true },
        coordinates: { x: 30, y: 45 }
    },
    {
        id: '3',
        title: 'Waterfront Guest Suite',
        location: 'Ballard, Seattle',
        image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80'
        ],
        pricePerNight: 125,
        rating: 4.95,
        reviewCount: 234,
        type: 'Private room',
        guests: 2,
        beds: 1,
        baths: 1,
        amenities: ['WiFi', 'Breakfast', 'Free parking', 'Water view'],
        host: { name: 'David & Lisa', isSuperhost: true },
        coordinates: { x: 65, y: 25 }
    },
    {
        id: '4',
        title: 'Trendy Queen Anne Apartment',
        location: 'Queen Anne, Seattle',
        image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=800&q=80'
        ],
        pricePerNight: 145,
        rating: 4.78,
        reviewCount: 67,
        type: 'Entire place',
        guests: 3,
        beds: 1,
        baths: 1,
        amenities: ['WiFi', 'Kitchen', 'Patio', 'Pet friendly'],
        host: { name: 'Rachel', isSuperhost: false },
        coordinates: { x: 40, y: 55 }
    }
];

// Properties for sale
export const MOCK_BUY_PROPERTIES: BuyProperty[] = [
    {
        id: '1',
        price: 875000,
        address: '1425 Madison St',
        cityStateZip: 'Capitol Hill, Seattle, WA 98122',
        beds: 3,
        baths: 2,
        sqft: 1850,
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'],
        type: 'House',
        yearBuilt: 1924,
        lotSize: '5,200 sqft',
        status: 'Active',
        openHouse: 'Sat, Dec 7, 1-4 PM',
        coordinates: { x: 50, y: 35 }
    },
    {
        id: '2',
        price: 625000,
        address: '2100 3rd Ave #1204',
        cityStateZip: 'Belltown, Seattle, WA 98121',
        beds: 2,
        baths: 2,
        sqft: 1150,
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
        images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'],
        type: 'Condo',
        yearBuilt: 2018,
        status: 'Active',
        coordinates: { x: 25, y: 50 }
    },
    {
        id: '3',
        price: 549000,
        address: '4521 Fremont Ave N',
        cityStateZip: 'Fremont, Seattle, WA 98103',
        beds: 2,
        baths: 1.5,
        sqft: 1200,
        image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
        images: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80'],
        type: 'Townhome',
        yearBuilt: 2015,
        status: 'Pending',
        coordinates: { x: 60, y: 20 }
    },
    {
        id: '4',
        price: 1250000,
        address: '3845 Beach Dr SW',
        cityStateZip: 'West Seattle, WA 98116',
        beds: 4,
        baths: 3,
        sqft: 2800,
        image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=800&q=80',
        images: ['https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=800&q=80'],
        type: 'House',
        yearBuilt: 2020,
        lotSize: '7,500 sqft',
        status: 'Active',
        coordinates: { x: 15, y: 70 }
    }
];


