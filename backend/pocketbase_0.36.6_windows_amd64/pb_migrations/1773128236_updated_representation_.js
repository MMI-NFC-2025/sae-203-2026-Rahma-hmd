/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1342449008")

  // update collection data
  unmarshal({
    "name": "representation"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1342449008")

  // update collection data
  unmarshal({
    "name": "representation_"
  }, collection)

  return app.save(collection)
})
