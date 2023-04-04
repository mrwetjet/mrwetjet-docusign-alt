import { Form } from "../fieldTypes";

export const FORM_DATA: Form = {
  collections: [
    {
      fieldIdentifiers: [
        "minor_full_name",
        "minor_birthday",
        "minor_relation_to_user",
      ],
      maxCount: 4,
      title: "Add Minors",
    },
  ],
  fields: {
    date: {
      coordinates: [
        { coordinate: [395, 679], page: 1 },
        { coordinate: [469, 155], page: 4 },
        { coordinate: [469, 99], page: 4 },
        { coordinate: [411, 130], page: 5 },
        { coordinate: [380, 529], page: 6 },
        { coordinate: [448, 489], page: 6 },
        { coordinate: [363, 512], page: 8 },
      ],
      default: [new Date().toLocaleDateString()],
      renderFieldInPDF: false,
    },
    owner_signature: {
      coordinates: [{ coordinate: [135, 155], page: 4 }],
      default: ["Rayvon Solomon"],
      renderFieldInPDF: false,
    },
    full_name: {
      coordinates: [
        { coordinate: [168, 638], page: 1 },
        { coordinate: [92, 225], page: 5 },
        { coordinate: [39, 258], page: 7 },
        { coordinate: [221, 614], page: 8 },
      ],
      inputType: "text",
      renderFieldInPDF: true,
      minCount: 1,
      maxCount: 1,
    },
    age: {
      coordinates: [{ coordinate: [463, 638], page: 1 }],
      inputType: "number",
      renderFieldInPDF: true,
      minCount: 1,
      maxCount: 1,
    },
    location: {
      coordinates: [{ coordinate: [78, 420], page: 2 }],
      inputType: "text",
      renderFieldInPDF: true,
      minCount: 1,
      maxCount: 1,
      hasValues: [
        "Bayview Park",
        "Caxambas Park",
        "Cocohatchee River Park",
        "Port Of Isles Marina",
        "Goodland Boating Park",
      ],
    },

    signature: {
      coordinates: [
        { coordinate: [135, 99], page: 4 },
        { coordinate: [134, 130], page: 5 },
        { coordinate: [40, 529], page: 6 },
        { coordinate: [38, 489], page: 6 },
        { coordinate: [92, 512], page: 8 },
      ],
      default: ["full_name"],
      renderFieldInPDF: false,
    },
    date_of_birth: {
      coordinates: [
        { coordinate: [349, 225], page: 5 },
        { coordinate: [352, 537], page: 8 },
      ],
      inputType: "date",
      renderFieldInPDF: true,
      minCount: 1,
      maxCount: 1,
    },
    phone_number: {
      coordinates: [
        { coordinate: [473, 225], page: 5 },
        { coordinate: [123, 537], page: 8 },
      ],
      inputType: "tel",
      renderFieldInPDF: true,
      minCount: 1,
      maxCount: 1,
    },
    address: {
      coordinates: [
        { coordinate: [77, 193], page: 5 },
        { coordinate: [82, 588], page: 8 },
      ],
      inputType: "text",
      renderFieldInPDF: true,
      minCount: 1,
      maxCount: 1,
    },
    city: {
      coordinates: [
        { coordinate: [383, 193], page: 5 },
        { coordinate: [61, 563], page: 8 },
      ],
      inputType: "text",
      renderFieldInPDF: true,
      minCount: 1,
      maxCount: 1,
    },
    state: {
      coordinates: [
        { coordinate: [62, 162], page: 5 },
        { coordinate: [264, 563], page: 8 },
      ],
      inputType: "text",
      renderFieldInPDF: true,
      hasValues: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "District of Columbia",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
      ],
      minCount: 1,
      maxCount: 1,
    },
    zip: {
      coordinates: [
        { coordinate: [202, 162], page: 5 },
        { coordinate: [345, 563], page: 8 },
      ],
      inputType: "number",
      renderFieldInPDF: true,
      minCount: 1,
      maxCount: 1,
    },
    email: {
      coordinates: [{ coordinate: [319, 162], page: 5 }],
      inputType: "email",
      renderFieldInPDF: true,
      minCount: 1,
      maxCount: 1,
    },
    concat_all_full_names_of_minors: {
      coordinates: [{ coordinate: [264, 489], page: 6 }],
      default: ["minor_full_name"],
      renderFieldInPDF: false,
    },

    // // First minor choice
    minor_full_name: {
      coordinates: [
        { coordinate: [120, 462], page: 8 },
        { coordinate: [120, 428], page: 8 },
        { coordinate: [120, 392], page: 8 },
        { coordinate: [120, 356], page: 8 },
      ],
      minCount: 1,
      renderFieldInPDF: true,
      inputType: "text",
    },
    minor_birthday: {
      coordinates: [
        { coordinate: [345, 462], page: 8 },
        { coordinate: [345, 428], page: 8 },
        { coordinate: [345, 392], page: 8 },
        { coordinate: [342, 356], page: 8 },
      ],
      minCount: 1,
      renderFieldInPDF: true,
      inputType: "date",
    },
    minor_relation_to_user: {
      coordinates: [
        { coordinate: [468, 462], page: 8 },
        { coordinate: [468, 428], page: 8 },
        { coordinate: [468, 392], page: 8 },
        { coordinate: [468, 356], page: 8 },
      ],
      minCount: 1,
      renderFieldInPDF: true,
      inputType: "text",
    },
  },
  title: "Rental Agreement",
};
