import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('Detailing Page')
        .id('detailingPage')
        .child(S.document().schemaType('detailingPage').documentId('detailingPage')),
      S.documentTypeListItem('detailingPackage').title('Detailing Packages'),
      S.divider(),
      S.documentTypeListItem('service').title('Services'),
      S.divider(),
      S.documentTypeListItem('post').title('Blog Posts'),
    ])
