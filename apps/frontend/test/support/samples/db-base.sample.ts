import { DbSample } from "./db.sample";

const date1 = new Date(2020, 1, 1, 12, 0, 0).toISOString();
const date2 = new Date(2022, 1, 1, 12, 0, 0).toISOString();

export const DbBaseSample: DbSample = {
	inventories: [
		{
			id: 1,

			created: date1,
			updated: date1,

			name: "My house"
		}
	],
	items: [
		{
			id: 1,

			created: date1,
			updated: date1,

			modelId: 1
		},
		{
			id: 2,

			created: date2,
			updated: date2,

			modelId: 2
		},
		{
			// Blue pen
			id: 3,

			created: date2,
			updated: date2,

			modelId: 3
		},
		{
			// Black pen
			id: 4,

			created: date2,
			updated: date2,

			modelId: 4
		}
	],
	"items-models": [
		{
			id: 1,

			created: date1,
			updated: date1,

			description: "",
			name: "PC"
		},
		{
			id: 2,

			created: date1,
			updated: date1,

			description: "My only socks",
			name: "Socket"
		},
		{
			id: 3,

			created: date2,
			updated: date2,

			description: "",
			name: "Pen"
		},
		{
			id: 4,

			created: date2,
			updated: date2,

			description: "I always need one near me",
			name: "Inflatable pool"
		}
	],
	locations: [
		{
			id: 1,

			created: date1,
			updated: date1,

			description: "",
			name: "Living room",
			parentLocationId: null,
			subtitle: "Elise best place"
		},
		{
			id: 2,

			created: date1,
			updated: date2,

			description: "",
			name: "Elise's room",
			parentLocationId: null,
			subtitle: ""
		},
		{
			id: 3,

			created: date2,
			updated: date2,

			description:
				"My dresser where I put all my little clothes, such as T-shirts, sockets, and so on.",
			name: "Dresser",
			parentLocationId: 2,
			subtitle: ""
		}
	],
	movements: [],
	users: [
		{
			id: 1,

			created: date1,
			updated: date1,

			email: "elise@store.me",
			firstName: "Elise",
			lastName: "Store"
		}
	]
};
