export const cameras: CameraModel[] = [
	{ id: 1, status: 'active' },
	{ id: 2, status: 'active' },
	{ id: 3, status: 'error' },
	{ id: 4, status: 'inactive' },
	{ id: 5, status: 'inactive' },
	{ id: 6, status: 'inactive' },
];

export const rooms: RoomModel[] = [
	{
		id: 1,
		name: 'Stanza 1',
		cameras: cameras.slice(0, 3),
	},
	{
		id: 2,
		name: 'Stanza 2',
		cameras: cameras.slice(3, cameras.length),
	},
];

export const cars: CarModel[] = [
	{
		id: 1,
		brand: 'Audi',
		model: 'RS5 Sportback',
		plate: 'XX 764 TT',
	},
	{
		id: 2,
		brand: 'Volkswagen',
		model: 'Golf 7 R',
		plate: 'WW 486 FF',
	},
];

export const guests: GuestModel[] = [
	{
		id: 1,
		name: 'Luca Natale',
		car: cars[0],
		initDate: Date.now(),
	},
	{
		id: 2,
		name: 'Simone Bignotti',
		car: cars[1],
		initDate: Date.now(),
	},
];

export const sessions: SessionModel[] = [
	{
		id: 1,
		room: rooms[0],
		guest: guests[0],
		status: 'active',
	},
	{
		id: 2,
		room: rooms[1],
		guest: guests[1],
		status: 'finished',
	},
];
