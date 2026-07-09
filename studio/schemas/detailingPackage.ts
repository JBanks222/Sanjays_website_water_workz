import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'detailingPackage',
  title: 'Detailing Package',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Package Name',
      type: 'string',
      description: 'Race track name or brand package name (e.g. Silverstone, The Werkz)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'trackKey',
      title: 'Track Visual',
      type: 'string',
      options: {
        list: [
          {title: 'Silverstone', value: 'silverstone'},
          {title: 'Laguna Seca', value: 'laguna-seca'},
          {title: 'Monza', value: 'monza'},
          {title: 'Nürburgring', value: 'nurburgring'},
          {title: 'Circuit de Spa-Francorchamps', value: 'spa'},
          {title: 'Brand Logo (Werkz)', value: 'brand'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priceLabel',
      title: 'Price Label',
      type: 'string',
      description: 'e.g. "Starting at $100" or "$400 to $1000"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'exteriorServices',
      title: 'Exterior Services',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'interiorServices',
      title: 'Interior Services',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'priceLabel', trackKey: 'trackKey'},
    prepare({title, subtitle, trackKey}) {
      return {title, subtitle: `${subtitle} · ${trackKey}`}
    },
  },
})
