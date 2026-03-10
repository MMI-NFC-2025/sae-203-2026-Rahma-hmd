/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1342449008")

  // remove field
  collection.fields.removeById("number2220277813")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1342449008")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number2220277813",
    "max": null,
    "min": null,
    "name": "duree",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
