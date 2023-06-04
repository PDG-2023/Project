import { DbSample } from "./db.sample";

const date1 = new Date(2020, 1, 1, 12, 0, 0).toISOString();
const date2 = new Date(2022, 1, 1, 12, 0, 0).toISOString();

export const DbBaseSample: DbSample = {
	categories: [
		{
			id: 1,

			created: date1,
			updated: date1,

			description:
				"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
			name: "Electronics",
			parentCategoryId: null
		},
		{
			id: 2,

			created: date1,
			updated: date2,

			description: "",
			name: "Office",
			parentCategoryId: null
		},
		{
			id: 3,

			created: date1,
			updated: date2,

			description: "",
			name: "To write",
			parentCategoryId: 2
		}
	],
	inventories: [
		{
			id: 1,

			created: date1,
			updated: date1,

			name: "My house",
			owner_id: 2,
			users: [1, 2]
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

			categories: [1],
			description: "",
			name: "PC"
		},
		{
			id: 2,

			created: date1,
			updated: date1,

			categories: [],
			description: "My only socks",
			name: "Socket"
		},
		{
			id: 3,

			created: date2,
			updated: date2,

			categories: [3],
			description: "",
			name: "Pen"
		},
		{
			id: 4,

			created: date2,
			updated: date2,

			categories: [2],
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

			email: "admin@local.host",
			firstName: "Admin",
			lastName: "Istrator",

			ownedInventories: [1],
			sharedInventories: []
		},
		{
			id: 2,

			created: date1,
			updated: date1,

			email: "elise@store.me",
			firstName: "Elise",
			lastName: "Store",

			ownedInventories: [],
			sharedInventories: [1]
		}
	]
};
