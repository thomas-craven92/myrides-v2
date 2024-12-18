/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('events').del()
  await knex('events').insert([
    {
      id: 1, 
      name: 'Kai Bush Bash',
      date: 'Saturday, 23 November 2024',
      location: 'Kaitangata, South Otago',
      description: 'Annual Kaitangata Trail Ride.',
      poster: '/images/kai.jpg',
    },
    {
      id: 2, 
      name: 'Eastern Hills Trail Ride',
      date: 'Saturday, 30 November 2024',
      location: '850 Mount Watkin RoadMount Trotter, Otago',
      description: 'Fundraising for JMC rugby tour of Japan 2025.',
      poster: '/images/eastern.jpg',

    },
    {
      id: 3, 
      name: 'Riversdale Rugby Club Trail Ride',
      date: 'Saturday, 7 December 2024',
      location: 'Cattle Flat, Southland',
      description: 'Registrations: 8am – 10am',
      poster: '/images/riversdale.jpg',

    },
  ]);
};
