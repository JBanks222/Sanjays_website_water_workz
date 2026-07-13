import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'galleryPage',
  title: 'Gallery Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Our Work',
    }),
    defineField({
      name: 'intro',
      title: 'Intro Text',
      type: 'text',
      rows: 3,
      initialValue:
        'Browse completed detailing, protection, and wrap projects from Water Werkz LI.',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Gallery Page'}
    },
  },
})
