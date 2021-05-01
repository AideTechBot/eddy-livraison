export const RESTAURANT_DATA = [
    {
        name: "Manuel's Del Loco Tacos",
        address: "42 Avenue Dionne",
        dineIn: true,
        takeOut: true,
        curbsidePickup: true,
        orderURL: "https://mdionne.me",
        phoneNumber: "15065555555",
        openHours: [
            [0,12], // sunday
            [0,12], // monday
            [0,12], // tuesday
            [0,12], // wednesday
            [0,12], // thursday
            [0,24], // friday
            [0,12], // saturday
        ]
    },
    {
        name: "Manuel's Del Loco Tacos 2",
        address: "42 Avenue Dionne",
        dineIn: false,
        takeOut: true,
        curbsidePickup: false,
        orderURL: "https://mdionne.me",
        phoneNumber: "15065556666",
        openHours: [
            [0,12], //starts on sunday
            [0,12],
            [0,12],
            [0,12],
            [0,12],
            [0,12],
            [0,12],
        ]
    },
    {
        name: "Erik's Del Loco Tacos",
        address: "42 Avenue Dionne",
        dineIn: true,
        takeOut: true,
        curbsidePickup: true,
        orderURL: "https://mdionne.me",
        phoneNumber: "15065558888",
        openHours: [
            [0,24], //starts on sunday
            [0,12],
            [0,12],
            [0,12],
            [0,12],
            [0,12],
            [0,12],
        ]
    },
];