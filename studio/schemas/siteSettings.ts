import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'businessName',
      title: 'Business Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'missionTitle',
      title: 'Mission Title',
      type: 'string',
    }),
    defineField({
      name: 'missionStatement',
      title: 'Mission Statement',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'contactIntro',
      title: 'Contact Intro',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'hours',
      title: 'Business Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'day', title: 'Day', type: 'string'}),
            defineField({name: 'open', title: 'Opens', type: 'string'}),
            defineField({name: 'close', title: 'Closes', type: 'string'}),
            defineField({name: 'closed', title: 'Closed', type: 'boolean', initialValue: false}),
          ],
          preview: {
            select: {day: 'day', open: 'open', close: 'close', closed: 'closed'},
            prepare({day, open, close, closed}) {
              return {
                title: day,
                subtitle: closed ? 'Closed' : `${open} – ${close}`,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
