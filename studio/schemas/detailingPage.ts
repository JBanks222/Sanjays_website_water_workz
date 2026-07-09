import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'detailingPage',
  title: 'Detailing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Auto Detailing Package Options',
    }),
    defineField({
      name: 'intro',
      title: 'Intro Text',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Detailing Page'}
    },
  },
})
